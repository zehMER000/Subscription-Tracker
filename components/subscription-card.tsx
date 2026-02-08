"use client"

import React, { useState } from "react"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  type Subscription,
  getDaysUntilPayment,
  isUrgent,
} from "@/lib/subscriptions"
import { useSubscriptions } from "@/contexts/subscription-context"

interface SubscriptionCardProps {
  subscription: Subscription
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const daysLeft = getDaysUntilPayment(subscription.nextPayment)
  const urgent = isUrgent(subscription.nextPayment)
  const { updateSubscription, deleteSubscription } = useSubscriptions()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editData, setEditData] = useState({
    name: subscription.name,
    price: subscription.price.toString(),
    cycle: subscription.cycle,
    category: subscription.category,
    nextPayment: subscription.nextPayment,
  })

  const dueLabel =
    daysLeft <= 0 ? "Due today" : daysLeft === 1 ? "Due tomorrow" : `Due in ${daysLeft} days`

  return (
    <div
      className={`group relative flex items-center gap-4 rounded-2xl border p-4 transition-all hover:translate-y-[-1px] ${
        urgent
          ? "border-urgent/25 bg-urgent/[0.04] hover:border-urgent/40 hover:bg-urgent/[0.07]"
          : "border-glass-border bg-glass hover:border-glass-border/80 hover:bg-accent"
      }`}
    >
      {/* Brand Logo */}
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${subscription.color}12` }}
      >
        <img
          src={subscription.logo || "/placeholder.svg"}
          alt={`${subscription.name} logo`}
          className="h-6 w-6"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-foreground">
            {subscription.name}
          </span>
          <span className="shrink-0 rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            {subscription.category}
          </span>
        </div>
        <span
          className={`text-xs ${
            urgent ? "font-medium text-urgent" : "text-muted-foreground"
          }`}
        >
          {urgent && (
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-urgent animate-pulse" />
          )}
          {dueLabel}
        </span>
      </div>

      {/* Price + Actions */}
      <div className="flex items-center gap-2">
        <div className="text-right">
          <span className="text-sm font-semibold text-foreground">
            ${subscription.price.toFixed(2)}
          </span>
          <p className="text-[10px] text-muted-foreground">
            /{subscription.cycle === "monthly" ? "mo" : "yr"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground hover:bg-accent"
            aria-label={`Edit ${subscription.name}`}
            onClick={() => setIsEditOpen(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground hover:bg-accent"
            aria-label={`Delete ${subscription.name}`}
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="border-glass-border bg-card sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Edit Subscription</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Update your subscription details.
              </DialogDescription>
            </DialogHeader>

            <form
              className="flex flex-col gap-4 pt-2"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault()
                
                updateSubscription(subscription.id, {
                  name: editData.name,
                  price: parseFloat(editData.price),
                  cycle: editData.cycle,
                  category: editData.category,
                  nextPayment: editData.nextPayment,
                })
                
                setIsEditOpen(false)
              }}
            >
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-name" className="text-xs text-muted-foreground">
                  Service Name
                </Label>
                <Input
                  id="edit-name"
                  value={editData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditData({...editData, name: e.target.value})}
                  className="border-glass-border bg-glass text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="edit-price" className="text-xs text-muted-foreground">
                    Price
                  </Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={editData.price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditData({...editData, price: e.target.value})}
                    className="border-glass-border bg-glass text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-muted-foreground">Cycle</Label>
                  <Select value={editData.cycle} onValueChange={(value) => setEditData({...editData, cycle: value as "monthly" | "yearly"})}>
                    <SelectTrigger className="border-glass-border bg-glass text-foreground focus:ring-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-glass-border bg-card text-foreground">
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-muted-foreground">Category</Label>
                <Select value={editData.category.toLowerCase()} onValueChange={(value) => setEditData({...editData, category: value.charAt(0).toUpperCase() + value.slice(1)})}>
                  <SelectTrigger className="border-glass-border bg-glass text-foreground focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-glass-border bg-card text-foreground">
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="ai">AI</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-date" className="text-xs text-muted-foreground">
                  Next Payment Date
                </Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editData.nextPayment}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditData({...editData, nextPayment: e.target.value})}
                  className="border-glass-border bg-glass text-foreground focus-visible:ring-primary"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEditOpen(false)}
                  className="flex-1 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="border-glass-border bg-card sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Delete Subscription</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Are you sure you want to delete {subscription.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  deleteSubscription(subscription.id)
                  setIsDeleteOpen(false)
                }}
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
