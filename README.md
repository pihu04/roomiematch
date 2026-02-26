# ROOMIEMATCH — Find Your Vibe

A high-fidelity, responsive, static React landing page for **ROOMIEMATCH**: promotion and waitlist collection for an upcoming roommate-matching app.

## Stack

- **React** (Vite)
- **CSS** (no Tailwind) — dedicated CSS files per component/section
- **Framer Motion** — section and quiz animations
- **React-GA4** — analytics (optional, via env)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`.

## Deploy to GitHub Pages

1. **Repo name and base path**  
   In `vite.config.js`, the production `base` is set to `'/roomie-match/'`. If your repo is named differently, change it to `'/<your-repo-name>/'` (e.g. `'/roomiematch/'`).

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy `dist`**
   - **Option A — GitHub Actions**  
     Use a workflow that runs `npm run build` and deploys the `dist` folder with [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) or similar.

   - **Option B — Manual**  
     Push the contents of `dist` to the `gh-pages` branch (or use the branch that your repo uses for GitHub Pages).

4. **Repo settings**  
   In the repo: **Settings → Pages** → Source: **Deploy from a branch** → Branch: `gh-pages` (or your chosen branch) → root (or `/ (root)`).

Your site will be at `https://<username>.github.io/<repo-name>/`.

## Google Analytics 4 (optional)

1. Create a GA4 property and copy the Measurement ID (e.g. `G-XXXXXXXXXX`).
2. Add a `.env` file in the project root:
   ```env
   VITE_GA_ID=G-XXXXXXXXXX
   ```
3. Rebuild: `npm run build`.  
   GA4 will initialize on load, send `page_view` on section changes, and fire a `quiz_completed` event when the compatibility quiz is finished.

## Project structure

```
src/
  components/
    Hero.jsx       Hero.css
    Navbar.jsx     Navbar.css
    Quiz.jsx       Quiz.css
    Footer.jsx     Footer.css
  sections/
    HowItWorks.jsx   HowItWorks.css
    Pricing.jsx      Pricing.css
    Testimonials.jsx  Testimonials.css
    Signup.jsx       Signup.css
  App.jsx
  App.css
  index.css
  main.jsx
```

- **Single-page flow**: sections are `home` | `how-it-works` | `quiz` | `pricing` | `testimonials` | `signup`, switched with React state and Framer Motion.
- **Quiz**: 5-step compatibility quiz in a glassmorphism modal (or embedded on the quiz section). Results in a “Roommate Personality Profile” summary.
- **Waitlist**: form with `.edu` email validation; submit shows a success toast (no backend).

## License

Private / All rights reserved.
