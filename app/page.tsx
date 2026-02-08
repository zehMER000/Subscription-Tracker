import { DashboardHeader } from "@/components/dashboard-header"
import { BentoStats } from "@/components/bento-stats"
import { SubscriptionFeed } from "@/components/subscription-feed"
import { SpendingChart } from "@/components/spending-chart"
import { AddSubscriptionButton } from "@/components/add-subscription-button"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-5xl px-4 pb-24 md:px-6">
        <DashboardHeader />

        <div className="flex flex-col gap-6">
          {/* Bento Stats Grid */}
          <BentoStats />

          {/* Main content: feed + sidebar */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SubscriptionFeed />
            </div>
            <div className="flex flex-col gap-4">
              <SpendingChart />

              {/* Quick tip card */}
              <div className="rounded-2xl border border-glass-border bg-glass p-5">
                <h3 className="text-sm font-semibold text-foreground">
                  Quick Insight
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Your Developer tools account for the largest share of
                  spending. Consider bundling services or reviewing unused
                  seats to optimize costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AddSubscriptionButton />
    </div>
  )
}
