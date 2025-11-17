"use client";

import { useEffect, useRef } from "react";

type VisitorsResponse = {
  success?: boolean;
  data?: {
    visitors?: any[];
    activeSessions?: any[];
    stats?: {
      total?: number;
      totalVisitors?: number;
      unique?: number;
      uniqueVisitors?: number;
      activeNow?: number;
      currentVisitors?: number;
      today?: number;
      todayVisitors?: number;
      thisMonth?: number;
      monthlyVisitors?: number;
      last24HoursVisitors?: number;
      lastWeekVisitors?: number;
      lastMonthVisitors?: number;
      [key: string]: any;
    };
    countries?: Array<{ country: string; count: number }>;
    countriesRecord?: Record<string, number>;
    pages?: any[];
    dailyStats?: any[];
    [key: string]: any;
  };
  stats?: {
    total?: number;
    unique?: number;
    activeNow?: number;
    today?: number;
    thisMonth?: number;
  };
};

type PaymentsResponse = {
  success?: boolean;
  stats?: {
    totalRevenue?: number;
    count?: number;
  };
  payments?: any[];
};

type SubscribersResponse = {
  success?: boolean;
  data?: {
    stats?: {
      count?: number;
      totalSubscribers?: number;
    };
    subscribers?: any[];
  };
  stats?: {
    count?: number;
  };
  subscribers?: any[];
};

type Props = {
  pollMs?: number;
  onVisitorsUpdate?: (data: VisitorsResponse) => void;
  onPaymentsUpdate?: (data: PaymentsResponse) => void;
  onSubscribersUpdate?: (data: SubscribersResponse) => void;
};

export function AdminLiveUpdates({
  pollMs = 5000,
  onVisitorsUpdate,
  onPaymentsUpdate,
  onSubscribersUpdate,
}: Props) {
  const prevVisitorTotal = useRef(0);
  const prevActiveNow = useRef(0);
  const prevPaymentCount = useRef(0);
  const prevSubscriberCount = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Prepare sound
    audioRef.current = new Audio("/ding.mp3");
    
    // Ask for notification permission
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
      }
    }
  }, []);

  useEffect(() => {
    let timer: number | undefined;

    const tick = async () => {
      try {
        const [visRes, payRes, subRes] = await Promise.all([
          fetch("/api/admin/visitors", { cache: "no-store" }),
          fetch("/api/admin/payments", { cache: "no-store" }),
          fetch("/api/admin/subscribers", { cache: "no-store" }),
        ]);

        const visitors: VisitorsResponse = await visRes.json();
        const payments: PaymentsResponse = await payRes.json();
        const subscribers: SubscribersResponse = await subRes.json();

        onVisitorsUpdate?.(visitors);
        onPaymentsUpdate?.(payments);
        onSubscribersUpdate?.(subscribers);

        // Extract stats from different response formats
        const visitorTotal = visitors.data?.stats?.total ?? visitors.data?.stats?.totalVisitors ?? visitors.stats?.total ?? 0;
        const activeNow = visitors.data?.stats?.activeNow ?? visitors.stats?.activeNow ?? 0;
        const paymentCount = payments.stats?.count ?? 0;
        const subscriberCount = subscribers.data?.stats?.totalSubscribers ?? subscribers.data?.stats?.count ?? subscribers.stats?.count ?? 0;

        const newVisitor = visitorTotal > prevVisitorTotal.current;
        const moreActiveUsers = activeNow > prevActiveNow.current;
        const newPayment = paymentCount > prevPaymentCount.current;
        const newSubscriber = subscriberCount > prevSubscriberCount.current;

        if (newVisitor || moreActiveUsers || newPayment || newSubscriber) {
          // Play sound
          if (audioRef.current) {
            audioRef.current.play().catch(() => {});
          }

          // Browser notification
          if (
            typeof window !== "undefined" &&
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            let title = "Orange Code dashboard";
            let body = "";

            if (newPayment) {
              title = "New payment";
              body = `Total payments: ${paymentCount}`;
            } else if (newSubscriber) {
              title = "New subscriber";
              body = `Total subscribers: ${subscriberCount}`;
            } else if (newVisitor) {
              title = "New visitor";
              body = `Total visitors: ${visitorTotal}`;
            } else if (moreActiveUsers) {
              title = "More active users";
              body = `Active now: ${activeNow}`;
            }

            // Fire notification
            new Notification(title, { body });
          }
        }

        prevVisitorTotal.current = visitorTotal;
        prevActiveNow.current = activeNow;
        prevPaymentCount.current = paymentCount;
        prevSubscriberCount.current = subscriberCount;
      } catch (err) {
        console.error("[AdminLiveUpdates] error", err);
      } finally {
        timer = window.setTimeout(tick, pollMs);
      }
    };

    tick();

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [pollMs, onVisitorsUpdate, onPaymentsUpdate, onSubscribersUpdate]);

  return null;
}

