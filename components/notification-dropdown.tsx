"use client"

import React, { useState } from "react"
import { Bell, X, Calendar, AlertTriangle, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useSubscriptions } from "@/contexts/subscription-context"
import { getDaysUntilPayment, isUrgent } from "@/lib/subscriptions"

export function NotificationDropdown() {
  const { subscriptions } = useSubscriptions()
  const [open, setOpen] = useState(false)

  // Get upcoming payments (within 7 days)
  const upcomingPayments = subscriptions
    .filter(sub => {
      const days = getDaysUntilPayment(sub.nextPayment)
      return days >= 0 && days <= 7
    })
    .sort((a, b) => getDaysUntilPayment(a.nextPayment) - getDaysUntilPayment(b.nextPayment))

  const urgentPayments = upcomingPayments.filter(sub => isUrgent(sub.nextPayment))

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
        aria-label="View notifications"
      >
        <Bell className="h-4 w-4" />
        {(upcomingPayments.length > 0) && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        )}
      </Button>
      
      <DropdownMenuContent 
        align="end" 
        className="w-80 border-glass-border bg-card"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="text-foreground">Notifications</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-border" />
        
        {upcomingPayments.length === 0 ? (
          <div className="p-4 text-center">
            <Bell className="mx-auto h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">
              No upcoming payments
            </p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {urgentPayments.length > 0 && (
              <>
                <div className="px-2 py-1.5">
                  <h4 className="text-xs font-semibold text-urgent uppercase tracking-wider">
                    Urgent ({urgentPayments.length})
                  </h4>
                </div>
                {urgentPayments.map(sub => {
                  const days = getDaysUntilPayment(sub.nextPayment)
                  return (
                    <DropdownMenuItem 
                      key={sub.id}
                      className="flex items-start gap-3 p-3 rounded-lg mx-1 mb-1 bg-urgent/5 border border-urgent/20 hover:bg-urgent/10"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-urgent/15">
                        <AlertTriangle className="h-4 w-4 text-urgent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {sub.name}
                        </p>
                        <p className="text-xs text-urgent mt-1">
                          {days <= 0 ? "Due today" : days === 1 ? "Due tomorrow" : `Due in ${days} days`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          ${sub.price.toFixed(2)} / {sub.cycle === "monthly" ? "mo" : "yr"}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  )
                })}
              </>
            )}
            
            {upcomingPayments.filter(sub => !isUrgent(sub.nextPayment)).length > 0 && (
              <>
                {urgentPayments.length > 0 && <DropdownMenuSeparator className="bg-border my-2" />}
                <div className="px-2 py-1.5">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Upcoming ({upcomingPayments.filter(sub => !isUrgent(sub.nextPayment)).length})
                  </h4>
                </div>
                {upcomingPayments
                  .filter(sub => !isUrgent(sub.nextPayment))
                  .map(sub => {
                    const days = getDaysUntilPayment(sub.nextPayment)
                    return (
                      <DropdownMenuItem 
                        key={sub.id}
                        className="flex items-start gap-3 p-3 rounded-lg mx-1 mb-1 hover:bg-accent"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {sub.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {days <= 0 ? "Due today" : days === 1 ? "Due tomorrow" : `Due in ${days} days`}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            ${sub.price.toFixed(2)} / {sub.cycle === "monthly" ? "mo" : "yr"}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    )
                  })
                }
              </>
            )}
          </div>
        )}
        
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem 
          className="text-center text-xs text-muted-foreground py-2 cursor-default"
          inset
        >
          {upcomingPayments.length > 0 
            ? `You have ${upcomingPayments.length} upcoming payment${upcomingPayments.length > 1 ? 's' : ''}`
            : "All caught up!"
          }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}