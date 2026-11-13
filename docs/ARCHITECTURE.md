# Architecture

## App Router structure

The Next.js App Router lives under `app/`. `app/layout.js` is the root layout shared by every route. It renders the header, floating enquiry action, route content, enquiry modal, and footer around the active page. Route page modules export route-specific metadata and render the corresponding HTML fragment through `components/static-page.js`.

| Route | Route module | Content fragment |
| --- | --- | --- |
| `/` | `app/page.js` | `content/pages/home.html` |
| `/about` | `app/about/page.js` | `content/pages/about.html` |
| `/contact` | `app/contact/page.js` | `content/pages/contact.html` |
| `/products` | `app/products/page.js` | `content/pages/products.html` |
| `/services` | `app/services/page.js` | `content/pages/services.html` |
| `POST /api/inquiries` | `app/api/inquiries/route.js` | JSON request; no page fragment |

`lib/legacy-content.js` reads page and shared-shell HTML from `content/`, fixes route visibility, and rewrites `assets/` URLs to `/assets/`. The page and shell components render this trusted, repository-owned HTML. Global styles are in `app/globals.css`.

## Data flow

```text
Browser request
      |
      v
Next.js App Router ---- route metadata
      |
      v
app/layout.js (shared shell)
      |
      +---- route page -> StaticPage -> lib/legacy-content.js -> content/pages/*.html
      |                                      |
      |                                      +-> /assets/* (public/assets/)
      |
      +---- RouteEffects (client navigation state and icon refresh)
      |
      +---- public/script.js (form and other browser interactions)
                         |
                         | POST /api/inquiries (JSON)
                         v
                 app/api/inquiries/route.js
                 validate required fields
                         |
                         v
                 MongoDB: companyDB.inquiries
                 (requires MONGO_URI)
```

Page content and shared layout are rendered by the server; `components/route-effects.js` and `public/script.js` handle browser-side behavior. The API returns a validation or configuration error if required input or the database connection is unavailable.

## SEO location

Global metadata, the organization/software JSON-LD script, and the viewport theme color are defined in `app/layout.js`. Each route exports its own title, description, canonical URL, Open Graph, and Twitter metadata in its `app/**/page.js` module. Crawler files served from `public/` are `public/robots.txt` and `public/sitemap.xml`. See [SEO.md](SEO.md) for the complete feature and file list.

## Fonts and images

- `app/layout.js` loads Inter and Poppins with `next/font/google`, exposes their CSS variables, and applies them to the root element. These fonts are requested during the Next.js build and may require network access unless already cached.
- Site media is served from `public/assets/` at `/assets/`. The content reader rewrites relative asset paths to that URL prefix.
- Existing content HTML uses regular `<img>` tags, and the shared header/footer and page fragments refer to the public assets. There is no custom `next/image` loader or image-domain configuration in `next.config.mjs`.
- `assets/` holds source copies of media; the browser-facing paths resolve to `public/assets/`.
