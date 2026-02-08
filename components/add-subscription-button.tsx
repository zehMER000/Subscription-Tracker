"use client"

import React, { useState } from "react"
import { Plus, X } from "lucide-react"
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
import { useSubscriptions } from "@/contexts/subscription-context"

export function AddSubscriptionButton() {
  const [open, setOpen] = useState(false)
  const { addSubscription } = useSubscriptions()
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    cycle: "monthly",
    category: "entertainment",
    nextPayment: "",
  })

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105 hover:shadow-primary/40 active:scale-95 md:bottom-8 md:right-8"
        aria-label="Add new subscription"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-glass-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Add Subscription</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Track a new recurring subscription.
            </DialogDescription>
          </DialogHeader>

          <form
            className="flex flex-col gap-4 pt-2"
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault()
              
              // Validate form
              if (!formData.name || !formData.price || !formData.nextPayment) {
                return
              }
              
              // Add subscription
              addSubscription({
                name: formData.name,
                price: parseFloat(formData.price),
                cycle: formData.cycle as "monthly" | "yearly",
                category: formData.category.charAt(0).toUpperCase() + formData.category.slice(1),
                nextPayment: formData.nextPayment,
                logo: `https://cdn.simpleicons.org/${formData.name.toLowerCase()}/fff`,
                color: "#ffffff",
              })
              
              // Reset form and close dialog
              setFormData({
                name: "",
                price: "",
                cycle: "monthly",
                category: "entertainment",
                nextPayment: "",
              })
              setOpen(false)
            }}
          >
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="sub-name" className="text-xs text-muted-foreground">
                Service Name
              </Label>
              <Input
                id="sub-name"
                placeholder="e.g. Netflix"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                className="border-glass-border bg-glass text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="sub-price" className="text-xs text-muted-foreground">
                  Price
                </Label>
                <Input
                  id="sub-price"
                  type="number"
                  step="0.01"
                  placeholder="9.99"
                  value={formData.price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, price: e.target.value})}
                  className="border-glass-border bg-glass text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs text-muted-foreground">Cycle</Label>
                <Select value={formData.cycle} onValueChange={(value) => setFormData({...formData, cycle: value})}>
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
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
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
              <Label htmlFor="sub-date" className="text-xs text-muted-foreground">
                Next Payment Date
              </Label>
              <Input
                id="sub-date"
                type="date"
                value={formData.nextPayment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, nextPayment: e.target.value})}
                className="border-glass-border bg-glass text-foreground focus-visible:ring-primary"
                required
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="flex-1 text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Add Subscription
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
