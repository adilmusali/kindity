import request from 'supertest';
import app from '../../app';
import { EventsModel } from '../../models/Home/eventsModel';
import { CausesModel } from '../../models/Home/causesModel';
import { StatModel } from '../../models/Home/statModel';
import { WelcomeModel } from '../../models/Home/welcomeModel';
import { Testimonial } from '../../models/Home/testimonialModel';
import News from '../../models/Blog/newsModel';
import Options from '../../models/Blog/optionsModel';

const eventFields = { img: 'https://example.com/event.jpg', header: 'Community event', desc: 'An example activity.' };
const storyFields = {
  header: 'Example story', desc: 'An illustrative story.', img: 'https://example.com/story.jpg',
  category1: 'Food', category2: 'Community', category3: 'Volunteers', category4: 'Stories', user: 'Example author',
};

describe('content provenance and event dates', () => {
  it('returns additive metadata and date-only values through existing APIs', async () => {
    const event = await EventsModel.create({ ...eventFields, isDemo: true, eventDate: '2024-02-29' });
    await CausesModel.create({ ...eventFields, raised: 20, need: 100, isDemo: true });
    await StatModel.create({ header: 'Sample', desc: 'Illustrative', number: '2', color: '#ea2c58', isDemo: true });
    await WelcomeModel.create({ ...eventFields, donation: 100, projects: 2, volunteers: 3, isDemo: true });
    await Testimonial.create({ img: eventFields.img, desc: 'An example.', name: 'Example volunteer', job: 'Demo story', isDemo: true });
    const story = await News.create({ ...storyFields, isDemo: true });
    const option = await Options.create({ header: 'Example', desc: 'An illustrative option.', img: eventFields.img, isDemo: true });

    const home = await request(app).get('/api/home-content');
    expect(home.status).toBe(200);
    expect(home.body.events[0]).toEqual(expect.objectContaining({ _id: String(event._id), isDemo: true, eventDate: '2024-02-29' }));
    for (const key of ['causes', 'statistics', 'welcome', 'testimonial']) {
      expect(home.body[key][0].isDemo).toBe(true);
    }

    const blog = await request(app).get('/api/blog');
    expect(blog.status).toBe(200);
    expect(blog.body.news[0]).toEqual(expect.objectContaining({ _id: String(story._id), isDemo: true }));
    expect(blog.body.options[0]).toEqual(expect.objectContaining({ _id: String(option._id), isDemo: true }));
  });

  it.each(['2023-02-29', '2024-04-31', '2024-2-29', 'not-a-date'])('rejects invalid eventDate %s', async (eventDate) => {
    await expect(EventsModel.create({ ...eventFields, eventDate })).rejects.toThrow();
  });

  it('keeps legacy records without metadata readable', async () => {
    const event = await EventsModel.create(eventFields);
    const story = await News.create(storyFields);

    const events = await request(app).get('/api/events');
    expect(events.status).toBe(200);
    expect(events.body[0]._id).toBe(String(event._id));
    expect(events.body[0]).not.toHaveProperty('isDemo');
    expect(events.body[0]).not.toHaveProperty('eventDate');

    const detail = await request(app).get(`/api/news/${story._id}`);
    expect(detail.status).toBe(200);
    expect(detail.body).not.toHaveProperty('isDemo');
  });
});
