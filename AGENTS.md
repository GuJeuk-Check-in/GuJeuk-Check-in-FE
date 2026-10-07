# Analytics Tracking - Mixpanel

This project uses Mixpanel for product analytics. Do not add another analytics SDK or tracking library unless the user explicitly asks for a migration.

## Tech Stack

| Detail | Value |
|---|---|
| Platform | Vite + React web app |
| Mixpanel SDK | `mixpanel-browser` |
| SDK version | `^2.82.0` |
| Tracking method | Client-side SDK |
| CDP | None |
| Consent required | No EU/California users confirmed for this Quick Start |
| Token location | `.env` -> `VITE_MIXPANEL_TOKEN` |

## Initialization

Mixpanel is initialized once in:

`src/entities/check-in/model/checkInFunnelMixpanel.ts`

Use the exported funnel tracking path instead of importing Mixpanel directly in page components. Do not initialize Mixpanel in multiple files.
Check-in funnel analytics are sent through Mixpanel only; do not add a separate analytics API call path.

## Current Quick Start Events

| Mixpanel Event | Trigger | Key Properties | File |
|---|---|---|---|
| `check_in_started` | Check-in home flow starts | `platform`, `session_id`, `elapsed_ms_from_start` | `src/entities/check-in/model/checkInFunnelMixpanel.ts` |
| `phone_input_started` | Visitor starts typing phone number | `platform`, `session_id`, `elapsed_ms_from_start` | `src/entities/check-in/model/checkInFunnelMixpanel.ts` |
| `phone_check_submitted` | Visitor submits phone lookup | `platform`, `session_id`, `elapsed_ms_from_start` | `src/entities/check-in/model/checkInFunnelMixpanel.ts` |
| `user_check_succeeded` | Existing-user lookup succeeds | `platform`, `session_id`, `is_existing_user`, `visit_count_bucket` | `src/entities/check-in/model/checkInFunnelMixpanel.ts` |
| `user_check_failed` | Existing-user lookup fails | `platform`, `session_id`, `failure_reason` | `src/entities/check-in/model/checkInFunnelMixpanel.ts` |
| `check_in_form_viewed` | Visitor reaches the check-in form | `platform`, `session_id`, `is_existing_user` | `src/entities/check-in/model/checkInFunnelMixpanel.ts` |
| `purpose_selected` | Visitor selects visit purpose | `platform`, `session_id`, `purpose`, `is_existing_user` | `src/entities/check-in/model/checkInFunnelMixpanel.ts` |
| `check_in_submitted` | Visitor submits the check-in form | `platform`, `session_id`, `age_group`, `purpose`, `visit_count_bucket` | `src/entities/check-in/model/checkInFunnelMixpanel.ts` |
| `sign_up_completed` | A new public visitor signup/check-in reaches a durable save outcome | `platform`, `sign_up_method`, `session_id`, `age_group`, `purpose` | `src/entities/check-in/model/checkInFunnelMixpanel.ts` |
| `check_in_failed` | Check-in submission reaches a failure outcome | `platform`, `session_id`, `failure_reason`, `purpose` | `src/entities/check-in/model/checkInFunnelMixpanel.ts` |
| `check_in_completed` | The check-in completion screen is reached after server save or local durable queue save | `platform`, `session_id`, `age_group`, `purpose`, `elapsed_ms_from_start` | `src/entities/check-in/model/checkInFunnelMixpanel.ts` |
| `check_in_abandoned` | A started session is replaced or times out before completion | `platform`, `session_id`, `failure_reason`, `elapsed_ms_from_start` | `src/entities/check-in/model/checkInFunnelMixpanel.ts` |

## Identity Notes

The public check-in flow does not currently expose a stable authenticated user ID after signup, and the app can be used on shared devices. Do not use email, phone, name, or device ID as a Mixpanel user ID. Keep visitor analysis session-scoped with the existing `session_id` property unless the product adds a stable internal user ID.

## Event Rules

- Event names must be `snake_case`.
- Property names must be `snake_case`.
- Do not send PII such as names, phone numbers, emails, addresses, or raw birth dates.
- Omit empty properties instead of sending `null`, empty strings, or `N/A`.
- Track events after the represented action succeeds, not before.
- Before adding a new event, update this tracking plan and verify the event in Mixpanel Live View.
