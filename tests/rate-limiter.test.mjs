import test from 'node:test';
import assert from 'node:assert/strict';
import { extractClientIp, checkRateLimit, enforceRateLimit, _resetMemoryStore } from '../api/rateLimiter.ts';

test('extractClientIp correctly prioritizes headers', () => {
  assert.equal(
    extractClientIp({ headers: { 'x-vercel-forwarded-for': '198.51.100.1, 10.0.0.1' } }),
    '198.51.100.1'
  );

  assert.equal(
    extractClientIp({ headers: { 'x-forwarded-for': '203.0.113.195, 70.41.3.18' } }),
    '203.0.113.195'
  );

  assert.equal(
    extractClientIp({ headers: { 'x-real-ip': '192.0.2.45' } }),
    '192.0.2.45'
  );

  assert.equal(
    extractClientIp({ socket: { remoteAddress: '10.1.2.3' } }),
    '10.1.2.3'
  );

  assert.equal(extractClientIp({}), '127.0.0.1');
});

test('rate limiting allows up to limit and blocks subsequent requests', async () => {
  _resetMemoryStore();

  const req = { headers: { 'x-forwarded-for': '1.2.3.4' } };
  const opts = { maxRequests: 3, windowSeconds: 60 };

  const res1 = await checkRateLimit(req, 'contact', opts);
  assert.equal(res1.allowed, true);
  assert.equal(res1.remaining, 2);

  const res2 = await checkRateLimit(req, 'contact', opts);
  assert.equal(res2.allowed, true);
  assert.equal(res2.remaining, 1);

  const res3 = await checkRateLimit(req, 'contact', opts);
  assert.equal(res3.allowed, true);
  assert.equal(res3.remaining, 0);

  const res4 = await checkRateLimit(req, 'contact', opts);
  assert.equal(res4.allowed, false);
  assert.equal(res4.remaining, 0);
  assert.ok(res4.retryAfterSeconds > 0);
});

test('rate limiting isolates namespaces and IPs', async () => {
  _resetMemoryStore();

  const reqA = { headers: { 'x-forwarded-for': '10.0.0.1' } };
  const reqB = { headers: { 'x-forwarded-for': '10.0.0.2' } };
  const opts = { maxRequests: 2, windowSeconds: 60 };

  // Exhaust IP A for contact
  await checkRateLimit(reqA, 'contact', opts);
  await checkRateLimit(reqA, 'contact', opts);
  const blockedA = await checkRateLimit(reqA, 'contact', opts);
  assert.equal(blockedA.allowed, false);

  // IP A for newsletter is still allowed (separate action namespace)
  const allowedANewsletter = await checkRateLimit(reqA, 'newsletter', opts);
  assert.equal(allowedANewsletter.allowed, true);

  // IP B for contact is still allowed (separate IP)
  const allowedB = await checkRateLimit(reqB, 'contact', opts);
  assert.equal(allowedB.allowed, true);
});

test('enforceRateLimit sets 429 status and Retry-After header', async () => {
  _resetMemoryStore();

  const req = { headers: { 'x-forwarded-for': '9.9.9.9' } };
  const opts = { maxRequests: 1, windowSeconds: 30 };

  const headers = {};
  let statusCode = 200;
  let jsonBody = null;

  const mockRes = {
    setHeader(key, val) {
      headers[key.toLowerCase()] = val;
    },
    status(code) {
      statusCode = code;
      return this;
    },
    json(body) {
      jsonBody = body;
    },
  };

  const first = await enforceRateLimit(req, mockRes, 'contact', opts);
  assert.equal(first, true);
  assert.equal(statusCode, 200);

  const second = await enforceRateLimit(req, mockRes, 'contact', opts);
  assert.equal(second, false);
  assert.equal(statusCode, 429);
  assert.ok(headers['retry-after']);
  assert.ok(jsonBody?.error?.includes('Too many requests'));
});
