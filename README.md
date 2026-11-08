# CEEL Portfolio — editing guide

This is a plain HTML, CSS, and JavaScript portfolio. You do not need a framework to update the content.

## Change the content

Open `script.js`. The editable content is at the top of the file in three arrays:

- `PROJECTS` controls the project cards and the project portion of the homepage carousel.
- `CERTIFICATES` controls the certificates and the certificate portion of the homepage carousel.
- `SKILLS` controls the separate Skills page.

To add an image, place it in `images/projects`, `images/certs`, or `images/profile`, then use its website path such as `/images/projects/my-image.jpg` in the matching array.

## Change the look

Open `styles.css` to update colors, typography, spacing, responsive breakpoints, and component styles. The main colors are near the top in `:root`.

## Run locally

If Node.js is installed, run `npm run dev:static` or `pnpm dev:static` from the website folder, then open the local URL shown by Vite. The pages are `index.html`, `about.html`, `projects.html`, `certificates.html`, and `skills.html`, and `contact.html`.

## Contact page

The email address lives in `CONTACT_EMAIL` near the top of the contact section in `script.js`. The `mailto:` links in the HTML pages also use it, so search for `japornasa@ccc.edu.ph` to change it everywhere. The form opens the visitor's email app with the message filled in, because this site has no server to send mail itself.

## Download buttons

Download buttons save the real file instead of opening the image. They also work when you open `index.html` straight from the folder, because a stored copy of each image lives in `downloads/`.

If you add, rename, or replace an image in `images/`, run `python make-downloads.py` once to refresh that folder. If you skip it, downloads still work online and with Live Server.
