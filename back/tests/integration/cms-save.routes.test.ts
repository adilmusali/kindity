import request from 'supertest';
import app from '../../app';
import UserModel from '../../models/userModel';
import Donation from '../../models/Donation/donationModel';
import Contact from '../../models/Contact/contactModel';

for (const { name, model } of [
  { name: 'donation', model: Donation },
  { name: 'contact', model: Contact },
]) {
  describe(`BUG-10: ${name} CMS saves`, () => {
    let agent: ReturnType<typeof request.agent>;
    beforeEach(async () => {
      agent = request.agent(app);
      await agent.post('/register').send({ name: 'Admin', email: 'cms@example.com', password: 'abcdef' });
      await UserModel.updateOne({ email: 'cms@example.com' }, { role: 'admin' });
    });
    afterEach(() => jest.restoreAllMocks());

    it('returns success only after the save resolves and content is persisted', async () => {
      const originalSave = model.prototype.save;
      let release!: () => void;
      let saving!: () => void;
      const gate = new Promise<void>(resolve => { release = resolve; });
      const started = new Promise<void>(resolve => { saving = resolve; });
      jest.spyOn(model.prototype, 'save').mockImplementationOnce(async function (this: InstanceType<typeof Donation>) {
        saving();
        await gate;
        return originalSave.call(this);
      });
      let responded = false;
      const pending = agent.post(`/kindity/${name}`).send({ header: 'Header', desc: 'Description' })
        .then(response => { responded = true; return response; });
      try {
        await started;
        await new Promise(resolve => setImmediate(resolve));
        expect(responded).toBe(false);
      } finally { release(); }
      const response = await pending;
      expect(response.status).toBe(200);
      // Both CMS schemas have the same stored fields.
      const stored = await model.collection.findOne({ header: 'Header' });
      expect(stored?.desc).toBe('Description');
      expect(String(stored?._id)).toBe(response.body._id);
    });

    it('returns 400 for invalid content without persisting it', async () => {
      const response = await agent.post(`/kindity/${name}`).send({ header: 'Incomplete' });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: `Invalid ${name} content.` });
      expect(await model.collection.countDocuments()).toBe(0);
    });

    it('returns a controlled 500 on an asynchronous save failure', async () => {
      jest.spyOn(model.prototype, 'save').mockRejectedValueOnce(new Error('private database details'));
      const response = await agent.post(`/kindity/${name}`).send({ header: 'Header', desc: 'Description' });
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: `Unable to save ${name} content.` });
      expect(await model.collection.countDocuments()).toBe(0);
    });
  });
}
