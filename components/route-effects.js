"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const activeRoute = pathname.replace(/^\/|\/$/g, "") || "home";

    document.querySelectorAll(".nav-link").forEach((link) => {
      const isCurrent = link.id === `nav-${activeRoute}`;
      link.classList.toggle("active", isCurrent);
      if (isCurrent) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    window.lucide?.createIcons();
  }, [pathname]);

  return null;
}
