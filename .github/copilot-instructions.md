# Project Summary & Core Mission (Context)

Project: Echo Canvas — The Universal Therapeutic Art Ecosystem

Core Mission:
Echo Canvas is a web application designed as a sanctuary for creative expression, built with a deep commitment to radical accessibility. Its primary audience is "people of determination" — individuals with physical, motor, sensory, or cognitive disabilities who are often excluded by traditional creative tools.

The platform's core magic is its ability to transform non-verbal sounds (sighs, hums) or spoken words into unique, emotionally resonant generative art. The entire user experience must be calming, intuitive, empowering, and free of clutter, allowing every user to see and connect with the artist inside them.

Design ethos (high level, non-technical):
- Prioritize accessibility-first interactions and UI that reduce cognitive load.
- Focus on slow, calming feedback loops instead of rapid, noisy animations.
- Emphasize expressive output that maps emotional input (voice, breath, sound) to visual materials.
- Treat privacy and consent as core features — recordings should be clearly scoped, ephemeral by default, and user-owned.

Primary user outcomes:
- Enable users to create meaningful art without requiring fine motor control.
- Provide an immediate, calming sense of agency and expression.
- Support sharing and saving in ways that respect user boundaries and accessibility needs.

Next steps (technical work to follow):
- Populate this file's technical sections with detected build/test commands, key file paths, and integration points.
- Document concrete patterns and examples (API client, canvas subsystem, realtime integration) after scanning the codebase.

---
Please review this project context and tell me if you'd like any edits, additions, or alternate wording before I proceed to add technical guidance and codebase-specific instructions.

## Technology Stack (Frontend) & Project Structure (high-level)

We will use the Next.js App Router (latest project structure) and the following frontend stack throughout the repo. Agents should assume these technologies and conventions when making edits or adding new modules:

- Framework: **Next.js (App Router)** — use `app/` for routes, `app/layout.tsx`, and `app/page.tsx` for global layout and routing.
- Styling: **Tailwind CSS** — utility-first classes; expect `tailwind.config.*` and `postcss.config.*` to exist. Prefer utility classes and small component-scoped style files when necessary.
- State Management: **Zustand** — small, focused stores (e.g., `lib/store` or `src/store`) for session and canvas state. Keep stores minimal and well-typed.
- Animations: **Framer Motion** — use for subtle, accessible animations like pulsing or page transitions. Keep motion reduced for accessibility (respect `prefers-reduced-motion`).
- Icons: **Lucide React** — use Lucide components for accessible icons; prefer semantic labels and `aria-hidden` when decorative.
- Accessibility Primitives: **Radix UI (headless)** — use for accessible Dialogs/Modals and other primitives; pair with Tailwind for styling.

Conventions for agents:

- Use the App Router layout: changes to global shell belong in `app/layout.tsx`; pages and nested routes in `app/<route>/page.tsx`.
- Put reusable UI under `components/` and small feature folders under `features/` or `app/<route>/components`.
- Centralize API clients and environment-aware configuration in `lib/api` or `lib/config`.
- Create small, focused Zustand hooks like `lib/store/useSession.ts` or `lib/store/useCanvas.ts`.
- Respect accessibility: always add keyboard focus management for dialogs (Radix helpers), label interactive controls, and check color contrast when proposing UI changes.

Developer notes for PRs and edits:

- Prefer small, focused PRs that change one area (UI, store, API) at a time and include the `app/` route affected.
- When adding animations, include reduced-motion alternatives and tests or notes explaining the behavior.
- When adding icons, use Lucide components and include accessible labels.

Next step: I can now scan the repository to detect exact `package.json` scripts, existing file locations, and confirm these conventions in code. Say "Scan repo now" to proceed and I will populate the instruction file with precise examples and script commands.

