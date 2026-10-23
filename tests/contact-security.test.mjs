import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';

const source = await fs.readFile('api/contact.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const { default: handler } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));

const envKeys = ['BREVO_API_KEY', 'BREVO_SENDER_EMAIL', 'BREVO_SENDER_NAME', 'CONTACT_RECIPIENT_EMAIL'];
const previousEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
const originalFetch = globalThis.fetch;

function configureBrevo() {
  process.env.BREVO_API_KEY = 'test-api-key';
  process.env.BREVO_SENDER_EMAIL = 'noreply@learnmlacademy.com';
  process.env.BREVO_SENDER_NAME = 'LearnMLAcademy';
  process.env.CONTACT_RECIPIENT_EMAIL = 'machinelearningacademy83@gmail.com';
}

function restoreEnvironment() {
  for (const key of envKeys) {
    if (previousEnv[key] === undefined) delete process.env[key];
    else process.env[key] = previousEnv[key];
  }
  globalThis.fetch = originalFetch;
}

test.afterEach(restoreEnvironment);

function request(body = {}, overrides = {}, method = 'POST') {
  return {
    method,
    headers: {
      origin: 'https://www.learnmlacademy.com',
      host: 'www.learnmlacademy.com',
      'content-type': 'application/json',
      ...overrides,
    },
    body,
  };
}

function responseMock() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    status(code) { this.statusCode = code; return this; },
    setHeader(name, value) { this.headers[name] = value; },
    json(body) { this.body = body; return this; },
    send(body) { this.body = body; return this; },
  };
}

async function call(req) {
  const res = responseMock();
  await handler(req, res);
  return res;
}

function validBody(overrides = {}) {
  return {
    name: 'Ada Learner',
    email: 'ada.learner@gmail.com',
    subject: 'Lesson Feedback',
    message: 'I found a typo in the gradient descent lesson.',
    website: '',
    ...overrides,
  };
}

test('rejects non-POST requests', async () => {
  const res = await call(request({}, {}, 'GET'));
  assert.equal(res.statusCode, 405);
  assert.equal(res.headers.Allow, 'POST');
});

test('rejects unapproved origins without contacting Brevo', async () => {
  configureBrevo();
  let called = false;
  globalThis.fetch = async () => { called = true; return new Response('{}', { status: 201 }); };
  const res = await call(request(validBody(), { origin: 'https://attacker.invalid' }));
  assert.equal(res.statusCode, 403);
  assert.equal(called, false);
});

test('fails safely when Brevo sender configuration is missing', async () => {
  delete process.env.BREVO_API_KEY;
  delete process.env.BREVO_SENDER_EMAIL;
  delete process.env.CONTACT_RECIPIENT_EMAIL;
  let called = false;
  globalThis.fetch = async () => { called = true; return new Response('{}', { status: 201 }); };
  const res = await call(request(validBody()));
  assert.equal(res.statusCode, 503);
  assert.equal(res.body.ok, undefined);
  assert.equal(called, false);
});

test('rejects the honeypot without contacting Brevo', async () => {
  configureBrevo();
  let called = false;
  globalThis.fetch = async () => { called = true; return new Response('{}', { status: 201 }); };
  const res = await call(request(validBody({ website: 'bot filled this' })));
  assert.equal(res.statusCode, 400);
  assert.equal(called, false);
});

test('rejects oversized payloads before contacting Brevo', async () => {
  configureBrevo();
  let called = false;
  globalThis.fetch = async () => { called = true; return new Response('{}', { status: 201 }); };
  const res = await call(request(validBody({ message: 'x'.repeat(9000) })));
  assert.equal(res.statusCode, 413);
  assert.equal(called, false);
});

test('validates the email address and category before contacting Brevo', async () => {
  configureBrevo();
  let called = false;
  globalThis.fetch = async () => { called = true; return new Response('{}', { status: 201 }); };
  const invalidEmail = await call(request(validBody({ email: 'not-an-email' })));
  assert.equal(invalidEmail.statusCode, 400);
  const invalidCategory = await call(request(validBody({ subject: 'Inject a header\\r\\nBcc: attacker@example.org' })));
  assert.equal(invalidCategory.statusCode, 400);
  assert.equal(called, false);
});

test('sends a plain-text inquiry through Brevo and sets reply-to to the visitor', async () => {
  configureBrevo();
  let requestedUrl = '';
  let requestedOptions;
  globalThis.fetch = async (url, options) => {
    requestedUrl = String(url);
    requestedOptions = options;
    return new Response(JSON.stringify({ messageId: 'test-message-id' }), { status: 201 });
  };

  const res = await call(request(validBody()));
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true, message: 'Message sent.' });
  assert.equal(requestedUrl, 'https://api.brevo.com/v3/smtp/email');
  assert.equal(requestedOptions.method, 'POST');
  assert.equal(requestedOptions.headers['api-key'], 'test-api-key');
  const body = JSON.parse(requestedOptions.body);
  assert.deepEqual(body.sender, { name: 'LearnMLAcademy', email: 'noreply@learnmlacademy.com' });
  assert.deepEqual(body.to, [{ email: 'machinelearningacademy83@gmail.com' }]);
  assert.deepEqual(body.replyTo, { email: 'ada.learner@gmail.com', name: 'Ada Learner' });
  assert.equal(body.subject, '[LearnMLAcademy] Lesson Feedback');
  assert.match(body.textContent, /I found a typo in the gradient descent lesson/);
  assert.equal(body.htmlContent, undefined);
});

test('does not expose provider failures to the visitor', async () => {
  configureBrevo();
  globalThis.fetch = async () => new Response('secret provider detail', { status: 429 });
  const res = await call(request(validBody()));
  assert.equal(res.statusCode, 502);
  assert.deepEqual(res.body, { error: 'The message could not be sent right now.' });
  assert.equal(JSON.stringify(res.body).includes('secret provider detail'), false);
});
