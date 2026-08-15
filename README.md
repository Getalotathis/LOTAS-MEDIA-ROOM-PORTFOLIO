# Lotasroom Portfolio Site

A free, static portfolio site — no domain purchase needed. Hosted on GitHub Pages
at a URL like `https://yourusername.github.io/lotasroom-portfolio`.

## Files
```
index.html      the whole page
css/style.css   all styling
js/script.js    nav toggle, timecode clock, scroll reveal
```

## Put it on GitHub Pages (free hosting)

1. **Create a GitHub account** at github.com if you don't have one.
2. **Create a new repository**
   - Click the `+` in the top right → *New repository*
   - Name it something like `lotasroom-portfolio` (this becomes part of your URL)
   - Keep it **Public** (required for free Pages hosting)
   - Don't add a README/gitignore — you already have these files
3. **Upload these files**
   - On the new repo page, click *uploading an existing file*
   - Drag in `index.html`, the `css` folder, and the `js` folder (keep the folder structure)
   - Commit the changes
4. **Turn on Pages**
   - Go to the repo's **Settings** tab → **Pages** (left sidebar)
   - Under "Build and deployment" → Source, choose **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)` → Save
5. Wait ~1 minute, then refresh that Settings → Pages screen. It'll show your live
   URL: `https://yourusername.github.io/lotasroom-portfolio/`

Every time you upload a new file or edit one on GitHub, the live site updates
automatically within a minute or two.

## Editing your work into it

Open `index.html` and find the `<section class="work">` block. Each project is
one `<article class="work-card ...">`. To swap in real work:

- Change the `<h3>` title and the `<p>` client/year line
- Replace the placeholder gradient with a real thumbnail: in `css/style.css`,
  find `.thumb-1` (through `.thumb-6`) and swap the `background:` for
  `background:url('images/your-photo.jpg') center/cover;`
- For a video project, you can link the whole card to YouTube/Vimeo by wrapping
  the `<article>` in an `<a href="...">` tag
- Duplicate a whole `<article class="work-card size-md" data-cat="video">...</article>`
  block to add more projects. `size-lg`, `size-md`, `size-sm` control how wide the card is

To add real images: create an `images/` folder next to `index.html`, upload your
photos there, and reference them as `images/filename.jpg`.

## Custom domain later (optional)

If you ever want `lotasroom.com` instead of the github.io address, buy the
domain separately and add it under Settings → Pages → Custom domain — everything
else stays the same and hosting is still free.
