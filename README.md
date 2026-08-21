# ABII — marketing site

Static marketing site for ABII smart vents, built on [AstroWind](https://github.com/onwidget/astrowind) (Astro 7 + Tailwind 4).

Content follows **ABII — Website Copy & Build Spec v2.0** section by section; each section of `src/pages/index.astro` is commented with its spec §number.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to ./dist
npm run check    # astro check + eslint + prettier
```

Node ≥ 22.22.3.

## What was decided, and why

| Spec item                  | Decision                                                                                                                                                                                                    |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OPEN-7 — tiers vs waitlist | Ships the **§9b waitlist**. No prices are set (OPEN-6) and FCC authorization is outstanding (OPEN-2), so tier pricing would be an unsubstantiated claim under §13d.                                         |
| §10 FAQ, OPEN-4            | The phone-disconnect answer is **omitted** — the spec's copy and the firmware's actual behaviour contradict each other.                                                                                     |
| §10 FAQ, OPEN-8            | The Flair/Keen comparison is **omitted** pending competitor-pricing verification.                                                                                                                           |
| §10 FAQ, OPEN-3            | The static-pressure answer **ships**, rewritten to describe the airflow cap without quoting a number. This is an objective product claim — confirm the guardrail is in shipping firmware before publishing. |
| §14 assets                 | None of the 13 photos exist yet, so every image slot renders `AssetPlaceholder` — a labelled box carrying the spec's asset number, brief and target dimensions.                                             |
| §2 nav                     | "Pricing" is replaced with "Roadmap" since there is no pricing content. The `#pricing` anchor still resolves, to the waitlist.                                                                              |

Unresolved §15 values live in one place: **`src/brand.ts`**. Anything still `null` renders on the page as a loud amber "TBD" chip rather than as plausible-looking copy.

## Connecting the waitlist

The form posts to a Kit (formerly ConvertKit) custom form endpoint. Kit's free tier covers up to 10,000 subscribers and handles the one-click unsubscribe that CAN-SPAM requires.

1. Create a free account at [kit.com](https://kit.com).
2. Grow → Landing Pages & Forms → New → **Form** → Inline.
3. Add a custom field named `wrong_rooms` (the optional room-count question maps to it).
4. Open the form's **Embed → HTML** tab and copy the numeric id out of the action URL: `https://app.kit.com/forms/`**`1234567`**`/subscriptions`.
5. `cp .env.example .env` and set `PUBLIC_KIT_FORM_ID=1234567`.
6. Set the same variable in your host's build environment.

Until that variable is set the form renders **disabled** with a visible warning, deliberately — a form that accepts addresses and drops them is worse than one that says it isn't ready.

## Deploying

Live at **https://nickavion.github.io/abii-website** via GitHub Pages.

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
Nothing to run by hand; check the Actions tab for build status, or re-run a
deploy from there with **Run workflow**.

The repo is **public**, which is what GitHub Pages requires on the Free plan.
Anything committed here is world-readable, including the legal drafts and the
open items in the checklist below.

Because Pages serves this as a project site rather than at a domain root, the
site lives under the `/abii-website` subpath. That is why `src/config.yaml`
sets `base: '/abii-website'`, and why the nav anchors in `src/navigation.ts`
are built off `getHomePermalink()` instead of a bare `/#id`, which would
resolve to `nickavion.github.io` rather than to the site. **On moving to a real
domain (OPEN-11): set `site` to it, set `base` back to `'/'`, and drop the
`/abii-website` prefix from the Privacy Policy link in `src/pages/terms.md`.**

To wire up the waitlist, add `PUBLIC_KIT_FORM_ID` under Settings → Secrets and
variables → Actions → **Variables**. The workflow passes it into the build.
Until then the form deploys visibly disabled.

`public/_headers` is written in Cloudflare's format and is ignored by GitHub
Pages, which does not support custom headers. It is kept for a future move to
a host that does.

## Before this goes public

- [ ] **OPEN-1** — have counsel review `/privacy`, `/terms` and `/accessibility`. All three are drafts and say so on the page.
- [ ] **OPEN-2** — FCC Part 15 authorization. Marketing an unauthorized intentional radiator is itself a violation.
- [ ] **OPEN-3** — confirm the airflow guardrail ships, or cut the clause from the static-pressure answer.
- [ ] **OPEN-11** — fill in `domain`, `legalEntity`, `mailingAddress` in `src/brand.ts`; the mailing address is a CAN-SPAM requirement once email collection is live.
- [ ] **OPEN-17** — re-verify the EIA 52% figure is current.
- [ ] Update `site.site` in `src/config.yaml` to the real domain so canonical URLs and the sitemap are correct.
- [ ] Shoot the §14 assets and replace each `AssetPlaceholder`.

## Regenerating brand assets

`scripts/make-brand-assets.mjs` derives the web assets from the source art in `Desktop/Abii`: it keys the flat background out of the logo mark to produce an alpha mask (`src/assets/images/abii-mark-mask.png`), which the site paints with `currentColor` so one file serves both themes. It also emits the favicons and the 1200×630 social card.

```bash
node scripts/make-brand-assets.mjs
```

The social card is a placeholder built from type and the logo; spec asset #12 calls for a product shot.
