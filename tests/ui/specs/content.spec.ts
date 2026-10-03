import { test, expect } from '@playwright/test';

const corsHeaders = {
  'access-control-allow-origin': new URL(process.env.FRONT_URL || 'http://localhost:5173').origin,
  'access-control-allow-credentials': 'true',
};

const demoStory = {
  _id: '670000000000000000000003',
  header: 'Inside a community food drive',
  desc: 'Volunteers sort supplies for an example food drive. They check labels, group shelf-stable items, and prepare a clear list so each shift can continue the work.\n\nThey prepare parcels for a possible distribution. Another team might coordinate pickup times, share translated instructions, and make space for neighbors to ask questions.\n\nThis is an illustrative account of how a community activity could be organized. It does not describe a completed Kindity project or identify actual beneficiaries.',
  img: 'https://example.com/story.jpg',
  user: 'Kindity example',
  createdAt: '2024-02-29T10:00:00.000Z',
  isDemo: true,
};

const reviewedStory = {
  ...demoStory,
  _id: '670000000000000000000030',
  header: 'A reviewed community story',
  desc: 'Reviewed content.',
  user: 'Reviewed author',
  createdAt: 'not-a-date',
  isDemo: false,
};

const datedEvent = {
  _id: '670000000000000000000001',
  img: 'https://example.com/event.jpg',
  header: 'Leap day gathering',
  desc: 'A community gathering.',
  eventDate: '2024-02-29',
  isDemo: false,
};
const undatedEvent = { ...datedEvent, _id: '670000000000000000000002', header: 'Date pending', eventDate: undefined };
const invalidEvent = { ...datedEvent, _id: '670000000000000000000004', header: 'Invalid source date', eventDate: '2023-02-29' };
const events = [datedEvent, undatedEvent, invalidEvent];

const welcome = {
  _id: '670000000000000000000007',
  header: 'Small acts of kindness. Stronger communities.',
  desc: 'Explore example projects supporting food access, education, and community care.',
  donation: 120000,
  projects: 2,
  volunteers: 3,
  img: 'https://example.com/welcome.jpg',
  isDemo: true,
};

const homeContent = {
  statistics: [
    { _id: '1', header: 'Example volunteers', desc: 'Illustrative figure', number: '3', color: '#ea2c58', isDemo: true },
    { _id: '2', header: 'Unreviewed figure', desc: 'Unknown source', number: '900', color: '#ea2c58' },
  ],
  welcome: [welcome],
  causes: [
    { _id: '3', header: 'Goal exceeded', desc: 'Reviewed campaign', img: 'https://example.com/cause.jpg', raised: 150, need: 100, isDemo: false },
    { _id: '4', header: 'Goal pending', desc: 'Example campaign', img: 'https://example.com/cause.jpg', raised: 0, need: 0, isDemo: true },
  ],
  features: [],
  events,
  testimonial: [
    { _id: '5', name: 'Example volunteer', job: 'Demo story', desc: 'An illustrative experience.', img: 'https://example.com/person.jpg', isDemo: true },
    { _id: '6', name: 'Unreviewed person', job: 'Unknown', desc: 'Unknown source.', img: 'https://example.com/person.jpg' },
  ],
  logo: [],
};

test.beforeEach(async ({ page }) => {
  await page.route('**/profile', (route) => route.fulfill({ status: 401, body: '{}' }));
  await page.route('**/api/**', (route) => {
    const path = new URL(route.request().url()).pathname;
    const response = path === '/api/home-content' ? homeContent
      : path === '/api/about' ? { welcome: [welcome], features: [], testimonial: homeContent.testimonial, logo: [] }
      : path === '/api/blog' ? { news: [demoStory, reviewedStory], options: [] }
      : path === `/api/news/${demoStory._id}` ? demoStory
      : path === `/api/news/${reviewedStory._id}` ? reviewedStory
      : path === '/api/events' ? events
      : path === `/api/events/${datedEvent._id}` ? datedEvent
      : path === `/api/events/${undatedEvent._id}` ? undatedEvent
      : path === `/api/events/${invalidEvent._id}` ? invalidEvent
      : null;
    return route.fulfill({
      status: response ? 200 : 404,
      contentType: 'application/json',
      headers: corsHeaders,
      body: JSON.stringify(response ?? { message: 'Not found' }),
    });
  });
});

test('public copy, disclosure, amounts, and contact notice', async ({ page }, testInfo) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'Small acts of kindness. Stronger communities.' }).first()).toBeVisible();
  await expect(page.getByText('$120,000')).toBeVisible();
  await expect(page.getByText('Unreviewed figure')).toHaveCount(0);
  await expect(page.getByText('Unreviewed person')).toHaveCount(0);
  await expect(page.getByRole('progressbar', { name: 'Goal exceeded funding progress' })).toHaveAttribute('aria-valuenow', '100');
  await expect(page.getByRole('progressbar', { name: 'Goal pending funding progress' })).toHaveCount(0);
  await expect(page.getByText('Goal: Not set')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('home-desktop.png'), fullPage: true });

  await page.goto('/about', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('$120,000')).toBeVisible();
  await expect(page.getByText('Sample figures.')).toBeVisible();

  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('This demonstration does not provide a monitored contact channel.')).toBeVisible();
  await expect(page.getByRole('button', { name: /send message/i })).toHaveCount(0);
  await expect(page.getByText('support@colorlib.com')).toHaveCount(0);
});

test('story list and direct detail visits agree on supported metadata', async ({ page }, testInfo) => {
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  const demoCard = page.locator('article').filter({ has: page.getByRole('heading', { name: demoStory.header }) });
  await expect(demoCard.getByText('By Kindity example')).toBeVisible();
  await expect(demoCard.getByText('Added February 29, 2024')).toBeVisible();
  await expect(demoCard.getByText('Demo story.')).toBeVisible();
  await expect(page.getByText(/views|comments|popular posts/i)).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: testInfo.outputPath('stories-mobile.png'), fullPage: true });
  await page.setViewportSize({ width: 1280, height: 720 });

  await page.goto(`/blog/${demoStory._id}`, { waitUntil: 'domcontentloaded' });
  const article = page.locator('article');
  await expect(article.getByRole('heading', { name: demoStory.header })).toBeVisible();
  await expect(article.getByText('By Kindity example')).toBeVisible();
  await expect(article.getByText('Added February 29, 2024')).toBeVisible();
  await expect(article.getByText('Demo story.')).toBeVisible();
  await expect(article.getByText('Volunteers sort supplies for an example food drive.')).toHaveCount(1);
  await expect(article.getByText('They prepare parcels for a possible distribution.')).toHaveCount(1);
  await expect(page.getByText(/leave a reply|post comment|popular posts|views/i)).toHaveCount(0);

  await page.goto(`/blog/${reviewedStory._id}`, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('article').getByText('By Reviewed author')).toBeVisible();
  await expect(page.locator('article').getByText(/Added|Demo story/)).toHaveCount(0);
});

test('event dates use records across listing and direct detail visits', async ({ page }) => {
  await page.goto('/event', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('February 29, 2024')).toBeVisible();
  await expect(page.getByText('Date to be announced')).toHaveCount(2);

  await page.goto(`/event/${datedEvent._id}`, { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('February 29, 2024')).toBeVisible();
  await expect(page.getByText(/Rocky beach church|Los Angeles, USA/)).toHaveCount(0);

  await page.goto(`/event/${undatedEvent._id}`, { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Date to be announced')).toBeVisible();

  await page.goto(`/event/${invalidEvent._id}`, { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('Date to be announced')).toBeVisible();
});

test('empty story collection shows a clear empty state', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route('**/api/blog', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    headers: corsHeaders,
    body: JSON.stringify({ news: [], options: [] }),
  }));
  await page.goto('/blog', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('No stories are available yet.')).toBeVisible();
});

test('empty home data and unknown direct URLs stay usable', async ({ page }) => {
  await page.route('**/api/home-content', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    headers: corsHeaders,
    body: JSON.stringify({ statistics: [], welcome: [], causes: [], features: [], events: [], testimonial: [], logo: [] }),
  }));
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'Small acts of kindness. Stronger communities.' })).toBeVisible();
  await expect(page.getByText('Sample figures.')).toHaveCount(0);

  await page.goto('/blog/670000000000000000000099', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('This story is unavailable.')).toBeVisible();
  await page.goto('/event/670000000000000000000099', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('This event is unavailable.')).toBeVisible();
});
