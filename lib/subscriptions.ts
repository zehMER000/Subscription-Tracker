export interface Subscription {
  id: string
  name: string
  category: string
  price: number
  cycle: "monthly" | "yearly"
  nextPayment: string // ISO date
  logo: string // URL to brand logo
  color: string // brand color hex
}

const today = new Date()
const addDays = (d: Date, days: number) => {
  const result = new Date(d)
  result.setDate(result.getDate() + days)
  return result.toISOString().split("T")[0]
}

export const subscriptions: Subscription[] = [
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
    nextPayment: addDays(today, 8),
    logo: "https://cdn.simpleicons.org/github/fff",
    color: "#ffffff",
  },
  {
    id: "5",
    name: "Notion",
    category: "Productivity",
    price: 8.0,
    cycle: "monthly",
    nextPayment: addDays(today, 12),
    logo: "https://cdn.simpleicons.org/notion/fff",
    color: "#ffffff",
  },
  {
    id: "6",
    name: "Linear",
    category: "Developer",
    price: 10.0,
    cycle: "monthly",
    nextPayment: addDays(today, 15),
    logo: "https://cdn.simpleicons.org/linear/5E6AD2",
    color: "#5E6AD2",
  },
  {
    id: "7",
    name: "Adobe CC",
    category: "Design",
    price: 54.99,
    cycle: "monthly",
    nextPayment: addDays(today, 0),
    logo: "https://cdn.simpleicons.org/adobe/FF0000",
    color: "#FF0000",
  },
  {
    id: "8",
    name: "Vercel",
    category: "Developer",
    price: 20.0,
    cycle: "monthly",
    nextPayment: addDays(today, 22),
    logo: "https://cdn.simpleicons.org/vercel/fff",
    color: "#ffffff",
  },
  {
    id: "9",
    name: "OpenAI",
    category: "AI",
    price: 20.0,
    cycle: "monthly",
    nextPayment: addDays(today, 18),
    logo: "https://cdn.simpleicons.org/openai/fff",
    color: "#ffffff",
  },
  {
    id: "10",
    name: "Slack",
    category: "Communication",
    price: 7.25,
    cycle: "monthly",
    nextPayment: addDays(today, 25),
    logo: "https://cdn.simpleicons.org/slack/4A154B",
    color: "#4A154B",
  },
]

export function getDaysUntilPayment(dateStr: string): number {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function isUrgent(dateStr: string): boolean {
  const days = getDaysUntilPayment(dateStr)
  return days <= 2
}

export function getMonthlyTotal(subscriptions: Subscription[]): number {
  return subscriptions.reduce((sum, sub) => {
    return sum + (sub.cycle === "yearly" ? sub.price / 12 : sub.price)
  }, 0)
}

export function getYearlyTotal(subscriptions: Subscription[]): number {
  return subscriptions.reduce((sum, sub) => {
    return sum + (sub.cycle === "yearly" ? sub.price : sub.price * 12)
  }, 0)
}

export function getUpcomingCount(subscriptions: Subscription[], getDaysUntilPaymentFn: (dateStr: string) => number): number {
  return subscriptions.filter((sub) => {
    const days = getDaysUntilPaymentFn(sub.nextPayment)
    return days >= 0 && days <= 7
  }).length
}

export function getUrgentCount(subscriptions: Subscription[], isUrgentFn: (dateStr: string) => boolean): number {
  return subscriptions.filter((sub) => isUrgentFn(sub.nextPayment)).length
}
