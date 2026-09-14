# v11 — customer-first redesign

## Bug fixed first
`components/Problems.tsx` referenced `.problem-list`, `.problem-item`, `.problem-trigger`,
`.problem-detail`, `.problem-number` and `.section-link`. None of those existed in
`globals.css`. The accordion therefore rendered as raw HTML with every panel expanded at
once — that single miss is what made the homepage look endless and unstyled.

## Files changed
- `app/globals.css` — rewritten as a token-based design system (ink + brass, glossy)
- `app/page.tsx` — homepage rebuilt: 11 sections -> 7, each one full-viewport
- `app/layout.tsx` — footer now sits on its own dark band; Book schema.org added
- `app/book/page.tsx` — real title, both purchase links
- `components/Header.tsx` — sticky glass nav, "Get the e-book" CTA, working mobile menu
- `components/Footer.tsx` — contact details + Amazon link
- `components/Problems.tsx` — 8 situations -> 6, collapsed by default
- `lib/links.ts` — NEW. Single source of truth for book and contact URLs
- `public/siddharth-bhattacharjee.jpg` — replaced with the new portrait (4:5 crop)
- Blog / services / case-studies / resources pages: wrapped in `.surface-pearl`

## Untouched
`lib/posts.ts`, `lib/case-studies.ts`, `lib/seo-plan.ts`, `app/api/subscribe/route.ts`,
`app/sitemap.ts`, `app/robots.ts`, `components/NewsletterForm.tsx`, all PDFs.

## Changing a link later
Edit `lib/links.ts` only. Both the book URLs and the phone/email flow from there.
