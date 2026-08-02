# Project Structure Rules

Before moving or adding files under `src/app`, follow `docs/project-structure.md`.

Core rules:

- Plain folders under `src/app` are URL route segments.
- Route groups in parentheses, for example `(theme)` or `(session)`, are non-URL modules.
- Underscore folders, for example `_ui`, `_hooks`, `_model`, `_api`, are private implementation layers.
- Only modules and submodules should have `index.ts` files.
- Module and submodule `index.ts` files must export only the intended public API explicitly.
- Do not add `index.ts` files inside private layers like `_ui`, `_hooks`, `_model`, `_api`, `_lib`.
- Keep truly common primitives and infrastructure in `src/common`.
