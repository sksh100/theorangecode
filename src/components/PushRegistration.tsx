"use client";

import { useEffect, useState } from "react";

const PUBLIC_VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

export function PushRegistration() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("Notification" in window)) return;

    const register = async () => {
      try {
        // Force service worker update by unregistering first if needed
        const existing = await navigator.serviceWorker.getRegistration("/sw.js");
        if (existing) {
          // Check if update is available
          await existing.update();
          // Force activation if there's a waiting worker
          if (existing.waiting) {
            existing.waiting.postMessage({ type: 'SKIP_WAITING' });
            // Reload after update
            window.location.reload();
            return;
          }
        }

        const reg = await navigator.serviceWorker.register("/sw.js", {
          updateViaCache: 'none' // Always check for updates
        });
        console.log("[SW] registered", reg);
        
        // Check for updates periodically
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available, reload to activate
                window.location.reload();
              }
            });
          }
        });

        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.log("[Push] notifications not granted");
          setReady(false);
          return;
        }

        if (!PUBLIC_VAPID_KEY) {
          console.warn("Missing NEXT_PUBLIC_VAPID_PUBLIC_KEY");
          return;
        }

        const pushSubscription = await reg.pushManager.getSubscription();
        if (!pushSubscription) {
          const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
          });

          await fetch("/api/push/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sub)
          });

          console.log("[Push] subscription created");
        }

        setReady(true);
      } catch (err) {
        console.error("[PushRegistration] error", err);
      }
    };

    register();
  }, []);

  return null;
}

// helper for VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

