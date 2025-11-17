"use client";

import { useEffect, useRef } from "react";

type Props = {
  pollMs?: number;
  onVisitorsUpdate?: (data: any) => void;
  onPaymentsUpdate?: (data: any) => void;
};

export function AdminLiveUpdates({
  pollMs = 5000,
  onVisitorsUpdate,
  onPaymentsUpdate,
}: Props) {
  const lastVisitorCount = useRef(0);
  const lastPaymentCount = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/ding.mp3");
    if (typeof Notification !== "undefined") {
      if (Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
      }
    }
  }, []);

  useEffect(() => {
    const tick = async () => {
      try {
        const [visRes, payRes] = await Promise.all([
          fetch("/api/admin/visitors"),
          fetch("/api/admin/payments"),
        ]);

        const visitors = await visRes.json();
        const payments = await payRes.json();

        onVisitorsUpdate?.(visitors);
        onPaymentsUpdate?.(payments);

        const newVisitorCount = visitors.data?.stats?.total ?? visitors.stats?.total ?? 0;
        const newPaymentCount = payments.stats?.count ?? 0;

        const hasNewVisitor = newVisitorCount > lastVisitorCount.current;
        const hasNewPayment = newPaymentCount > lastPaymentCount.current;

        if ((hasNewVisitor || hasNewPayment) && audioRef.current) {
          audioRef.current.play().catch(() => {});
          if (
            typeof Notification !== "undefined" &&
            Notification.permission === "granted"
          ) {
            new Notification(
              hasNewPayment ? "New payment" : "New visitor",
              {
                body: hasNewPayment
                  ? `Total payments: ${newPaymentCount}`
                  : `Total visitors: ${newVisitorCount}`,
              }
            );
          }
        }

        lastVisitorCount.current = newVisitorCount;
        lastPaymentCount.current = newPaymentCount;
      } catch (err) {
        console.error("Live updates error", err);
      }
    };

    tick();
    const id = setInterval(tick, pollMs);
    return () => clearInterval(id);
  }, [pollMs, onVisitorsUpdate, onPaymentsUpdate]);

  return null;
}

