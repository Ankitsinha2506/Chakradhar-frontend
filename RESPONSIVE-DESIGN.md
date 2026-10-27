# Responsive visual system

The main user journey uses an ivory background, terracotta actions, warm gold accents, consistent borders, and local devotional imagery. No new dependencies are required.

- `ui/theme.js`: shared palette and live window dimensions. The home and temple pages cap their width at 1200px and use 1–4 columns, with 16px gaps.
- `ui/ResponsiveGrid.js`: category grids measure their available container, including after resizing or device rotation. Column changes remount the FlatList as required by React Native.
- `ui/Motion.js`: a short entrance animation that checks the system reduced-motion setting, plus hover and press feedback.
- Navigation uses safe-area insets and a visible, labeled bottom bar that reserves its own space. The drawer scrolls on short screens.
- Authentication forms cap at 520px; reading content caps at 800px. Local and deployed API settings are unchanged.
- Home categories are registered navigation destinations, so the navigation cards no longer require a backend request to display. Category content still comes from the backend.

## Review sizes

Check browser widths of 320, 390, 768, 1024 and 1440px, then rotate Android and iOS devices. Check larger system text, keyboard-open forms, drawer scrolling, long Marathi titles, category text/audio/video tabs, temple navigation, and the system reduced-motion setting. Bundling checks do not replace these device checks.

## Follow-up design suggestions

Apply the shared palette and spacing to the remaining admin and long biography screens. Use a consistent Devanagari font with a verified loading fallback throughout the application. Replace placeholder audio and video titles with real metadata before publishing. Optimize the larger image assets to reduce download sizes. Keep administrative authorization enforced on the backend.
