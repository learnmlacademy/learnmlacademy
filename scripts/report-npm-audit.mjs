import fs from 'node:fs';

const filename = process.argv[2] || 'npm-audit.json';
const report = JSON.parse(fs.readFileSync(filename, 'utf8'));
const counts = report.metadata?.vulnerabilities || {};
const total = Number(counts.total || 0);
const issues = report.vulnerabilities || {};
const rows = Object.entries(issues).map(([name, value]) => ({
  name,
  severity: value.severity || 'unknown',
  direct: Boolean(value.isDirect),
  range: value.range || '',
  fixAvailable: value.fixAvailable,
  via: (value.via || []).map(item => typeof item === 'string' ? item : item.name || item.title || item.url || 'advisory').slice(0, 3),
  paths: (value.effects || []).slice(0, 5),
})).sort((a, b) => {
  const order = { critical: 0, high: 1, moderate: 2, low: 3, info: 4, unknown: 5 };
  return (order[a.severity] ?? 5) - (order[b.severity] ?? 5) || a.name.localeCompare(b.name);
});
const lines = [
  '# npm dependency audit',
  '',
  `Total reported vulnerable packages: **${total}**`,
  '',
  '| Severity | Count |',
  '|---|---:|',
  ...['critical', 'high', 'moderate', 'low', 'info'].map(level => `| ${level} | ${Number(counts[level] || 0)} |`),
  '',
  '| Package | Severity | Direct | Fix available | Advisory / vulnerable path |',
  '|---|---|---|---|---|',
  ...rows.map(row => `| ${row.name} | ${row.severity} | ${row.direct ? 'yes' : 'no'} | ${row.fixAvailable === false ? 'no' : row.fixAvailable ? JSON.stringify(row.fixAvailable) : 'unknown'} | ${[...row.via, ...row.paths].join('; ').replaceAll('|', '\\|')} |`),
  '',
  'This report separates the vulnerability inventory from dependency remediation. Do not run an unreviewed major-version or force upgrade; validate each proposed update with the full site and project tests.',
  '',
].join('\n');

console.log(lines);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines);
