"use client"

import React from "react"

import {
  DollarSign,
  TrendingUp,
  CalendarClock,
  AlertTriangle,
} from "lucide-react"
import { useSubscriptions } from "@/contexts/subscription-context"
import {
  getMonthlyTotal,
  getYearlyTotal,
  getUpcomingCount,
  getUrgentCount,
  getDaysUntilPayment,
  isUrgent as isUrgentFunc,
} from "@/lib/subscriptions"

interface StatCardProps {
  label: string
  value: string
  subtext: string
  icon: React.ReactNode
  urgent?: boolean
  large?: boolean
}

function StatCard({ label, value, subtext, icon, urgent, large }: StatCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-colors ${
        urgent
          ? "border-urgent/30 bg-urgent/[0.06]"
          : "border-glass-border bg-glass"
      } ${large ? "col-span-2 row-span-1" : ""} p-5`}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className={`text-xs font-medium uppercase tracking-wider ${urgent ? "text-urgent" : "text-muted-foreground"}`}>
            {label}
          </span>
          <span className={`text-3xl font-semibold tracking-tight ${urgent ? "text-urgent" : "text-foreground"}`}>
            {value}
          </span>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            urgent
              ? "bg-urgent/15 text-urgent"
              : "bg-primary/10 text-primary"
          }`}
        >
          {icon}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{subtext}</p>
    </div>
  )
}

export function BentoStats() {
  const { subscriptions } = useSubscriptions()
  
  const monthly = getMonthlyTotal(subscriptions)
  const yearly = getYearlyTotal(subscriptions)
  const upcoming = getUpcomingCount(subscriptions, getDaysUntilPayment)
  const urgentCount = getUrgentCount(subscriptions, isUrgentFunc)

  return (
    <section aria-label="Subscription statistics">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          large
          label="Monthly Spend"
          value={`$${monthly.toFixed(2)}`}
          subtext={`${subscriptions.length} active subscriptions`}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard
          label="Yearly Estimate"
          value={`$${yearly.toFixed(0)}`}
          subtext="Projected annual cost"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard
          label="Due This Week"
          value={`${upcoming}`}
          subtext="Payments within 7 days"
          icon={<CalendarClock className="h-5 w-5" />}
        />
        {urgentCount > 0 && (
          <StatCard
            urgent
            label="Due Soon"
            value={`${urgentCount}`}
            subtext="Within the next 48 hours"
            icon={<AlertTriangle className="h-5 w-5" />}
          />
        )}
      </div>
    </section>
  )
}
