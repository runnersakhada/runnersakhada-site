# Runners Akhada — Website

Pure HTML/CSS/JS static site, deployed via GitHub Pages.

## Structure
- `index.html` — Home
- `coach.html` — Know Your Coach (new)
- `community.html` — Our Community / HSR Express (new)
- `training.html` — Training Plans (new)
- `faq.html` — FAQ (new)
- `contact.html` — Contact (native form)
- `form.html` — Join Now sign-up (native form)
- `assets/style.css` — shared stylesheet
- `assets/script.js` — nav toggle, FAQ accordion, native form handling
- `assets/images/logo.jpeg` — new logo

## Notes
- All images currently hotlinked from the Framer reference site
  (framerusercontent.com) as temporary placeholders — swap for your
  own hosted images in `assets/images/` whenever ready. Just update
  the `src` attributes.
- Forms are fully native HTML (no Framer dependency). They currently
  show a local success message on submit — wire `data-native-form`
  submissions to Formspree, Netlify Forms, or your own backend before
  going live (see `assets/script.js`).
- FAQ answers are marked `[update]` — draft copy, ready to be replaced.
- Existing site behavior/URLs preserved; new pages added alongside it.
