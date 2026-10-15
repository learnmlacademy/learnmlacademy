/**
 * Validates email addresses for newsletter and contact forms.
 * Rejects obvious fake/dummy inputs (e.g. a@b.com, test@test.com, asdf@asdf.com),
 * disposable email domains, and invalid syntaxes while allowing genuine user emails.
 */

const BLOCKED_DOMAINS = new Set([
  'b.com', 'a.com', 'c.com', 'd.com', 'e.com', 'f.com',
  'test.com', 'fake.com', 'dummy.com', 'asdf.com', 'qwerty.com',
  'sample.com', 'nowhere.com', 'nomail.com', 'example.com', 'example.org', 'example.net',
  'mailinator.com', 'tempmail.com', '10minutemail.com',
  'guerrillamail.com', 'throwawaymail.com', 'yopmail.com',
  'trashmail.com', 'sharklasers.com', 'dispostable.com',
  'getairmail.com', 'maildrop.cc', 'temp-mail.org', 'mytempemail.com'
]);

const DUMMY_LOCAL_PARTS = new Set([
  'test', 'fake', 'asdf', 'qwerty', 'dummy', 'sample',
  'noemail', 'nobody', 'null', 'undefined', 'temp', 'trash',
  'admin', 'administrator', 'user', 'unknown', 'abc', 'xyz',
  'none', 'na', 'testing'
]);

export function isValidEmail(rawEmail: unknown): boolean {
  if (typeof rawEmail !== 'string') return false;
  const email = rawEmail.trim().toLowerCase();

  // Basic RFC length bounds
  if (email.length < 6 || email.length > 254) return false;

  // Must contain exactly one @ symbol
  const atParts = email.split('@');
  if (atParts.length !== 2) return false;

  const [local, fullDomain] = atParts;

  // Local part constraints:
  // - Must be at least 2 characters (eliminates single-char inputs like "a@b.com")
  // - Max 64 characters (RFC 5321)
  // - Valid characters: alphanumeric and safe standard symbols
  // - Cannot start or end with a dot, no consecutive dots
  if (local.length < 2 || local.length > 64) return false;
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local)) return false;

  // Reject common dummy local usernames
  if (DUMMY_LOCAL_PARTS.has(local)) return false;

  // Reject repetitive single characters (e.g. "aaaa", "1111")
  if (/^(.)\1+$/.test(local) && local.length >= 3) return false;

  // Domain constraints:
  // - Must have at least one dot
  // - Max 253 characters
  // - Cannot start/end with dot or contain consecutive dots
  if (!fullDomain.includes('.') || fullDomain.length > 253) return false;
  if (fullDomain.startsWith('.') || fullDomain.endsWith('.') || fullDomain.includes('..')) return false;

  const domainParts = fullDomain.split('.');
  if (domainParts.length < 2) return false;

  // Top-Level Domain (TLD) must be at least 2 letters, alphabetic only
  const tld = domainParts[domainParts.length - 1];
  if (!/^[a-z]{2,24}$/.test(tld)) return false;

  // Second-Level Domain (SLD) right before TLD:
  // Must be at least 2 characters (rejects single-letter domains like "b.com")
  const sld = domainParts[domainParts.length - 2];
  if (sld.length < 2) return false;

  for (const part of domainParts) {
    if (part.length === 0 || part.length > 63) return false;
    if (part.startsWith('-') || part.endsWith('-')) return false;
    if (!/^[a-z0-9-]+$/.test(part)) return false;
  }

  // Reject when local part equals the domain name (e.g. "asdf@asdf.com", "abc@abc.com")
  if (local === sld) return false;

  // Reject known dummy, temporary, or disposable email domains
  if (BLOCKED_DOMAINS.has(fullDomain)) return false;

  return true;
}
