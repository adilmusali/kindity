import request from 'supertest';

const mockCreate = jest.fn();
jest.mock('stripe', () => jest.fn().mockImplementation(() => ({
  paymentIntents: { create: mockCreate },
})));

import app from '../../app';

describe('INT-PAY: payment amount validation (BUG-06)', () => {
  let agent: ReturnType<typeof request.agent>;

  beforeEach(async () => {
    mockCreate.mockReset();
    agent = request.agent(app);
    const registered = await agent.post('/register').send({
      name: 'Donor', email: 'amount-validation@example.com', password: 'abcdef',
    });
    expect(registered.status).toBe(201);
  });

  it.each(
    [undefined, null, true, [], {}, { toString: null }, 'abc', '25', 0, -1, 0.001, 10.555, 10000.01, 1e10]
      .map((amount): [unknown] => [amount])
  )(
    'rejects invalid JSON amount %p with 400', async (amount) => {
      const response = await agent.post('/api/payment/create-payment-intent').send({ amount });
      expect(response.status).toBe(400);
      expect(response.body.error).toEqual(expect.any(String));
      expect(mockCreate).not.toHaveBeenCalled();
    }
  );

  it.each([[0.29, 29], [10.55, 1055], [10000, 1000000]])(
    'accepts %p USD and sends %p integer cents', async (amount, cents) => {
      mockCreate.mockResolvedValue({ client_secret: 'pi_test_secret_route' });
      const response = await agent.post('/api/payment/create-payment-intent').send({ amount });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ clientSecret: 'pi_test_secret_route' });
      expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({ amount: cents, currency: 'usd' }));
    }
  );
});
