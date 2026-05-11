# 📝 Portfolio Audit - Master To-Do List

## 🛠 Phase 1: Accessibility & SEO (Highest Priority)
- [x] **Contrast Fix**: Update body text color to `#e0e0e0` for better readability on dark background.
- [x] **Reduced Motion**: Add CSS media query to disable animations for users who prefer reduced motion.
- [x] **Meta Tags**: Implement Open Graph (OG) and Twitter Card metadata for better social sharing.
- [x] **JSON-LD**: Add Schema.org structured data (Person & WebSite) for elite SEO.
- [x] **Footer Alignment**: Refactor footer to `justify-between` (Copyright left, Socials right).
- [x] **A11y Labels**: Add `aria-label` to all interactive icons (Github, Linkedin, etc.).

## ⚡ Phase 2: Performance & Asset Optimization
- [x] **Inline Grain SVG**: Convert the external noise SVG to Base64 to save one HTTP request.
- [x] **Font Preloading**: Preload the critical weight of 'Cormorant Garamond' (500).
- [x] **Code Splitting**: Dynamically import `AnimatedList` to reduce initial bundle size.
- [x] **Lighthouse Audit**: Run a full audit and fix any remaining performance bottlenecks.

## ✨ Phase 3: Visual Polish & Micro-Interactions
- [ ] **Typography Refinement**: Add `tracking-[0.04em]` to the loader text for a more elegant look.
- [ ] **Focus States**: Add `:focus-visible` outlines for better keyboard navigation visibility.
- [ ] **Scroll Cue**: Add a subtle "Scroll Down" arrow in the experience section.
- [ ] **Glassmorphism Hover**: Upgrade cards to use `backdrop-filter: blur(8px)` on hover.

## 🎨 Phase 4: Creative "Art" Add-Ons (Standout Features)
- [ ] **Custom Cursor**: Implement a custom circle cursor with a faint particle trail.
- [ ] **Interactive Signature**: Add a fluid ink-spill effect to the "Building the Future" badge.
- [ ] **3D Helix Nav**: (Optional) Add a Three.js orbiting helix for section navigation.
- [ ] **Ambient Soundscape**: (Optional) Add a low-volume generative background audio.

---
*Status: Initialized on 2026-05-11*
