"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLiveUpdates } from "@/components/AdminLiveUpdates";
import { PushRegistration } from "@/components/PushRegistration";

type VisitorsStats = {
  total?: number;
  unique?: number;
  activeNow?: number;
  today?: number;
  thisMonth?: number;
};

type PaymentsStats = {
  totalRevenue?: number;
  count?: number;
};

type SubscribersStats = {
  count?: number;
};

export default function MobileAdminPage() {
  const [visitors, setVisitors] = useState<VisitorsStats | null>(null);
  const [payments, setPayments] = useState<PaymentsStats | null>(null);
  const [subscribers, setSubscribers] = useState<SubscribersStats | null>(null);
  const router = useRouter();

  function openTab(tab: "visitors" | "payments" | "subscribers") {
    router.push(`/admin?tab=${tab}`);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-5 flex flex-col gap-4">
      <PushRegistration />
      <AdminLiveUpdates
        pollMs={5000}
        onVisitorsUpdate={data => {
          const stats = data.data?.stats ?? data.stats;
          if (stats) {
            setVisitors({
              total: (stats as any).totalVisitors ?? stats.total ?? 0,
              unique: (stats as any).uniqueVisitors ?? stats.unique ?? 0,
              activeNow: stats.activeNow ?? 0,
              today: (stats as any).todayVisitors ?? stats.today ?? 0,
              thisMonth: (stats as any).monthlyVisitors ?? stats.thisMonth ?? 0,
            });
          }
        }}
        onPaymentsUpdate={data => {
          if (data.stats) {
            setPayments(data.stats);
          }
        }}
        onSubscribersUpdate={data => {
          const stats = data.data?.stats ?? data.stats;
          if (stats) {
            setSubscribers({
              count: (stats as any).totalSubscribers ?? stats.count ?? 0,
            });
          }
        }}
      />

      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">TOC Live Dashboard</h1>
          <p className="text-xs text-slate-400">Real time overview for The Orange Code</p>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <StatCard
          label="Active now"
          value={visitors?.activeNow ?? 0}
          highlight
          onClick={() => openTab("visitors")}
        />
        <StatCard
          label="Today visitors"
          value={visitors?.today ?? 0}
          onClick={() => openTab("visitors")}
        />
        <StatCard
          label="Subscribers"
          value={subscribers?.count ?? 0}
          onClick={() => openTab("subscribers")}
        />
        <StatCard
          label="Payments"
          value={payments?.count ?? 0}
          onClick={() => openTab("payments")}
        />
      </section>

      <section className="grid grid-cols-1 gap-3">
        <StatCard
          label="Total visitors"
          value={visitors?.total ?? 0}
          onClick={() => openTab("visitors")}
        />
        <StatCard
          label="Unique visitors"
          value={visitors?.unique ?? 0}
          onClick={() => openTab("visitors")}
        />
        <StatCard
          label="Total revenue"
          value={payments ? (payments.totalRevenue ?? 0).toFixed(2) : "0.00"}
          prefix="AED "
          onClick={() => openTab("payments")}
        />
      </section>

      <p className="mt-auto text-[10px] text-slate-500 text-center">
        Tip: add this page to your home screen to use it like an app.
      </p>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: string | number;
  prefix?: string;
  highlight?: boolean;
  onClick?: () => void;
};

function StatCard({ label, value, prefix, highlight, onClick }: StatCardProps) {
  const clickable = Boolean(onClick);

  const baseClasses =
    "rounded-2xl px-3 py-3 flex flex-col justify-center border transition transform";

  const variantClasses = highlight
    ? "bg-emerald-500/20 border-emerald-500/40"
    : "bg-slate-800/60 border-slate-700/60";

  const interactiveClasses = clickable
    ? "cursor-pointer active:scale-[0.97] hover:border-sky-400/60"
    : "";

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${interactiveClasses}`}
      onClick={onClick}
    >
      <span className="text-[11px] uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="mt-1 text-xl font-semibold">
        {prefix ?? ""}
        {value}
      </span>
    </div>
  );
}

