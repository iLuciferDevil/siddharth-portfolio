# Siddharth Bhattacharjee — Marketing Consulting Platform

Next.js + TypeScript website for siddharthbhattacharjee.in, designed as a personal authority platform and consulting lead-generation funnel.

## What is included

- B2B + B2C marketing consultant positioning
- Interactive “Problems I solve” diagnostic section
- Focused services, strategy projects and fractional advisory
- Book page for *Sovereign Brand*
- 25 marketing case studies: first-hand experience + editorial analysis
- Marketing blog with article-level lead capture
- 200-topic SEO editorial roadmap in `lib/seo-plan.ts`
- Free resource library with six PDF lead magnets
- Newsletter capture ready for Kit API v4
- Per-source / per-interest Kit tagging via environment variables
- Consulting enquiry form
- Bangalore local SEO landing page
- Person schema, sitemap and robots.txt
- Vercel-ready deployment

## Email marketing setup

The site uses a small server-side `/api/subscribe` route so the Kit API key never reaches the browser.

1. Create your Kit account and a main newsletter Form / automation.
2. Create the tags you want for the site, for example: Newsletter, B2B, B2C, Growth, Brand, Product Marketing, CRM, SEO, Consulting and Resource.
3. Create any custom field you want to use for acquisition source (optional).
4. Copy `.env.example` to `.env.local` for local development or add the same variables in Vercel → Project → Settings → Environment Variables.
5. Add `KIT_API_KEY` and the relevant `KIT_TAG_*_ID` values.
6. Build welcome / nurture sequences in Kit and use the tags to trigger the right sequence.

Kit API v4 uses `POST /v4/subscribers` for creating/upserting subscribers and tag endpoints to apply tags. The site follows that model.

## Booking calendar

The lead form is intentionally separate from the calendar. Add your preferred Calendly, Cal.com or Google Calendar booking URL after choosing the tool. The CTA can then be changed to open the calendar after the brief is submitted.

## Content strategy

`lib/seo-plan.ts` contains the 200-topic roadmap. Do not publish all 200 at once. Publish by cluster, starting with high-intent B2B/B2C marketing strategy topics and local commercial pages, then expand into supporting informational content.
