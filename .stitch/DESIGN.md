---
name: Shibatype
colors:
  surface: '#333437'
  surface-dim: '#2B2E31'
  surface-bright: '#636669'
  surface-container-lowest: '#2B2E31'
  surface-container-low: '#333437'
  surface-container: '#3a3d40'
  surface-container-high: '#454849'
  surface-container-highest: '#505355'
  on-surface: '#ffffff'
  on-surface-variant: '#636669'
  inverse-surface: '#ffffff'
  inverse-on-surface: '#333437'
  outline: '#636669'
  outline-variant: '#505355'
  surface-tint: '#D6985C'
  primary: '#636669'
  on-primary: '#ffffff'
  primary-container: '#2B2E31'
  on-primary-container: '#ffffff'
  inverse-primary: '#333437'
  secondary: '#D6985C'
  on-secondary: '#ffffff'
  secondary-container: '#D6985C'
  on-secondary-container: '#2B2E31'
  tertiary: '#D6985C'
  on-tertiary: '#2B2E31'
  tertiary-container: '#D6985C'
  on-tertiary-container: '#2B2E31'
  error: '#ff7474'
  on-error: '#ffffff'
  error-container: '#ff7474'
  on-error-container: '#ffffff'
  primary-fixed: '#636669'
  primary-fixed-dim: '#505355'
  on-primary-fixed: '#ffffff'
  on-primary-fixed-variant: '#ffffff'
  secondary-fixed: '#D6985C'
  secondary-fixed-dim: '#c4874a'
  on-secondary-fixed: '#2B2E31'
  on-secondary-fixed-variant: '#333437'
  tertiary-fixed: '#D6985C'
  tertiary-fixed-dim: '#c4874a'
  on-tertiary-fixed: '#2B2E31'
  on-tertiary-fixed-variant: '#333437'
  background: '#333437'
  on-background: '#ffffff'
  surface-variant: '#636669'
typography:
  display-lg:
    fontFamily: Roboto Mono
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: '0'
  headline-md:
    fontFamily: Roboto Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: '0'
  body-base:
    fontFamily: Roboto Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-lg:
    fontFamily: Roboto Mono
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 38px
    letterSpacing: '0'
  label-caps:
    fontFamily: Roboto Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  stat-lg:
    fontFamily: Roboto Mono
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: '0'
rounded:
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 24px
  margin-desktop: 16px
---

# Design System: Shibatype

**Project ID:** 10530781707561921305

## 1. Visual Theme & Atmosphere

Shibatype radiates the focused, immersive energy of a late-night coding session. The interface is drenched in a dark charcoal atmosphere (`#333437`) that eliminates distraction and puts the words front and center. There's a quiet confidence to the design — no flashy gradients or heavy ornamentation — just clean monospaced type against deep, muted surfaces. The golden-amber accent (`#D6985C`) provides just enough warmth to break the coolness of the steel-gray palette, evoking the glow of a desk lamp over a mechanical keyboard.

The overall philosophy is minimalist-functional: generous whitespace, simple icon-driven navigation, and a typing area that demands full attention. The mood is reminiscent of Monkeytype and other speed-typing tools — calm, focused, and rewarding. The app uses a dynamic theming system with three distinct palettes (Dark, Cafe, Pine), each shifting the entire UI's emotional register while maintaining the same structural DNA. The default dark theme feels technical and precise; Cafe wraps everything in warm earth tones; Pine evokes a forest clearing with muted greens and tans.

## 2. Color Palette & Roles

### Primary Foundation
- **Charcoal Steel** `#333437` — Primary background, the dominant surface color. Cool-neutral with the faintest blue undertone.
- **Deep Graphite** `#2B2E31` — Darker surface for cards, dialogs, table header rows, and elevated containers. Provides subtle depth layering.
- **Ash Gray** `#636669` — Mid-tone gray used for untyped characters, primary accent borders, button fills, and navigation icon idle states.

### Accent & Interactive
- **Burnt Amber** `#D6985C` — The signature accent. Used for the secondary color role: active navigation highlights, the blinking cursor underline, coin icons, lock/unlock indicators, selected-theme borders, and CTA buttons. This is the emotional anchor of the palette.
- **Soft Coral Red** `rgb(255, 116, 116)` / `#ff7474` — Error and incorrect-character highlight. A warm, non-aggressive red that signals mistakes without being jarring.

### Typography & Text Hierarchy
- **Pure White** `#ffffff` — Primary text color across all themes. Used for headings, body text, typed characters, and all readable content.
- **Ash Gray** `#636669` — Untyped/pending characters in the typing test. Creates a "ghost text" effect that invites completion.

### Functional States
- **Soft Coral Red** `#ff7474` — Incorrect character background in typing test, error alerts.
- **Burnt Amber** `#D6985C` — Success/coin reward toasts, active states, and interactive highlights.

### Alternate Themes
- **Cafe Theme**: Background `#763F0E` (Rich Espresso Brown), Primary `#dda15e` (Golden Wheat), Secondary `#fefae0` (Cream Parchment), Dark `#283618` (Deep Olive), Light `#606c38` (Sage Green)
- **Pine Theme**: Background `#588157` (Forest Fern), Primary `#dad7cd` (Birch Bark), Secondary `#a3b18a` (Moss Green), Dark `#3a5a40` (Deep Pine), Light `#344e41` (Shadow Evergreen)

## 3. Typography Rules

### Hierarchy & Weights
The entire application uses a single font family: **Roboto Mono** (imported from Google Fonts). This monospaced typeface is the soul of the typing test experience — every character occupies the same width, creating perfect alignment as users type through prompts. The monospace character reinforces the "developer tool" aesthetic and ensures precise cursor positioning.

- **Logo / H2** — `2.5rem` (40px), inherits default weight. The "shibatype" wordmark sits alongside a Shiba Inu logo image. Bold presence without being overwhelming.
- **Section Headings / H1** — Default heading size. Used sparingly (e.g., "Themes" on the store page).
- **Typing Test Text** — `1.5rem` (24px) base, scaling down to `1.25rem` at 768px and `1rem` at 480px. The largest body-level text, optimized for reading flow during speed tests. Line-height of `1.6` for generous breathing room between lines.
- **Stats / Labels** — Default body size. WPM and accuracy displayed inline with the test controls.
- **Navigation Icons** — `1.2rem` (19px). Slightly oversized for comfortable click targets.
- **Dialog Titles** — `1.5rem` (24px) with bold weight. Centered in MUI dialog headers.
- **Table Text** — Default body size. MUI Table components with theme-colored cells.

### Spacing Principles
- Letter-spacing is left at default (0) across the board — Roboto Mono's natural spacing is already optimized for character-level reading.
- Line-height on typing test text is `1.6`, providing generous vertical breathing room to prevent line-jumping during rapid typing.
- Navigation icons use `25px` horizontal padding, creating wide, comfortable click targets.

## 4. Component Stylings

### Buttons
- **Primary (Contained)**: Background uses theme's `secondaryColor` (`#D6985C`) or `primaryColor` (`#636669`), white text against dark background. Hover darkens slightly (`primaryDark`). MUI `Button variant="contained"`.
- **Secondary (Outlined)**: Border color matches `primaryColor`, text in `primaryColor` or white. Hover adds subtle background tint (`primaryColor + "20"` for 12% opacity).
- **Corner radius**: `8px` default on cards, `12px` on dialog papers, up to `16px` on theme selector dialog.
- **Word count selector buttons** use `secondaryColor` for active state, `primaryColor` for inactive, creating clear visual distinction.

### Cards & Theme Swatches
- Theme cards in the store use `1px solid #ccc` borders with `8px` border-radius and `16px` internal padding.
- Background color dynamically matches the previewed theme.
- Color swatch circles: `30px × 30px` with `4px` border-radius, showing primary, secondary, dark, and light colors.
- Lock/unlock badges: Positioned absolutely in top-right corner with `primaryDark` background, `4px` border-radius, subtle box-shadow.
- Theme selector dialog cards (Paper): `2px solid primaryColor` border, `transition: all 0.2s ease`, hover transform `translateY(-2px)` for lift effect. Selected state uses `3px solid secondaryColor` border.

### Navigation
- **Layout**: Horizontal bar with logo + icon links on the left, theme/coin/user on the right.
- **Logo**: Shiba Inu PNG image (100px width) + "shibatype" text in 2.5rem. Both hidden on screens ≤650px.
- **Nav Icons**: FontAwesome icons (Home, Trophy, Store, User, Palette, Coins) with `25px` horizontal padding. Color inherits from CSS variable `--text-color` (white).
- **Active/hover**: No explicit underline or color change — minimal and clean.
- **Coin display**: Inline flex with FontAwesome coins icon + bold count, visible only when logged in.

### Inputs & Forms
- MUI TextFields with custom styling: input background `primaryDark` (`#2B2E31`), text color white, label color `primaryLight` (`#636669`).
- Full-width layout within `Container maxWidth="xs"`.
- Submit buttons: Full-width, contained variant with `primaryDark` background.

### Typing Test (Domain-Specific)
- **Typed characters**: White text on transparent background (correct) or white text on `rgb(255, 116, 116)` background (incorrect).
- **Untyped characters**: `#636669` (ash gray) — "ghost text" waiting to be typed.
- **Active cursor**: The next untyped character has `secondaryColor` (`#D6985C`) text with a `4px solid` bottom border that uses a CSS `blink` animation at 2s interval. This creates a warm, pulsing beacon effect.
- **Stats bar**: Flex row with WPM and accuracy on the left, reset (rotate icon) and settings (gear icon) on the right. Icons have `0.2s ease` color transitions on hover.
- **Post-test flash**: When test completes, the reset icon alternates between `textColor` and `primaryColor` every 500ms, creating an attention-grabbing pulse.

### Leaderboard Table
- MUI Table with alternating row colors: even rows use `backgroundColor`, odd rows use `primaryDark`.
- Header row: `primaryDark` background with `secondaryColor` for rank column, white for other headers.
- Rank numbers highlighted in `secondaryColor` (amber).
- No cell borders — clean, borderless aesthetic.
- Paginated with 10 items per page.

## 5. Layout Principles

### Grid & Structure
- **Max content width**: `1200px` with `min-width: 400px`.
- **Page layout**: CSS Grid with named areas — `header` (auto), `main` (1fr), `footer` (auto). `8px` gap between areas.
- **Content centering**: `margin-left: auto; margin-right: auto` on `.content` class.

### Whitespace Strategy
- **Base unit**: 8px (gap between grid areas).
- **Content padding**: `1rem` (16px) default, `1.5rem` at ≤768px, `2rem` at ≤480px — padding increases as viewport shrinks to maintain readable margins.
- **Nav padding**: `1.25rem` (20px) vertical, `1rem` horizontal on desktop.
- **Typing test spacing**: `1.25rem` (20px) gap between stat elements, `1.25rem` bottom margin on stats bar.

### Alignment & Visual Balance
- **Header**: Space-between flex layout — logo/nav on left, utilities on right.
- **Typing test**: Centered column layout within content area. Text left-aligned and wrapping naturally.
- **Store grid**: 3-column CSS Grid with `16px` gap.
- **Account stats**: Evenly distributed flex row within a rounded card.
- **Dialogs**: Centered content with generous internal padding.

### Responsive Behavior & Touch
- **Mobile-first adjustments** at 768px and 480px breakpoints.
- Logo text and image hide below 650px.
- Typing test font scales: 1.5rem → 1.25rem → 1rem.
- Store grid likely collapses on small screens (no explicit responsive override, but flexbox fallback).
- Navigation icon padding reduces: 25px → 20px → 15px.
- Typing stats row switches from horizontal to vertical column at ≤768px.

## 6. Design System Notes for Stitch Generation

### Language to Use
- "Dark charcoal canvas", "monospaced precision", "warm amber accent against cool steel"
- "Minimalist speed-typing interface", "focused immersive feel", "developer-tool aesthetic"
- "Ghost text fading into typed confirmation", "pulsing amber cursor beacon"
- "Clean iconographic navigation with generous touch targets"
- "Borderless data tables with alternating row shading"

### Color References
- **Charcoal Steel** `#333437` — Background
- **Deep Graphite** `#2B2E31` — Card/elevated surfaces
- **Ash Gray** `#636669` — Mid-tone, untyped text, borders
- **Burnt Amber** `#D6985C` — Primary accent, cursor, highlights
- **Pure White** `#ffffff` — Text, typed characters
- **Soft Coral** `#ff7474` — Error/incorrect

### Component Prompts
- "Create a monospaced typing test interface on a dark charcoal (#333437) background. Show a line of ghost-gray text (#636669) with the first untyped character highlighted in warm amber (#D6985C) with a blinking underline cursor. Above the text, display WPM and accuracy stats on the left and reset/settings icons on the right."
- "Design a navigation header with a Shiba Inu logo and 'shibatype' wordmark in Roboto Mono on the left. On the right, show a palette icon, coin count with a gold coin icon, and user icon. All icons in white on a dark charcoal bar."
- "Create a theme store page with a 3-column grid of theme preview cards. Each card shows the theme name with a lock/unlock icon, four color swatches (30px circles), and a price badge in the top-right showing '100' with a coin icon."

### Incremental Iteration
- Start with the core typing test page — it's the heart of the app.
- Layer in the header navigation and theme-switching dialog separately.
- Build the leaderboard and store pages as secondary screens.
- The account pages (login/signup/profile) use MUI components heavily — focus on matching the dark background and amber accent rather than recreating MUI internals.
