"use client";

import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    const send = async () => {
      try {
        const response = await fetch("/api/track-visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer || null,
            userAgent: navigator.userAgent,
          }),
        });
        const data = await response.json();
        if (data.ok) {
          console.log('✅ Visitor tracked successfully');
        } else {
          console.warn('⚠️ Visitor tracking response:', data);
        }
      } catch (err) {
        console.error("❌ Visitor tracking failed", err);
      }
    };

    send();
  }, []);

  return null;
}
