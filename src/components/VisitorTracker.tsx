"use client";

import { useEffect } from "react";

export function VisitorTracker() {
  useEffect(() => {
    const send = async () => {
      try {
        // Get or create session ID
        let sessionId = localStorage.getItem('visitor_session_id');
        if (!sessionId) {
          sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('visitor_session_id', sessionId);
        }

        const response = await fetch("/api/track-visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: sessionId,
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
