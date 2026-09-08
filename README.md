# Qaisar Asif — portfolio

Static one-page portfolio. No build step, no dependencies.

## Run locally

    python -m http.server 4321

Then open http://localhost:4321

## Deploy to Vercel

Import the repo on vercel.com and pick Framework Preset = **Other**.
Leave Build Command empty and Output Directory as the repo root.

Or from the CLI:

    npx vercel --prod

## Files

- `index.html` — all content
- `styles.css` — the whole design
- `main.js` — one load animation on the name, nothing else
- `portrait-560.*` / `portrait-1120.*` — optimised headshot (webp + jpg fallback)
- `profile.png` — original 1254px source, not deployed (see `.vercelignore`)

To regenerate the portrait after replacing `profile.png`:

    python -c "from PIL import Image; im=Image.open('profile.png').convert('RGB'); [ (im.resize((w,w), Image.LANCZOS).save(f'portrait-{w}.webp','WEBP',quality=82,method=6), im.resize((w,w), Image.LANCZOS).save(f'portrait-{w}.jpg','JPEG',quality=84,optimize=True,progressive=True)) for w in (560,1120) ]"
