# Subtrack - Subscription Tracker

A modern, sleek subscription tracking application built with Next.js. Track, manage, and optimize all your subscriptions in one beautiful dashboard.

## Features

### Core Functionality
- **Add Subscriptions**: Track new recurring subscriptions with name, price, billing cycle, category, and payment dates
- **Edit Subscriptions**: Modify any subscription details at any time
- **Delete Subscriptions**: Remove subscriptions you no longer need
- **Category Management**: Organize subscriptions by categories (Entertainment, Developer, Design, Productivity, Music, AI, Communication)
- **Billing Cycles**: Support for both monthly and yearly billing cycles
- **Payment Tracking**: Visual indicators for upcoming and urgent payments

### Dashboard Analytics
- **Spending Overview**: View your total monthly and yearly spending at a glance
- **Category Breakdown**: Visual spending chart showing distribution across categories
- **Upcoming Payments**: See which subscriptions are due soon
- **Urgent Alerts**: Get notified about payments due within 48 hours
- **Quick Stats**: Bento-style statistics grid with key metrics

### User Experience
- **Search**: Find any subscription quickly with the search functionality
- **Filtering**: Filter subscriptions by category or urgency
- **Notifications**: Bell icon dropdown showing upcoming payments with detailed information
- **Profile Management**: User profile dropdown with settings and preferences
- **Dark/Light Mode**: Theme switching capability
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Data Persistence**: All data saved to localStorage - no database required

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Theme Management**: next-themes
- **Charts**: Recharts
- ****: date-fnsDate Handling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Subtrack app
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx          # Main dashboard page
│   └── globals.css       # Global styles and theme
├── components/            # React components
│   ├── ui/              # Shadcn UI components
│   ├── dashboard-header.tsx
│   ├── bento-stats.tsx
│   ├── subscription-feed.tsx
│   ├── subscription-card.tsx
│   ├── spending-chart.tsx
│   ├── add-subscription-button.tsx
│   ├── notification-dropdown.tsx
│   └── profile-dropdown.tsx
├── contexts/             # React Context providers
│   └── subscription-context.tsx
├── lib/                  # Utility functions
│   ├── subscriptions.ts  # Subscription data and helpers
│   └── utils.ts         # General utilities
└── public/               # Static assets
```

## Key Components

### Subscription Context
Manages global subscription state with:
- CRUD operations (Create, Read, Update, Delete)
- LocalStorage persistence
- Search functionality
- Filtered subscriptions based on search query

### Dashboard Header
- Logo and branding
- Search functionality
- Notification dropdown
- Profile dropdown

### Bento Stats Grid
- Monthly spending total
- Yearly estimate
- Upcoming payments count
- Urgent payments alert

### Subscription Feed
- List of all subscriptions
- Category filters
- Sorting by payment due date

### Spending Chart
- Visual breakdown by category
- Percentage distribution
- Color-coded bars

## Data Model

```typescript
interface Subscription {
  id: string
  name: string
  category: string
  price: number
  cycle: "monthly" | "yearly"
  nextPayment: string // ISO date
  logo: string
  color: string
}
```

## Categories

- Entertainment (Netflix, etc.)
- Developer (GitHub, Vercel, etc.)
- Design (Figma, Adobe CC, etc.)
- Productivity (Notion, etc.)
- Music (Spotify, etc.)
- AI (OpenAI, etc.)
- Communication (Slack, etc.)

## Payment Indicators

- **Urgent** (Red): Due within 48 hours
- **Due Soon** (Yellow): Due within 7 days
- **Upcoming** (Normal): Due after 7 days

## License

MIT License - Feel free to use this project for learning or personal projects.

## Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Inspired by modern dashboard designs
- Uses [Simple Icons](https://simpleicons.org/) for brand logos

---

Built with ❤️ using Next.js and Tailwind CSS
