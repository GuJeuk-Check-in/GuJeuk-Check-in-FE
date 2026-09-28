# GUJEUK-CHECK-IN

## Analytics and Observability

Set these Vite environment variables when analytics are needed:

- `VITE_GA_MEASUREMENT_ID`: enables GA4 route page views for the whole app.
- `VITE_SENTRY_DSN`: enables Sentry frontend error monitoring.
- `VITE_SENTRY_TRACES_SAMPLE_RATE`: enables Sentry performance tracing sampling. Defaults to `0.1`.
- `VITE_MIXPANEL_TOKEN`: enables the existing check-in funnel Mixpanel events.
- `VITE_MIXPANEL_DEBUG`: set to `true` only when debugging Mixpanel locally.

GA4 sends normalized page paths only. It does not include query strings or user-entered values. Sentry Session Replay is not configured because the public check-in flow can contain personal information. Mixpanel remains the detailed check-in funnel tool; use `/check-in/funnel-analytics` to inspect stored funnel events and flush them manually.
