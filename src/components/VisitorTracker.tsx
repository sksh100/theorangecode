"use client";

import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    const send = async () => {
      try {
        await fetch("/api/track-visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer || null,
            userAgent: navigator.userAgent,
          }),
        });
      } catch (err) {
        console.error("Visitor tracking failed", err);
      }
    };

    send();
  }, []);

  return null;
}
