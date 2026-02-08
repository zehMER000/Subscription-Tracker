"use client"

import React, { createContext, useContext, useReducer, useEffect, useState } from "react"
import { Subscription } from "@/lib/subscriptions"

// Create a function to generate fresh initial subscriptions with today's relative dates
function getFreshInitialSubscriptions(): Subscription[] {
  // Use a consistent date - we'll calculate it only on the client side to avoid SSR mismatches
  const today = new Date()
  const addDays = (d: Date, days: number) => {
    const result = new Date(d)
    result.setDate(result.getDate() + days)
    return result.toISOString().split("T")[0]
  }

  return [
    {
      id: "1",
      name: "Netflix",
      category: "Entertainment",
      price: 15.99,
      cycle: "monthly",
      nextPayment: addDays(today, 1),
      logo: "https://cdn.simpleicons.org/netflix/E50914",
      color: "#E50914",
    },
    {
      id: "2",
      name: "Spotify",
      category: "Music",
      price: 9.99,
      cycle: "monthly",
      nextPayment: addDays(today, 2),
      logo: "https://cdn.simpleicons.org/spotify/1DB954",
      color: "#1DB954",
    },
    {
      id: "3",
      name: "Figma",
      category: "Design",
      price: 12.0,
      cycle: "monthly",
      nextPayment: addDays(today, 5),
      logo: "https://cdn.simpleicons.org/figma/F24E1E",
      color: "#F24E1E",
    },
    {
      id: "4",
      name: "GitHub",
      category: "Developer",
      price: 4.0,
      cycle: "monthly",
      nextPayment: addDays(today, 8), // This is beyond 7-day window
      logo: "https://cdn.simpleicons.org/github/fff",
      color: "#ffffff",
    },
    {
      id: "5",
      name: "Notion",
      category: "Productivity",
      price: 8.0,
      cycle: "monthly",
      nextPayment: addDays(today, 12), // This is beyond 7-day window
      logo: "https://cdn.simpleicons.org/notion/fff",
      color: "#ffffff",
    },
    {
      id: "6",
      name: "Linear",
      category: "Developer",
      price: 10.0,
      cycle: "monthly",
      nextPayment: addDays(today, 15), // This is beyond 7-day window
      logo: "https://cdn.simpleicons.org/linear/5E6AD2",
      color: "#5E6AD2",
    },
    {
      id: "7",
      name: "Adobe CC",
      category: "Design",
      price: 54.99,
      cycle: "monthly",
      nextPayment: addDays(today, 0), // Due today
      logo: "https://cdn.simpleicons.org/adobe/FF0000",
      color: "#FF0000",
    },
    {
      id: "8",
      name: "Vercel",
      category: "Developer",
      price: 20.0,
      cycle: "monthly",
      nextPayment: addDays(today, 22), // This is beyond 7-day window
      logo: "https://cdn.simpleicons.org/vercel/fff",
      color: "#ffffff",
    },
    {
      id: "9",
      name: "OpenAI",
      category: "AI",
      price: 20.0,
      cycle: "monthly",
      nextPayment: addDays(today, 18), // This is beyond 7-day window
      logo: "https://cdn.simpleicons.org/openai/fff",
      color: "#ffffff",
    },
    {
      id: "10",
      name: "Slack",
      category: "Communication",
      price: 7.25,
      cycle: "monthly",
      nextPayment: addDays(today, 25), // This is beyond 7-day window
      logo: "https://cdn.simpleicons.org/slack/4A154B",
      color: "#4A154B",
    },
  ]
}

type SubscriptionAction =
  | { type: "ADD_SUBSCRIPTION"; payload: Subscription }
  | { type: "UPDATE_SUBSCRIPTION"; payload: Subscription }
  | { type: "DELETE_SUBSCRIPTION"; payload: string }
  | { type: "SET_SUBSCRIPTIONS"; payload: Subscription[] }
  | { type: "SET_SEARCH_QUERY"; payload: string }

interface SubscriptionState {
  subscriptions: Subscription[]
  searchQuery: string
}

interface SubscriptionContextType extends SubscriptionState {
  addSubscription: (subscription: Omit<Subscription, "id">) => void
  updateSubscription: (id: string, updates: Partial<Subscription>) => void
  deleteSubscription: (id: string) => void
  setSearchQuery: (query: string) => void
  filteredSubscriptions: Subscription[]
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

const subscriptionReducer = (state: SubscriptionState, action: SubscriptionAction): SubscriptionState => {
  switch (action.type) {
    case "ADD_SUBSCRIPTION":
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
      }
    case "UPDATE_SUBSCRIPTION":
      return {
        ...state,
        subscriptions: state.subscriptions.map((sub) =>
          sub.id === action.payload.id ? action.payload : sub
        ),
      }
    case "DELETE_SUBSCRIPTION":
      return {
        ...state,
        subscriptions: state.subscriptions.filter((sub) => sub.id !== action.payload),
      }
    case "SET_SUBSCRIPTIONS":
      return {
        ...state,
        subscriptions: action.payload,
      }
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      }
    default:
      return state
  }
}

const STORAGE_KEY = "subtrack_subscriptions"

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(subscriptionReducer, {
    subscriptions: [],
    searchQuery: "",
  })

  // Load from localStorage on mount, fallback to initial data if empty
  useEffect(() => {
    // Only run on client side to avoid SSR mismatches
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          dispatch({ type: "SET_SUBSCRIPTIONS", payload: parsed })
        } catch (e) {
          console.error("Failed to parse saved subscriptions", e)
        }
      } else {
        // Load fresh initial data if no saved subscriptions exist
        dispatch({ type: "SET_SUBSCRIPTIONS", payload: getFreshInitialSubscriptions() })
      }
    }
  }, [])

  // Save to localStorage whenever subscriptions change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.subscriptions))
    }
  }, [state.subscriptions])

  const addSubscription = (subscription: Omit<Subscription, "id">) => {
    const newSubscription: Subscription = {
      ...subscription,
      id: Math.random().toString(36).substring(2, 9),
    }
    dispatch({ type: "ADD_SUBSCRIPTION", payload: newSubscription })
  }

  const updateSubscription = (id: string, updates: Partial<Subscription>) => {
    const existing = state.subscriptions.find((sub: Subscription) => sub.id === id)
    if (existing) {
      dispatch({
        type: "UPDATE_SUBSCRIPTION",
        payload: { ...existing, ...updates },
      })
    }
  }

  const deleteSubscription = (id: string) => {
    dispatch({ type: "DELETE_SUBSCRIPTION", payload: id })
  }

  const setSearchQuery = (query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query })
  }

  // Filter subscriptions based on search query
  const filteredSubscriptions = state.subscriptions.filter((sub: Subscription) => {
    if (!state.searchQuery) return true
    const query = state.searchQuery.toLowerCase()
    return (
      sub.name.toLowerCase().includes(query) ||
      sub.category.toLowerCase().includes(query)
    )
  })

  return (
    <SubscriptionContext.Provider
      value={{
        ...state,
        addSubscription,
        updateSubscription,
        deleteSubscription,
        setSearchQuery,
        filteredSubscriptions,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscriptions() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscriptions must be used within a SubscriptionProvider")
  }
  return context
}