import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';

const source = await fs.readFile('api/newsletter.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const { default: handler } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));

function request(body = {}, headerOverrides = {}, method = 'POST') {
  const req = {
    method,
    headers: { origin: 'https://www.learnmlacademy.com', host: 'www.learnmlacademy.com', 'content-type': 'application/json', ...headerOverrides },
    body: { email: 'learner@example.com', guide: 'ml', consent: true, website: '', ...body },
  };
  const res = {
    code: null,
    headers: {},
    payload: null,
    status(code) { this.code = code; return this; },
    setHeader(key, value) { this.headers[key] = value; return this; },
    json(value) { this.payload = value; return this; },
    send(value) { this.payload = value; return this; },
  };
  return { req, res };
}

test('newsletter rejects unsafe signups without calling the email provider', async () => {
  const oldApiKey = process.env.BREVO_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.BREVO_API_KEY = 'example-test-key-not-real';
  let providerCalls = 0;
  globalThis.fetch = async () => { providerCalls++; return { status: 503 }; };
  try {
    const checks = [
      { body: {}, headers: {}, method: 'GET', expected: 405 },
      { body: {}, headers: { origin: 'https://attacker.example' }, expected: 403 },
      { body: {}, headers: { origin: undefined }, expected: 403 },
      { body: {}, headers: { origin: 'https://attacker.example', host: 'attacker.example' }, expected: 403 },
      { body: {}, headers: { 'content-length': '5000' }, expected: 413 },
      { body: { extra: 'X'.repeat(5000) }, expected: 413 },
      { body: {}, headers: { 'content-type': 'text/plain' }, expected: 415 },
      { body: { consent: false }, expected: 400 },
      { body: { website: 'spam.example' }, expected: 400 },
      { body: { email: 'no-at-sign' }, expected: 400 },
      { body: { email: 'x'.repeat(250) + '@example.com' }, expected: 400 },
      { body: { guide: 'unknown' }, expected: 400 },
    ];
    for (const item of checks) {
      const { req, res } = request(item.body, item.headers, item.method || 'POST');
      await handler(req, res);
      assert.equal(res.code, item.expected, 'Unexpected response for ' + JSON.stringify(item));
      assert(res.payload?.error, 'Error response should provide a safe message');
    }
    assert.equal(providerCalls, 0, 'Invalid signups must never call the email API');

    const { req, res } = request();
    await handler(req, res);
    assert.equal(providerCalls, 1, 'Valid consented signup should reach Brevo');
    assert.equal(res.code, 502, 'Mocked provider failure must be handled safely');
    assert(!JSON.stringify(res.payload).includes('example-test-key'), 'Never leak secrets in responses');
    console.log('Newsletter security regressions PASS (12 rejection cases, 1 provider failure case).');
  } finally {
    globalThis.fetch = originalFetch;
    if (oldApiKey === undefined) delete process.env.BREVO_API_KEY;
    else process.env.BREVO_API_KEY = oldApiKey;
  }
});
