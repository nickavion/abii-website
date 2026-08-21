import type { CallToAction } from './types';
import { getHomePermalink, getPermalink } from './utils/permalinks';

// Homepage section anchors. Built off getHomePermalink() so they carry the
// configured base path: on GitHub Pages the site is served from a subpath, and
// a bare '/#faq' would point at the domain root instead. They must stay
// absolute (not '#faq') so they also work from /privacy, /terms, etc.
const anchor = (id: string) => `${getHomePermalink()}#${id}`;

/**
 * §2 of the copy spec asks for three links plus one button. "Pricing" is
 * replaced by "Roadmap" here because the site ships the §9b waitlist rather
 * than the §9a tiers (OPEN-7), so there is no pricing content to link to.
 * The cost question is answered in the FAQ instead. The `#pricing` anchor is
 * still present on the waitlist section so any existing link keeps working.
 */
export const headerData = {
  links: [
    { text: 'How it works', href: anchor('how-it-works') },
    { text: 'Features', href: anchor('features') },
    { text: 'Roadmap', href: anchor('roadmap') },
    { text: 'FAQ', href: anchor('faq') },
  ],
  actions: [{ text: 'Join the beta', href: anchor('signup'), variant: 'primary' }] satisfies CallToAction[],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'How it works', href: anchor('how-it-works') },
        { text: 'Features', href: anchor('features') },
        { text: 'Roadmap', href: anchor('roadmap') },
        { text: 'FAQ', href: anchor('faq') },
      ],
    },
    {
      title: 'Company',
      links: [{ text: 'Join the beta', href: anchor('signup') }],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: getPermalink('/privacy') },
        { text: 'Terms of Service', href: getPermalink('/terms') },
        { text: 'Accessibility', href: getPermalink('/accessibility') },
      ],
    },
  ],
};
