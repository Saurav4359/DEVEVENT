# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js App Router project. PostHog is initialized client-side via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.ts` to route events through `/ingest` for better reliability. Error tracking via `capture_exceptions` is enabled. Three components now emit custom events on user interactions.

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" CTA button on the homepage hero | `app/components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks an event card; captures title, slug, location, and date | `app/components/EventCard.tsx` |
| `nav_link_clicked` | User clicks a navbar link; captures the link label | `app/components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/372209/dashboard/1438538
- **Event Engagement Over Time** (daily trend of explore + card clicks): https://us.posthog.com/project/372209/insights/qP6WqrgO
- **Explore → Event Card Conversion Funnel** (CTA-to-card click conversion): https://us.posthog.com/project/372209/insights/GecoudKQ
- **Navigation Link Clicks by Destination** (which nav links get clicked most): https://us.posthog.com/project/372209/insights/o0cYIslI
- **Most Clicked Events by Title** (which event cards drive the most clicks): https://us.posthog.com/project/372209/insights/rFWh9T5d

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
