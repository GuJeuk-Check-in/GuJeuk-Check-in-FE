# ADR 001: Monorepo App Split

## Status

Accepted for implementation planning.

## Context

The current GuJeuk frontend is a single Vite React app that contains both public check-in routes and admin management routes. The next institution, Beopdong, needs its own admin web surface. Beopdong check-in is no longer part of this web monorepo because it will be developed as an app surface.

The institution surfaces will share component structure such as headers, cards, buttons, inputs, forms, and layout primitives. However, institution colors, branding, copy, request APIs, and some form fields can differ. Admin UI/UX can also differ by institution beyond the shared login and primitive component layer.

The November Beopdong launch should avoid a risky rewrite. The migration needs to preserve the existing GuJeuk behavior while creating a path for institution-specific apps.

## Decision

Use a monorepo with separate app packages for each institution and surface:

```txt
apps/
  gujeuk-check-in/
  gujeuk-admin/
  beopdong-admin/

packages/
  ui/
  tokens/
  auth/
  check-in-core/
  api-core/
  types/
```

For the first migration PR, move the current app unchanged into the agreed GuJeuk check-in app boundary:

```txt
apps/gujeuk-check-in/
```

This app currently preserves the existing combined GuJeuk check-in/admin behavior while the repository becomes workspace-ready. Later PRs will move admin routes out to `gujeuk-admin`.

## Drivers

- Keep GuJeuk stable during the monorepo migration.
- Allow Beopdong to own different branding, copy, API adapters, and screen composition.
- Share UI primitives and design tokens where the visual structure is the same.
- Avoid forcing institution-specific API differences into a shared API package.
- Keep the initial migration small enough to verify with existing lint, typecheck, architecture scan, and build commands.

## Boundaries

- Apps own routing, page composition, institution-specific copy, branding application, and API adapters.
- `packages/ui` owns reusable UI primitives only; it must not know about GuJeuk, Beopdong, or API details.
- `packages/tokens` owns shared token shape and institution token sets.
- `packages/api-core` owns HTTP client construction, auth header helpers, error parsing, and common request policies only.
- `packages/check-in-core` owns common check-in flow helpers, validation, queue behavior, and analytics wrappers. It must receive institution API behavior through injected gateway interfaces rather than importing app API functions.
- `packages/auth` owns reusable authentication helpers and login form behavior that is truly shared.
- `packages/types` owns shared internal models and DTO adapters where they are stable across apps.

## Alternatives Considered

### Single app with institution route branches

Rejected because check-in must be institution-separated and admin UI/UX can diverge enough that one route tree would collect broad institution conditionals.

### Separate repositories

Rejected because UI primitives, tokens, auth behavior, check-in flow helpers, and shared types should evolve together. Separate repositories would increase coordination cost.

### Shared API package with all endpoint functions

Rejected because GuJeuk and Beopdong APIs can differ. Endpoint functions should live in each app and adapt responses into shared internal models only when useful.

## Consequences

- The first PR creates a workspace shell but intentionally does not split business behavior.
- Later PRs can split check-in/admin apps without also changing package manager structure.
- Shared packages must stay app-agnostic; institution-specific branching belongs in apps.
- API differences remain local to app adapter layers, reducing shared package complexity.
- Verification remains anchored on the existing GuJeuk app until the split apps exist.

## Migration Plan

1. Move the existing app into `apps/gujeuk-check-in` and delegate root scripts to that workspace.
2. Move admin routes into `apps/gujeuk-admin` using the existing route boundary.
3. Fill `apps/beopdong-admin` as a runnable minimal web app boundary, using institution-specific API configuration while detailed Beopdong admin features are still pending.
4. Extract stable shared primitives into `packages/ui` and institution token sets into `packages/tokens`.
5. Extract auth, API core, shared types, and check-in core only after their boundaries are proven by the GuJeuk split.

## Verification

Each migration PR should keep the smallest possible behavior delta and run:

```txt
yarn architecture:check
yarn lint
yarn typecheck
yarn build
```

After app splitting begins, check-in and admin should also receive surface-level smoke checks in a browser.

## Local Development Ports

Split apps use fixed local ports to avoid one app accidentally handling another app's routes:

```txt
yarn dev:gujeuk-check-in  -> http://localhost:5173/check-in
yarn dev:gujeuk-admin     -> http://localhost:5174/organ/login
yarn dev:beopdong-admin    -> http://localhost:5175/organ/login
```

The root `yarn dev` remains an alias for the GuJeuk check-in app.

Beopdong admin resolves API requests from `VITE_BEOPDONG_API_BASE_URL` first and falls back to `VITE_API_BASE_URL` for local migration compatibility.
