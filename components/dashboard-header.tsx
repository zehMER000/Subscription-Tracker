"use client"

import React, { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSubscriptions } from "@/contexts/subscription-context"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { ProfileDropdown } from "@/components/profile-dropdown"

export function DashboardHeader() {
  const { searchQuery, setSearchQuery } = useSubscriptions()
  const [isSearching, setIsSearching] = useState(false)
  
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-primary-foreground">S</span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          SubTrack
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {isSearching ? (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search subscriptions..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="h-9 w-64 border-glass-border bg-glass pl-8 pr-8 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setSearchQuery("")
                  setIsSearching(false)
                }}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
            onClick={() => setIsSearching(true)}
            aria-label="Search subscriptions"
          >
            <Search className="h-4 w-4" />
          </Button>
        )}
        <NotificationDropdown />
        <ProfileDropdown />
      </div>
    </header>
  )
}
