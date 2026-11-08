# CEEL Portfolio update plan

## Implementation

- Preserve the existing static HTML/CSS/JS structure and visual direction.
- Add a dedicated `cv.html` page using the supplied CV image at `images/cv/PornasaJannkennethCV.jpg`, with a responsive preview and a direct download action.
- Add a persistent View CV navigation action across all pages, plus a contextual CV action on the About page.
- Add download links for every portfolio image surface: project images, the profile image, certificate images, carousel images, and the CV preview.
- Improve responsive behavior for navigation, hero layouts, cards, modals, image controls, and footer content from desktop through narrow phones.
- Keep the project self-contained with relative paths and no new runtime dependencies.

## Design

- **Design Movement:** editorial portfolio with tactile print-inspired accents (0.06 probability).
- **Core Principles:** clear hierarchy, warm paper/ink contrast, practical interactions, and generous breathing room.
- **Color Philosophy:** retain the existing paper, forest green, coral, and ink palette so new controls feel native rather than bolted on.
- **Layout Paradigm:** asymmetric editorial sections that collapse into a single readable column on small screens.
- **Signature Elements:** coral action pills, mono eyebrow labels, and framed imagery.
- **Interaction Philosophy:** every image action is explicit and keyboard accessible; previews open without losing the user’s place.
- **Animation:** keep the existing restrained hover/slide motion and honor reduced-motion preferences.
- **Typography System:** DM Sans for interface copy, DM Mono for labels, and Playfair Display italic for emphasis.
- **Brand Essence:** a curious IT student’s practical, visual learning archive; thoughtful, exploratory, grounded.
- **Brand Voice:** concise and reflective, e.g. “View my CV” and “Download image.”
- **Wordmark & Logo:** preserve the existing circular C mark and CEEL wordmark.
- **Signature Brand Color:** coral `#f0785c` for actions and learning moments.

## Project structure

- Root HTML pages: site routes and page-specific content.
- `styles.css`: shared layout, responsive breakpoints, and interaction styling.
- `script.js`: data-driven project, certificate, skill, carousel, menu, and modal rendering.
- `images/`: supplied profile, CV, project, and certificate assets.
