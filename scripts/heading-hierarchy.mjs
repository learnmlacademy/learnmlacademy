const ENTITY_MAP = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&nbsp;': ' ',
  '&mdash;': '—',
  '&ndash;': '–',
};

function decodeEntities(value) {
  return value
    .replace(/&#(x[\da-f]+|\d+);/gi, (entity, code) => {
      const point = code[0].toLowerCase() === 'x'
        ? Number.parseInt(code.slice(1), 16)
        : Number.parseInt(code, 10);
      return Number.isInteger(point) && point >= 0 && point <= 0x10ffff
        ? String.fromCodePoint(point)
        : entity;
    })
    .replace(/&(amp|lt|gt|quot|apos|nbsp|mdash|ndash);/gi, entity =>
      ENTITY_MAP[entity.toLowerCase()] ?? entity
    );
}

function cleanHeadingText(markup) {
  return decodeEntities(
    markup
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]*>/g, ' ')
  ).replace(/\s+/g, ' ').trim();
}

function stripNonContentRegions(markup) {
  let content = markup;
  for (const tag of ['nav', 'aside', 'footer']) {
    content = content.replace(
      new RegExp('<' + tag + '\\b[^>]*>[\\s\\S]*?<\\/' + tag + '\\s*>', 'gi'),
      ' '
    );
  }
  // Exclude content that is explicitly absent from the accessibility tree.
  content = content.replace(
    /<([a-z][\w:-]*)\b(?=[^>]*(?:\bhidden\b|\baria-hidden\s*=\s*["']true["']))[^>]*>[\s\S]*?<\/\1\s*>/gi,
    ' '
  );
  return content;
}

export function auditPageHeadingHierarchy(html, route = '(unknown route)') {
  const issues = [];
  const mainRegions = [...html.matchAll(/<main\b[^>]*>([\s\S]*?)<\/main\s*>/gi)];

  if (mainRegions.length !== 1) {
    issues.push({
      code: 'main-landmark-count',
      message: 'Expected exactly one main landmark; found ' + mainRegions.length,
    });
  }

  const mainMarkup = mainRegions[0]?.[1] ?? html;
  const content = stripNonContentRegions(mainMarkup);
  const headings = [...content.matchAll(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1\s*>/gi)]
    .filter(match => !/\bhidden\b|\baria-hidden\s*=\s*["']true["']/i.test(match[2]))
    .map(match => ({
      level: Number(match[1]),
      id: match[2].match(/\bid=["']([^"']+)["']/i)?.[1] ?? null,
      text: cleanHeadingText(match[3]),
    }));

  if (headings.length === 0) {
    issues.push({ code: 'missing-heading', message: 'No content headings found in the main landmark.' });
  } else {
    if (headings[0].level !== 1) {
      issues.push({
        code: 'first-heading-not-h1',
        message: 'The first content heading is H' + headings[0].level + ' ("' + headings[0].text + '"); expected H1.',
      });
    }

    const h1Count = headings.filter(heading => heading.level === 1).length;
    if (h1Count !== 1) {
      issues.push({
        code: 'h1-count',
        message: 'Expected exactly one H1 in the main landmark; found ' + h1Count + '.',
      });
    }

    for (let index = 0; index < headings.length; index += 1) {
      const current = headings[index];
      if (!current.text) {
        issues.push({
          code: 'empty-heading',
          message: 'H' + current.level + ' at position ' + (index + 1) + ' has no accessible text.',
          current,
        });
      }

      const previous = headings[index - 1];
      if (previous && current.level > previous.level + 1) {
        issues.push({
          code: 'skipped-level',
          message: 'Heading level jumps from H' + previous.level + ' ("' + previous.text +
            '") to H' + current.level + ' ("' + current.text + '").',
          previous,
          current,
        });
      }
    }
  }

  return { route, headings, issues };
}

export function summarizeHeadingAudit(results) {
  const issueCounts = {};
  for (const result of results) {
    for (const issue of result.issues) {
      issueCounts[issue.code] = (issueCounts[issue.code] ?? 0) + 1;
    }
  }

  return {
    pageCount: results.length,
    cleanPageCount: results.filter(result => result.issues.length === 0).length,
    flaggedPageCount: results.filter(result => result.issues.length > 0).length,
    issueCounts,
    results: results.filter(result => result.issues.length > 0),
  };
}
