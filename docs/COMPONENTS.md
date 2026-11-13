# Reusable components

The reusable React components are in `components/`. The root layout also contains a small private HTML-fragment helper; it is documented here because it supplies the shared page shell.

## `StaticPage`

**File:** `components/static-page.js`
**Kind:** Server component
**Purpose:** Reads and renders one route's HTML fragment with `readPage` from `lib/legacy-content.js`.

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `file` | `string` | Yes | Filename in `content/pages/`, for example `home.html` or `contact.html`. |

Example:

```jsx
import StaticPage from "../components/static-page";

export default function HomePage() {
  return <StaticPage file="home.html" />;
}
```

**Used by:** `app/page.js`, `app/about/page.js`, `app/contact/page.js`, `app/products/page.js`, and `app/services/page.js`.

## `RouteEffects`

**File:** `components/route-effects.js`
**Kind:** Client component
**Purpose:** Watches the active pathname, updates the shared navigation's active link and `aria-current`, and refreshes Lucide icons after route changes.

| Props | Type | Required | Description |
| --- | --- | --- | --- |
| None | — | — | Uses the current pathname from `next/navigation`. |

Example:

```jsx
import RouteEffects from "../components/route-effects";

export default function SharedLayout() {
  return <RouteEffects />;
}
```

**Used by:** `app/layout.js`, once for the shared site shell.

## `LegacyMarkup`

**File:** `app/layout.js`
**Kind:** Private server-rendered helper
**Purpose:** Reads and renders one shared HTML fragment through `readShell` from `lib/legacy-content.js`.

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `file` | `string` | Yes | Filename in `content/shell/`, such as `header.html` or `footer.html`. |

Example from the root layout:

```jsx
<LegacyMarkup file="header.html" />
```

**Used by:** `RootLayout` in `app/layout.js` for the header, floating enquiry action, modal, and footer. This helper is local to the layout and is not exported from `components/`.

## `RootLayout`

**File:** `app/layout.js`
**Kind:** Next.js root layout
**Purpose:** Wraps every route in the shared HTML shell, font variables, global styles, route effects, and scripts.

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Yes | Active route content provided by the App Router. |

Example:

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

**Used by:** Next.js automatically uses `app/layout.js` as the root wrapper for every route; route modules do not import it directly.

## Screenshot

The image below shows the homepage with the shared layout and route content rendered:

![ONSK homepage showing shared header, homepage content, and footer](assets/home-page.png)

To refresh it while developing, run `npm run dev`, open `http://localhost:3000/`, and capture the browser viewport.
