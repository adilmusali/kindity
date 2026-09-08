import path from 'path';
import fs from 'fs';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { test, expect } from '../fixtures/pages';

const schemasDir = path.join(__dirname, 'schemas');

function loadSchema(name: string) {
  return JSON.parse(fs.readFileSync(path.join(schemasDir, name), 'utf8'));
}

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
ajv.addSchema(loadSchema('news.json'), 'news.json');

function validate(schemaName: string, data: unknown) {
  const schema = loadSchema(schemaName);
  const validateFn = ajv.compile(schema);
  const ok = validateFn(data);
  if (!ok) {
    throw new Error(`${schemaName} validation failed: ${ajv.errorsText(validateFn.errors)}`);
  }
}

test.describe('API-CONTRACT', () => {
  test('GET /api/home-content matches schema', async ({ asAnon }) => {
    const res = await asAnon.get('/api/home-content');
    expect(res.status()).toBe(200);
    validate('home-content.json', await res.json());
  });

  test('GET /api/about matches schema', async ({ asAnon }) => {
    const res = await asAnon.get('/api/about');
    expect(res.status()).toBe(200);
    validate('about.json', await res.json());
  });

  test('GET /api/events matches event item schema', async ({ asAnon }) => {
    const res = await asAnon.get('/api/events');
    expect(res.status()).toBe(200);
    const events = await res.json();
    expect(Array.isArray(events)).toBe(true);
    for (const event of events) {
      validate('event.json', event);
    }
  });

  test('GET /api/events/:id returns 404 for unknown id', async ({ asAnon }) => {
    const res = await asAnon.get('/api/events/507f1f77bcf86cd799439011');
    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body).toEqual(expect.objectContaining({ message: expect.any(String) }));
  });

  test('GET /api/blog matches schema', async ({ asAnon }) => {
    const res = await asAnon.get('/api/blog');
    expect(res.status()).toBe(200);
    validate('blog.json', await res.json());
  });

  test('GET /api/news/:id returns item or 404', async ({ asAnon }) => {
    const blog = await (await asAnon.get('/api/blog')).json();
    if (blog.news?.length) {
      const id = blog.news[0]._id;
      const res = await asAnon.get(`/api/news/${id}`);
      expect(res.status()).toBe(200);
      validate('news.json', await res.json());
    }
    const missing = await asAnon.get('/api/news/507f1f77bcf86cd799439011');
    expect(missing.status()).toBe(404);
  });

  test('GET /api/gallery matches gallery item schema', async ({ asAnon }) => {
    const res = await asAnon.get('/api/gallery');
    expect(res.status()).toBe(200);
    const images = await res.json();
    expect(Array.isArray(images)).toBe(true);
    for (const img of images) {
      validate('gallery-item.json', img);
    }
  });
});
