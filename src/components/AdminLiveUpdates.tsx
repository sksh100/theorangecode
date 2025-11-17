"use client";

import { useEffect, useRef } from "react";

type VisitorsResponse = {
  success?: boolean;
  data?: {
    stats?: {
      total?: number;
      totalVisitors?: number;
      unique?: number;
      uniqueVisitors?: number;
      activeNow?: number;
      today?: number;
      todayVisitors?: number;
      thisMonth?: number;
      monthlyVisitors?: number;
      currentVisitors?: number;
      last24HoursVisitors?: number;
      lastWeekVisitors?: number;
      lastMonthVisitors?: number;
    };
    countries?: Array<{ country: string; count: number }>;
    countriesRecord?: Record<string, number>;
    pages?: any[];
    dailyStats?: any[];
    active?: any[];
    activeSessions?: any[];
    recent?: any[];
    visitors?: any[];
    [key: string]: any;
  };
  stats?: {
    total?: number;
    unique?: number;
    activeNow?: number;
    today?: number;
    thisMonth?: number;
  };
  countries?: Record<string, number>;
  active?: any[];
  recent?: any[];
  [key: string]: any;
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

  const dingSound = useRef<HTMLAudioElement | null>(null);
  const cashSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load sounds
    dingSound.current = new Audio("/Ding.mp3");
    cashSound.current = new Audio("/Cash.mp3");

    // Ask for push notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
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

        // send data to UI
        onVisitorsUpdate?.(visitors);
        onPaymentsUpdate?.(payments);
        onSubscribersUpdate?.(subscribers);

        // extract stats - handle both response formats
        const visitorTotal = visitors.data?.stats?.totalVisitors ?? visitors.data?.stats?.total ?? visitors.stats?.total ?? 0;
        const activeNow = visitors.data?.stats?.activeNow ?? visitors.stats?.activeNow ?? 0;
        const paymentCount = payments.stats?.count ?? 0;
        const subscriberCount = subscribers.data?.stats?.totalSubscribers ?? subscribers.data?.stats?.count ?? subscribers.stats?.count ?? 0;

        const newVisitor = visitorTotal > prevVisitorTotal.current;
        const newActiveUser = activeNow > prevActiveNow.current;
        const newPayment = paymentCount > prevPaymentCount.current;
        const newSubscriber = subscriberCount > prevSubscriberCount.current;

        // --- Play Sounds ---
        if (newPayment) {
          cashSound.current?.play().catch(() => {});
        } else if (newVisitor || newActiveUser || newSubscriber) {
          dingSound.current?.play().catch(() => {});
        }

        // --- Browser Notification ---
        if ("Notification" in window && Notification.permission === "granted") {
          if (newPayment) {
            new Notification("💸 New Payment Received!", {
              body: `Payments total: ${paymentCount}`,
            });
          } else if (newSubscriber) {
            new Notification("🧡 New Subscriber!", {
              body: `Total subscribers: ${subscriberCount}`,
            });
          } else if (newVisitor) {
            new Notification("👀 New Visitor!", {
              body: `Visitors: ${visitorTotal}`,
            });
          } else if (newActiveUser) {
            new Notification("🔥 New Active User!", {
              body: `Active now: ${activeNow}`,
            });
          }
        }

        // update previous counts
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
      if (timer) clearTimeout(timer);
    };
  }, [pollMs, onVisitorsUpdate, onPaymentsUpdate, onSubscribersUpdate]);

  return null;
}
