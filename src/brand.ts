/**
 * Every value the copy spec left bracketed in §15, in one place.
 *
 * `null` means "still unresolved" — components render those as a visible
 * amber placeholder chip (see `~/components/common/Tbd.astro`) rather than
 * inventing a value. Fill one in here and it updates everywhere it appears.
 */
export const BRAND = {
  /** OPEN-11 — resolved. */
  founderName: 'Nico Castillo',

  /** OPEN-9 — used in the hero microcopy, the final CTA and the beta disclosure. */
  shipWindow: 'Winter 2026',

  /** OPEN-11 — drives hello@/press@ and the canonical URL. */
  domain: null as string | null,

  /** OPEN-11 — footer copyright line. */
  legalEntity: null as string | null,

  /** OPEN-11 — required in the footer by CAN-SPAM once the waitlist is live. */
  mailingAddress: null as string | null,

  /**
   * §12 dev note: link only accounts that actually exist. Empty means the
   * footer renders no social row at all, which is the correct state today.
   */
  socialLinks: [] as Array<{ ariaLabel: string; icon: string; href: string }>,

  /**
   * OPEN-15 — the trust strip ships Option A until the waitlist clears ~250,
   * at which point switch this to 'B' and fill in the counts below.
   */
  trustStripVariant: 'A' as 'A' | 'B',
  waitlistCount: null as number | null,
  betaRoomCount: null as number | null,
} as const;

/** Contact addresses, or null while the domain is unresolved. */
export const contactEmail = (mailbox: 'hello' | 'press'): string | null =>
  BRAND.domain ? `${mailbox}@${BRAND.domain}` : null;
