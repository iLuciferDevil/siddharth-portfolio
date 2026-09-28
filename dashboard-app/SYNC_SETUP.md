# Live dashboard sync

The dashboard now has `POST /api/sync/`. It requests the applied reporting range directly from Google Analytics Data API and Google Search Console API. It only replaces that range after every required report succeeds. Failed syncs leave the saved data and last successful sync date unchanged.

## Required server configuration

Set these variables in the **siddharth-portfolio-sr9f** Vercel project, Production environment:

- `GA4_PROPERTY_ID`: the numeric GA4 property ID for siddharthbhattacharjee.in (not the G- measurement ID).
- `GOOGLE_SERVICE_ACCOUNT_JSON`: the complete service account JSON, stored as a sensitive environment variable. Never put it in GitHub, a NEXT_PUBLIC variable, or chat.

Enable Google Analytics Data API and Google Search Console API in that service account's Google Cloud project. Give the account Viewer access to the portfolio GA4 property and read access to `sc-domain:siddharthbhattacharjee.in` in Search Console. No domain-wide delegation or write permissions are needed. Redeploy after setting the variables. Keep Vercel deployment access protection enabled for the dashboard and its API.

## Verification

Click Sync Now, confirm the reporting period and timestamp change only after a successful Google response, then reload. Successful snapshots persist in that browser's local storage. They are not shared across browsers; a new browser starts with the published snapshot and can run Sync Now. The existing Refresh button reloads published data and merges newer locally saved ranges.

The query window ends yesterday. Google's recent results can be incomplete and may be revised. Unsupported AI citations, unmeasured events, returning users, and confirmed consulting conversion rates remain unknown. Raw contact clicks and events are not reported as confirmed enquiries. Search query/page and audience lists show the top 100 returned rows.

## Current activation blocker

On September 28, 2026, the existing GSC Wizard connector reported an expired trial or absent subscription. Windsor only listed BSS properties. A direct Google server connection is therefore required to activate this implementation. The UI explicitly reports missing configuration; it does not claim a successful sync.
