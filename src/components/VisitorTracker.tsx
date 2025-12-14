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

    // Collect comprehensive visitor information
    const getVisitorInfo = async () => {
      const info: any = {};
      
      // Network Information
      if ('connection' in navigator) {
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        if (connection) {
          info.networkType = connection.type || 'unknown';
          info.networkEffectiveType = connection.effectiveType || 'unknown';
          info.networkDownlink = connection.downlink || 0;
          info.networkRtt = connection.rtt || 0;
        }
      }
      
      // Fallback network detection
      if (!info.networkType || info.networkType === 'unknown') {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        info.networkType = isMobile ? 'cellular' : 'wifi';
      }
      
      // Screen/Display Information
      info.screenWidth = window.screen.width;
      info.screenHeight = window.screen.height;
      info.viewportWidth = window.innerWidth;
      info.viewportHeight = window.innerHeight;
      info.colorDepth = window.screen.colorDepth;
      info.pixelRatio = window.devicePixelRatio || 1;
      
      // Device Memory (if available)
      if ('deviceMemory' in navigator) {
        info.deviceMemory = (navigator as any).deviceMemory;
      }
      
      // Hardware Concurrency (CPU cores)
      if (navigator.hardwareConcurrency) {
        info.cpuCores = navigator.hardwareConcurrency;
      }
      
      // Language & Locale
      info.language = navigator.language;
      info.languages = navigator.languages || [navigator.language];
      info.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      info.timezoneOffset = new Date().getTimezoneOffset();
      
      // Platform Details
      info.platform = navigator.platform;
      info.vendor = navigator.vendor;
      
      // Battery API (mobile devices)
      if ('getBattery' in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          info.batteryLevel = Math.round(battery.level * 100);
          info.batteryCharging = battery.charging;
        } catch (e) {
          // Battery API not available or denied
        }
      }
      
      // Privacy Settings
      info.doNotTrack = navigator.doNotTrack || 'unknown';
      info.cookieEnabled = navigator.cookieEnabled;
      
      // Performance Timing (initial load)
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        info.pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        info.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
      }
      
      // Referrer Details
      if (document.referrer) {
        try {
          const referrerUrl = new URL(document.referrer);
          info.referrerDomain = referrerUrl.hostname;
          info.referrerPath = referrerUrl.pathname;
          
          // Extract search query if from search engine
          const searchParams = referrerUrl.searchParams;
          if (searchParams.has('q')) {
            info.searchQuery = searchParams.get('q');
          }
        } catch (e) {
          // Invalid referrer URL
        }
      }
      
      // UTM Parameters
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const utmParams: any = {};
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
          const value = urlParams.get(param);
          if (value) utmParams[param] = value;
        });
        if (Object.keys(utmParams).length > 0) {
          info.utmParams = utmParams;
        }
      } catch (e) {
        // URL parsing failed
      }
      
      return info;
    };

    const send = async () => {
      try {
        // Get or create session ID
        let sessionId = localStorage.getItem('visitor_session_id');
        if (!sessionId) {
          sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('visitor_session_id', sessionId);
        }

        // Get comprehensive visitor information
        const visitorInfo = await getVisitorInfo();

        const currentPath = window.location.pathname;
        console.log('📍 Tracking page view:', { 
          page: currentPath, 
          sessionId: sessionId.substring(0, 20) + '...',
          timestamp: new Date().toISOString()
        });

        const response = await fetch("/api/track-visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: sessionId,
            path: currentPath,
            referrer: document.referrer || null,
            userAgent: navigator.userAgent,
            ...visitorInfo, // Spread all collected info
          }),
        });
        const data = await response.json();
        if (data.ok) {
          console.log('✅ Visitor tracked successfully:', { 
            page: currentPath,
            response: data 
          });
        } else {
          console.warn('⚠️ Visitor tracking response:', { page: currentPath, response: data });
        }
      } catch (err) {
        console.error("❌ Visitor tracking failed:", { 
          page: window.location.pathname, 
          error: err 
        });
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
        // Collect basic info for sendBeacon (async not supported)
      const basicInfo: any = {
        id: sessionId,
        path: window.location.pathname,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
      };
      
      // Add synchronous info only
      if ('connection' in navigator) {
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        if (connection) {
          basicInfo.networkType = connection.type || 'unknown';
          basicInfo.networkEffectiveType = connection.effectiveType || 'unknown';
          basicInfo.networkDownlink = connection.downlink || 0;
          basicInfo.networkRtt = connection.rtt || 0;
        }
      }
      
      basicInfo.screenWidth = window.screen.width;
      basicInfo.screenHeight = window.screen.height;
      basicInfo.viewportWidth = window.innerWidth;
      basicInfo.viewportHeight = window.innerHeight;
      basicInfo.language = navigator.language;
      basicInfo.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Use sendBeacon for reliable tracking on page unload
        const payload = JSON.stringify(basicInfo);
        navigator.sendBeacon('/api/track-visitor', payload);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return null;
}
