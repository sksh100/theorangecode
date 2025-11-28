"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackFunnelStep, trackMasterclassView, trackScrollDepth } from "@/lib/tracking";

export function VisitorTracker() {
  const pathname = usePathname();
  const sessionStartTime = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize session start time on first load
    if (!sessionStartTime.current) {
      sessionStartTime.current = Date.now();
    }

    // Track conversion funnel steps
    if (pathname === '/') {
      trackFunnelStep('homepage', 1);
    } else if (pathname === '/masterclasses') {
      trackFunnelStep('masterclasses_page', 2);
    } else if (pathname?.startsWith('/masterclasses/')) {
      trackFunnelStep('masterclass_detail', 3);
    } else if (pathname === '/contact') {
      trackFunnelStep('contact_page', 4);
    }

    // Track masterclass page views
    if (pathname === '/masterclasses') {
      trackMasterclassView('all', 'All Masterclasses');
    }

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
      trackScrollDepth(scrollPercent, pathname || '/');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

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

    // Track on initial load
    send();
    
    // Track navigation when pathname changes
    if (pathname) {
      send();
    }

    // Send periodic updates every 30 seconds to track session duration
    intervalRef.current = setInterval(() => {
      send();
    }, 30000); // 30 seconds

    // Cleanup interval and scroll listener on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  // Track session end when user leaves
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Send final tracking update
      const sessionId = localStorage.getItem('visitor_session_id');
      if (sessionId) {
        // Use sendBeacon for reliable tracking on page unload
        navigator.sendBeacon('/api/track-visitor', JSON.stringify({
          id: sessionId,
          path: window.location.pathname,
          referrer: document.referrer || null,
          userAgent: navigator.userAgent,
        }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return null;
}
