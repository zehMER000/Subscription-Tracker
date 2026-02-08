"use client"

import { useState } from "react"
import { SubscriptionCard } from "@/components/subscription-card"
import { useSubscriptions } from "@/contexts/subscription-context"
import { getDaysUntilPayment } from "@/lib/subscriptions"

const FILTER_OPTIONS = ["All", "Urgent", "Entertainment", "Developer", "Design", "Productivity"] as const
type FilterOption = (typeof FILTER_OPTIONS)[number]

export function SubscriptionFeed() {
  const { filteredSubscriptions } = useSubscriptions()
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All")

  const sorted = [...filteredSubscriptions].sort(
    (a, b) =>
      getDaysUntilPayment(a.nextPayment) - getDaysUntilPayment(b.nextPayment)
  )

  const filtered = sorted.filter((sub) => {
    if (activeFilter === "All") return true
    if (activeFilter === "Urgent") {
      const days = getDaysUntilPayment(sub.nextPayment)
      return days <= 2
    }
    return sub.category === activeFilter
  })

  return (
    <section aria-label="Subscription feed" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Subscriptions</h2>
        <span className="text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "service" : "services"}
        </span>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter subscriptions">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            role="tab"
            aria-selected={activeFilter === option}
            onClick={() => setActiveFilter(option)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === option
                ? option === "Urgent"
                  ? "bg-urgent/15 text-urgent"
                  : "bg-primary/15 text-primary"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2">
        {filtered.map((sub) => (
          <SubscriptionCard key={sub.id} subscription={sub} />
        ))}
        {filtered.length === 0 && (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-glass-border py-12">
            <p className="text-sm text-muted-foreground">
              No subscriptions match this filter.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
