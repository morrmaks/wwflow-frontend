# Project Structure

This document defines the project structure rules for `src/app`, module boundaries, naming, exports, and imports.

## Folder Naming

Use folder syntax consistently:

- `plain-folder` means a real Next.js route segment when it is under `src/app`.
- `(group)` means a route group or organizational module. It does not affect the URL.
- `_folder` means a private implementation layer. It is not a route segment.

Examples:

```txt
src/app/auth/login/page.tsx       # /auth/login route
src/app/auth/(session)/_hooks/    # auth session module, no URL segment
src/app/(theme)/_ui/              # app-level theme module UI, no URL segment
```

## App Structure

`src/app` owns routes and route-adjacent implementation. Put code near the route or app-level module that uses it.

App-level modules use route groups:

```txt
src/app/
  (background)/
    _hooks/
    _model/
    _ui/
    index.ts

  (theme)/
    _hooks/
    _model/
    _ui/
    index.ts

  (navigation)/
    _model/
    _ui/
    index.ts

  (marketing)/
    (card)/
      _model/
      _ui/
      index.ts
    (heroAction)/
      _ui/
      index.ts
    index.ts

  _ui/
    header/
    loaders/
```

Authenticated app-area modules live under the `/app` route segment:

```txt
src/app/app/
  (media)/
    _hooks/
    _lib/
    _ui/
    index.ts

  (permissions)/
    (invite-search)/
      _hooks/
      _model/
      _ui/
      index.ts
    (invites)/
      _ui/
      index.ts
    (members)/
      _ui/
      index.ts
    _api/
    _model/
    _ui/
    index.ts

  boards/
    (actions)/
      (create-board)/
        _api/
        _hooks/
        _model/
        _ui/
        index.ts
      (permissions)/
        _api/
        _hooks/
        _ui/
        index.ts
      index.ts
    (list)/
      _api/
      _hooks/
      _ui/
      index.ts
    [boardId]/
      (background-picker)/
        _ui/
        index.ts
      (board-card)/
        _hooks/
        _ui/
        index.ts
      (board-dnd)/
        _hooks/
        _lib/
        _model/
        _ui/
        index.ts
      (events)/
        (create-card)/
          _hooks/
          _model/
          _ui/
          index.ts
        (create-column)/
          _hooks/
          _model/
          _ui/
          index.ts
        _api/
        _hooks/
        _ui/
        index.ts
      (inbox)/
        _hooks/
        _ui/
        index.ts
      (panel)/
        (board-column)/
          _hooks/
          _ui/
          index.ts
        _hooks/
        _ui/
        index.ts
      (resizable-layout)/
        _hooks/
        _model/
        _ui/
        index.ts
      _api/
      _hooks/
      _model/
      _ui/
      index.ts
    _model/
  canvas/
    (actions)/
      (create-canvas)/
        _api/
        _hooks/
        _model/
        _ui/
        index.ts
      (permissions)/
        _api/
        _hooks/
        _ui/
        index.ts
      index.ts
    (list)/
      _api/
      _hooks/
      _ui/
      index.ts
    [canvasId]/
      (name)/
        _model/
        _ui/
        index.ts
      (tldraw)/
        _api/
        _hooks/
        _lib/
        _model/
        _ui/
        index.ts
      page.tsx
    _model/
```

Route modules use real route folders. Their internal implementation layers use `_`:

```txt
src/app/auth/
  _hooks/
  _model/
  _ui/
  index.ts

  login/
    page.tsx
    loading.tsx
    _api/
    _hooks/
    _model/
    _ui/
    index.ts

  register/
    page.tsx
    loading.tsx
    _api/
    _hooks/
    _model/
    _ui/
    index.ts
```

Submodules that must not become routes use route groups:

```txt
src/app/auth/
  (session)/
    _api/
    _hooks/
    index.ts

  (user)/
    _api/
    _hooks/
    _ui/
    index.ts
```

## Layer Names

Use these layer names:

- `_ui`: React components and UI-only composition.
- `_hooks`: React hooks.
- `_model`: state, schemas, types, reducers, pure domain logic.
- `_api`: GraphQL documents and API-specific code.
- `_lib`: local helpers that belong only to that module.

Do not use `_components`; use `_ui`.

## Styles

Use Tailwind classes for ordinary layout, spacing, typography, colors, and simple states.

Put component-specific CSS next to the component as a CSS Module when the style belongs only to that component and is awkward or impossible to express cleanly with Tailwind. This includes local keyframes, animation delays, complex selectors, and component-only visual mechanics.

Put shared application styles in `src/styles`. Use it for global imports, theme variables, base styles, shared utilities, and styles that are intentionally reused across modules.

Do not put module-specific selectors or keyframes in `src/styles` unless they are promoted to a shared utility with a stable name and more than one module needs them.

## Exports

Module and submodule `index.ts` files are public API boundaries. Add an `index.ts` when code outside that module or submodule imports from it. Export only what the module intentionally exposes, with explicit named exports.

Good:

```ts
export { useLogoutMutation } from './_hooks/useLogoutMutation';
export { UserMenu } from './_ui/userMenu';
```

Avoid in module/submodule `index.ts`:

```ts
export * from './_model';
export * from './_ui';
```

Private layers do not have `index.ts` files. Import directly from the concrete file inside `_ui`, `_hooks`, `_model`, `_api`, or `_lib`.

Good:

```ts
export { AuthStatus, type AuthStatusType, authStore } from './_model/store';
export { AuthInitializer } from './_ui/authInitializer';
export { AuthWrapper } from './_ui/authWrapper';
```

Avoid:

```txt
_model/index.ts
_ui/index.ts
_hooks/index.ts
```

## Imports

Prefer importing from the nearest public module boundary when crossing module boundaries.

Good:

```ts
import { ThemeProvider } from '@src/app/(theme)';
import { UserMenu } from '@src/app/auth';
```

Deep imports are acceptable when intentionally using a private layer from infrastructure code, but keep them rare and explicit:

```ts
import { authStore } from '@src/app/auth/_model/store';
```

Inside a module, prefer relative imports between local layers:

```ts
import { AuthWrapper } from '../../_ui/authWrapper';
import { useLoginForm } from '../_hooks/useLoginForm';
```

Do not import from a private layer folder barrel:

```ts
// Avoid
import { useAuth } from '@src/app/auth/_hooks';
// Prefer
import { useAuth } from '@src/app/auth/_hooks/useAuth';
```

Keep ESLint import ordering authoritative. After moving files, run lint on the touched scope.

## Common

Keep `src/common` for truly common primitives and infrastructure:

```txt
src/common/
  api/        # Apollo client, generated GraphQL, schema/codegen
  constants/  # route constants, storage keys
  guards/     # generic route guards
  hooks/      # generic hooks unrelated to a specific feature
  lib/        # generic utilities
  providers/  # infrastructure providers, e.g. Apollo
  scripts/    # global scripts used by app layout
  ui/         # design-system primitives
```

Do not move primitives like `button`, `dialog`, `input`, `date`, `object`, or Apollo infrastructure into `src/app` unless they become route-specific.

## Decision Rules

When placing a file:

1. If it is used by one route only, put it under that route.
2. If it is a non-URL submodule under a route, put it in a route group like `(session)`.
3. If it is app-shell behavior, put it in an app-level route group like `(theme)` or `(navigation)`.
4. If it is a primitive or infrastructure used broadly, keep it in `src/common`.
5. If a folder exists only to organize implementation, prefix it with `_`.
