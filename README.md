# 3D Portfolio Website

A personal portfolio site for **Åke Berg** — indie game maker & 3D artist, Digital Media student at Stockholms universitet. Showcases 3D models and animation work with a filterable project grid, a full media gallery, and a lightbox viewer.

Built as a school project (Gesällprov, Webbutveckling I) with no frameworks — just vanilla HTML, CSS and JavaScript.

## Features

- Filterable project grid (by category: Models, Animations)
- Gallery view of all media across projects
- Lightbox with keyboard navigation (arrow keys, Esc) for images and video
- Scroll-reveal animations and active-section nav highlighting
- Fully responsive, no build step or dependencies

## Tech stack

- HTML5 / CSS3
- Vanilla JavaScript (DOM APIs, `IntersectionObserver`)
- Content-driven: projects and categories are defined in [`data.js`](data.js), rendering logic lives in [`app.js`](app.js)

## Running locally

No build tools or dependencies required. Just serve the folder with any static server, for example:

```bash
npx serve .
```

Then open the printed local URL in your browser. (Opening `index.html` directly also works, though a local server avoids any browser file:// restrictions on video loading.)

## Project structure

```
├── index.html      # Page markup
├── style.css       # Styling
├── app.js          # Rendering logic (cards, gallery, lightbox)
├── data.js         # Project & category content
├── media/          # Images and videos per project
└── fonts/          # Poppins font files
```

## Author

**Åke Berg**
[ake.berg@outlook.com](mailto:ake.berg@outlook.com)
