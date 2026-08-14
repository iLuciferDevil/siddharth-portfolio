# Siddharth Bhattacharjee Portfolio

Next.js portfolio and consulting website for siddharthbhattacharjee.in.

## Structure
- `/` personal brand homepage
- `/services` consulting services and fixed-scope mini services
- `/blog` SEO-focused marketing writing
- `/blog/[slug]` individual articles
- `/sitemap.xml` generated sitemap

## Lead generation
The booking form currently posts to FormSubmit and redirects back to `/#booking`. On the first submission, FormSubmit may ask you to activate the destination email address. For a production setup, this can later be replaced with a first-party form endpoint such as Vercel Functions + Resend.

## Calendar
The booking block is intentionally ready for a live Calendly, Cal.com, or Google Calendar appointment link. Once you choose the scheduling provider, replace the booking CTA with the live URL or embed.

## Deploy
Import the GitHub repository into Vercel. The project root should be the folder containing `package.json`.
