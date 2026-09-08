import request from 'supertest';
import app from '../../app';

describe('INT-CONTENT: missing admin write routes (BUG-03)', () => {
  it.failing(
    'BUG-03: POST /kindity/home/events should exist for AddEvent UI (https://github.com/adilmusali/kindity/issues/3)',
    async () => {
      const res = await request(app).post('/kindity/home/events').send({
        img: 'https://example.com/e.jpg',
        header: 'Event',
        desc: 'Desc',
      });
      expect(res.status).toBeGreaterThanOrEqual(200);
      expect(res.status).toBeLessThan(300);
    }
  );

  it.failing(
    'BUG-03: POST /kindity/blog/news should exist for AddNews UI (https://github.com/adilmusali/kindity/issues/3)',
    async () => {
      const res = await request(app).post('/kindity/blog/news').send({
        header: 'News',
        desc: 'Desc',
        img: 'https://example.com/n.jpg',
        category1: 'a',
        category2: 'b',
        category3: 'c',
        category4: 'd',
        user: 'admin',
      });
      expect(res.status).toBeGreaterThanOrEqual(200);
      expect(res.status).toBeLessThan(300);
    }
  );

  it('GET /api/events returns 200 array', async () => {
    const res = await request(app).get('/api/events');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/home-content returns 200 object', async () => {
    const res = await request(app).get('/api/home-content');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        statistics: expect.any(Array),
        welcome: expect.any(Array),
        events: expect.any(Array),
      })
    );
  });

  it('GET /api/blog returns 200 with news and options', async () => {
    const res = await request(app).get('/api/blog');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        news: expect.any(Array),
        options: expect.any(Array),
      })
    );
  });

  it('GET /api/gallery returns 200 array', async () => {
    const res = await request(app).get('/api/gallery');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
