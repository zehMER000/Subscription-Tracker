"use client"

import { useSubscriptions } from "@/contexts/subscription-context"

export function SpendingChart() {
  const { subscriptions } = useSubscriptions()
  
  const categories = subscriptions.reduce<Record<string, number>>((acc: Record<string, number>, sub: any) => {
    const cost = sub.cycle === "yearly" ? sub.price / 12 : sub.price
    acc[sub.category] = (acc[sub.category] || 0) + cost
    return acc
  }, {})

  const total = Object.values(categories).reduce((a, b) => (a as number) + (b as number), 0)
  const sorted = Object.entries(categories).sort(([, a], [, b]) => (b as number) - (a as number))

  const barColors = [
    "bg-primary",
    "bg-chart-2",
    "bg-chart-3",
    "bg-chart-4",
    "bg-chart-5",
    "bg-muted-foreground",
  ]

  return (
    <section
      aria-label="Spending breakdown"
      className="rounded-2xl border border-glass-border bg-glass p-5"
    >
      <h2 className="text-sm font-semibold text-foreground">
        Spending by Category
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">Monthly breakdown</p>

      <div className="mt-5 flex flex-col gap-3">
        {sorted.map(([category, amount], i) => {
          const pct = ((amount as number) / (total as number)) * 100
          return (
            <div key={category} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{category}</span>
                <span className="font-medium text-foreground">
                  ${(amount as number).toFixed(2)}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full ${barColors[i % barColors.length]} transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
