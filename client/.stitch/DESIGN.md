---
name: "ShibaType"
colors:
  primary: "#D6985C"
  secondary: "#636669"
  background: "#333437"
  textPrimary: "#ffffff"
  textSecondary: "#636669"
  surface: "#2B2E31"
  error: "rgb(255, 116, 116)"
---

# Design System: ShibaType

## 1. Visual Theme & Atmosphere
ShibaType is a minimal, developer-focused typing test application. The default aesthetic is dark and distraction-free, prioritizing legibility and focus. The design embraces a monospaced, terminal-like feel, emphasizing performance and typing mechanics.

The application uses multiple themes, but the core design language remains constant: a solid, deep background with contrasting muted primary colors for untyped text, and stark, bright colors for typed/active text.

## 2. Color Palette & Roles

### Primary Foundation
- **Base Background**: `#333437` - The main canvas of the application (Dark theme).
- **Surface Dark**: `#2B2E31` - Used for elevated elements, headers, and table rows to create subtle depth.
- **Surface Light**: `#636669` - Used for secondary elevated elements.

### Accent & Interactive
- **Primary Accent**: `#D6985C` - A warm, golden-orange used for active elements, highlights, blinking cursors, and the logo.
- **Interactive Hover**: Highlights on icons and interactive elements transition to the primary accent color.

### Typography & Text Hierarchy
- **Typed Text / Primary**: `#ffffff` - Stark white for maximum contrast on typed characters and primary headings.
- **Untyped Text / Secondary**: `#636669` - Muted gray for characters yet to be typed, providing a clear visual path without overwhelming the eye.

### Functional States
- **Error / Incorrect**: `rgb(255, 116, 116)` - A soft red used as the background for incorrectly typed characters to provide immediate, undeniable feedback.

## 3. Typography Rules

### Hierarchy & Weights
- **Font Family**: `Roboto Mono` (Primary) - Used globally for all UI text, stats, and the typing test area to maintain a consistent, monospace rhythm.
- **Logo Font**: `Metal Mania` - Used specifically for the brand logo to give it a distinct, stylized personality.

### Spacing Principles
- **Line Height**: `1.6` for the typing test text, ensuring comfortable reading and tracking as the eye moves across the lines.
- **Word Wrap**: Generous word wrapping to accommodate long passages of text seamlessly.

## 4. Component Stylings

### Typography Test Area
- The core interaction area. Untyped text is muted (`#636669`). The active character features a blinking underline (`#D6985C`). Typed text turns stark white (`#ffffff`). Mistakes are highlighted with a red background (`rgb(255, 116, 116)`).

### Stats Bar
- Positioned above the typing area. Displays WPM and Accuracy in a simple, row-based layout. Uses monospace typography for a raw, data-driven feel. Features subtle interactive icons for resetting and settings.

### Navigation & Header
- A simple, structured layout. The header and footer frame the main content area.

### Modals & Dialogs
- Settings and Store modals use rounded corners (`12px`) and solid borders matching the primary accent color (`2px solid #636669` or `#D6985C`). Backgrounds match the base theme to feel integrated rather than floating.

### Skeleton Loaders
- Rectangular blocks with subtle pulsing animations (`animate-pulse`). They match the surface colors (`#2B2E31`) and feature rounded corners to preview content structure without jarring layout shifts.

## 5. Layout Principles

### Grid & Structure
- **Global Layout**: A CSS Grid layout with distinct `header`, `main`, and `footer` areas, ensuring the footer stays at the bottom of the viewport (`min-height: 100vh`).
- **Content Wrapper**: Max width of `1200px` with a minimum width of `400px`, centered using `margin: auto`.

### Whitespace Strategy
- **Padding**: Adaptive padding based on breakpoints. `1rem` on desktop, `1.5rem` on tablets, and `2rem` on mobile.
- **Gap**: Grid gaps of `8px` between layout sections.

### Alignment & Visual Balance
- Centralized focus. The typing test container is heavily centered using flexbox (`justify-content: center`, `align-items: center`), drawing the user's attention directly to the task.

### Responsive Behavior
- **Desktop**: Full size, font size `1.5rem` for the typing test.
- **Tablet (`< 768px`)**: Font size reduces to `1.25rem`. Stats bar collapses into a column layout.
- **Mobile (`< 480px`)**: Font size reduces to `1rem`. Margins tighten to maximize screen real estate.

## 6. Design System Notes for Stitch Generation

### Language to Use
Describe elements as "distraction-free", "monospaced", "developer-focused", and "high-contrast". Use terms like "terminal-style" and "raw data presentation".

### Color References
- Primary Accent: #D6985C
- Muted Text: #636669
- Background: #333437
- Surface: #2B2E31
- Incorrect State: rgb(255, 116, 116)

### Component Prompts
- "A typing test area with muted gray monospace text and a blinking orange underline cursor."
- "A data-driven stats bar showing WPM and accuracy in monospace font, with small, subtle icon buttons."
- "A minimal dark-mode leaderboard table with alternating row colors and a stark white typography."

### Incremental Iteration
Focus on keeping the layout extremely clean. Do not add unnecessary borders or shadows. Rely on typography and high-contrast color shifts to convey interaction state.
