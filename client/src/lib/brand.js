import brand from '@content/brand.json';

export { brand };

/** A form URL from the brand config, or a mailto fallback when that form is not ready yet. */
export function formHref(kind) {
  const url = brand.forms?.[kind];
  if (url) return url;
  const subjects = { feedback: 'Feedback', tester: 'Early testing', teams: 'Teams waitlist' };
  return `mailto:${brand.contactEmail}?subject=${encodeURIComponent(`${brand.name}: ${subjects[kind] || 'Hello'}`)}`;
}

export const isExternal = (href) => /^(https?:|mailto:)/.test(href);
