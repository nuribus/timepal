# Design Guidelines: Toddler Timer App

## Design Approach: Apple HIG System-Based

**Rationale:** Utility-focused application requiring clarity, minimalism, and distraction-free experience. Following Apple's Human Interface Guidelines ensures optimal usability for caregivers managing toddlers.

**Core Principles:**
- **Clarity:** Instant comprehension, zero learning curve
- **Deference:** Timer and content take absolute precedence
- **Depth:** Subtle visual hierarchy guiding natural interaction flow

---

## Color Palette

### Primary Colors (Dark & Light Mode)
**Forest Green Theme:**
- Primary: `140 58% 25%` (Deep Forest) - Main timer ring, primary buttons
- Secondary: `110 45% 42%` (Woodland Green) - Preset buttons, secondary elements  
- Accent: `88 50% 65%` (Sage Green) - Active states, highlights
- Success: `140 58% 35%` (Growth Green) - Timer completion state

**Neutral Foundation:**
- Background Light: `0 0% 98%` (Soft White)
- Background Dark: `140 15% 8%` (Deep Charcoal with green tint)
- Text Light: `140 20% 15%` (Forest Charcoal)
- Text Dark: `0 0% 95%` (Off White)

**Timer State Colors (Visual Feedback):**
- Ready: Sage Green `88 50% 65%`
- Running: Woodland Green `110 45% 42%`  
- Warning (30s left): Amber `38 92% 50%`
- Complete: Success Green `140 58% 35%`

---

## Typography

**Font Family:** Inter (Google Fonts via CDN)

**Scale:**
- Timer Display: 96px / font-bold (main countdown)
- Section Headings: 24px / font-semibold
- Preset Labels: 18px / font-medium
- Body Text: 16px / font-normal
- Helper Text: 14px / font-normal

**Line Heights:**
- Timer: 1
- Headings: 1.2
- Body: 1.5

---

## Layout System

**Spacing Primitives (Tailwind):** Use units of `4, 8, 12, 16, 20, 24` for consistent rhythm
- Component padding: `p-8` or `p-12`
- Section gaps: `gap-8` or `gap-12`
- Button spacing: `px-8 py-4`

**Grid Structure:**
- Single column layout (max-w-2xl centered)
- Timer takes 60% vertical space
- Presets occupy remaining 40%
- Mobile-first: Full viewport usage

**Touch Targets:**
- Minimum: 60x60pt (exceeds Apple's 44pt for toddler safety)
- Preset buttons: 80x80pt (large, easy tapping)
- Primary action: 64px height minimum

---

## Component Library

### Core Timer Component
**Visual Design:**
- Circular progress ring (280px diameter desktop, 240px mobile)
- Thick stroke (24px) showing time depletion
- Animated color transition: Green → Yellow → Orange → Red
- Large centered countdown display
- Subtle drop shadow for depth: `shadow-2xl`

**Animation Behavior:**
- Smooth circular wipe animation (disappearing disk technique)
- 0.1s linear frame updates for fluid motion
- Gentle pulse at 30-second warning
- Celebratory scale animation on completion

### Preset Buttons
**Style:**
- Rounded squares: `rounded-2xl`
- Size: 80x80pt with icon + label
- Background: Secondary green with 10% opacity
- Active state: Solid secondary color
- Icon: 32x32px from Heroicons (outline style)
- Label below icon: 14px medium weight

**Preset Configuration:**
1. Brushing Time (2min) - Sparkles icon
2. Clean-Up Time (5min) - Cube icon  
3. Bath Time (10min) - Beaker icon
4. Play Time (15min) - Puzzle icon
5. Cool Down (3min) - Heart icon
6. Quiet Time (20min) - Book icon

### Sound Selection
**Design:**
- Horizontal pill-shaped radio group
- Three options with descriptive icons
- Selected state: Solid primary green
- Unselected: Outline style with subtle background
- Icons: Volume icons from Heroicons

**Sound Themes:**
1. Gentle Chime (calm activities) - Bell icon
2. Happy Bell (play/fun) - Musical note icon
3. Soft Gong (transitions) - Speaker icon

### Authentication Prompt
**Placement:** Bottom sheet/modal (non-intrusive)
**Trigger:** After 5 timer completions
**Design:**
- Soft gradient background overlay
- Centered card with rounded corners (16px)
- Benefits list with checkmarks
- Primary CTA: "Sign Up Free"
- Dismissible with subtle X button

---

## Navigation & Controls

**Header (Minimal):**
- App title: 18px semibold, left-aligned
- History icon (authenticated users): Top right
- Height: 64px with py-4

**Start/Pause Button:**
- Floating action button style
- 72px diameter circle
- Primary green background
- Play/Pause icon (48px)
- Positioned below timer, centered
- `shadow-lg` for prominence

**Reset Button:**
- Secondary outline style
- 48px height, auto width
- Positioned adjacent to timer display
- Only visible when timer is active

---

## Animations & Interactions

**Timer Countdown Animation:**
- Circular SVG path with `stroke-dashoffset` animation
- Color interpolation: CSS custom properties
- Frame rate: 10fps (100ms intervals) for smooth battery-friendly animation
- Completion: 360° rotation with scale pulse (1 → 1.1 → 1)

**Preset Selection:**
- Tap: Scale down (0.95) with haptic feedback
- Active state: Gentle glow effect (`shadow-lg` with brand color)
- Selection persistence: Border highlight (4px solid)

**Page Transitions:**
- Fade in on load: 300ms ease
- No route transitions (single page app)
- Modal overlays: Slide up from bottom (250ms)

---

## Accessibility

**Color Contrast:**
- All text meets WCAG AAA (7:1 minimum)
- Timer display: Maximum contrast in both modes
- Interactive elements: 4.5:1 minimum

**Dark Mode:**
- Consistent forest theme with desaturated greens
- Reduced brightness for evening use
- Timer ring maintains high contrast

**Touch Accessibility:**
- All buttons exceed 60x60pt minimum
- Clear visual feedback on all interactions
- Sound completion essential for non-visual users

---

## Images & Visual Assets

**No decorative images required.** App focuses entirely on functional timer visualization. All iconography uses Heroicons (outline variant) loaded via CDN.

**Exception:** Success celebration screen may include subtle confetti SVG animation (inline, not external image).

---

## Key Design Decisions

1. **Single-screen experience:** No navigation complexity
2. **Timer-first hierarchy:** 60% of visual weight on countdown
3. **Generous whitespace:** Reduces cognitive load for stressed caregivers
4. **Persistent last-used timer:** Remembers selection via localStorage
5. **Progressive disclosure:** Auth prompt only after demonstrated value (5 uses)
6. **Performance-conscious animations:** Battery-friendly, 10fps timer updates

**Design Differentiation:** Unlike colorful competitor apps, this design uses calming forest greens and extreme simplicity—positioning as the "calm, focused timer" parents trust during stressful toddler moments.