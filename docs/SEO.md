# SEO implementation

The Next.js Metadata API provides route metadata. Public crawler resources are served from `public/`.

| Feature | Implementation | Location |
| --- | --- | --- |
| Site-wide metadata base and default title/description | Metadata API defaults and absolute base URL | `app/layout.js` |
| Default keywords and author | `keywords` and `authors` metadata | `app/layout.js` |
| Route-specific titles and descriptions | Route metadata overrides | `app/page.js`, `app/about/page.js`, `app/contact/page.js`, `app/products/page.js`, `app/services/page.js` |
| Canonical URLs | `alternates.canonical` on the site default and each route | `app/layout.js`, `app/page.js`, `app/about/page.js`, `app/contact/page.js`, `app/products/page.js`, `app/services/page.js` |
| Open Graph | Website type, site name, locale, URL, title, description, and logo image | `app/layout.js`; route overrides in each route's `page.js` |
| X/Twitter cards | `summary_large_image`, title, description, and logo image | `app/layout.js`; route overrides in each route's `page.js` |
| Browser/site icon | Icon points to the ONSK logo | `app/layout.js`, `/assets/logo.png` |
| Theme color | Viewport theme color | `app/layout.js` |
| Organization structured data | JSON-LD `Organization`, including business identity, address, logo, and contact details | `app/layout.js` |
| Product structured data | JSON-LD `SoftwareApplication` for ONSK OCR | `app/layout.js` |
| Crawl rules | Allows public routes, disallows `/api/`, and references the sitemap | `public/robots.txt` |
| XML sitemap | Lists home, products, services, about, and contact; includes home-page image metadata | `public/sitemap.xml` |
| Semantic and accessible page content | Language, page landmarks, headings, and image alternative text | `app/layout.js`, `content/pages/*.html`, `content/shell/*.html` |

The metadata host is `https://onsk.co.in`, configured as `metadataBase` in `app/layout.js`. When changing a page's route, update its canonical and social URLs as well as `public/sitemap.xml`.

## Route metadata

| Route | Metadata module |
| --- | --- |
| `/` | `app/page.js` |
| `/about` | `app/about/page.js` |
| `/contact` | `app/contact/page.js` |
| `/products` | `app/products/page.js` |
| `/services` | `app/services/page.js` |
