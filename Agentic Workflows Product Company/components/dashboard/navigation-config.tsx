import {
  Calendar,
  Users,
  MessageSquare,
  Settings,
  Palette,
  Building,
  BarChart3,
  Search,
  Clock,
  CalendarPlus,
} from "lucide-react"

export interface NavigationItem {
  href: string
  icon: any
  label: string
}

export function getNavigationItems(accountType: string): NavigationItem[] {
  switch (accountType) {
    case "client":
      return [
        { href: "/dashboard/client", icon: BarChart3, label: "Dashboard" },
        { href: "/booking", icon: CalendarPlus, label: "Book Session" },
        { href: "/dashboard/client/appointments", icon: Calendar, label: "My Appointments" },
        { href: "/dashboard/client/artists", icon: Search, label: "Find Artists" },
        { href: "/dashboard/client/messages", icon: MessageSquare, label: "Messages" },
        { href: "/dashboard/client/settings", icon: Settings, label: "Settings" },
      ]

    case "artist":
      return [
        { href: "/dashboard/artist", icon: BarChart3, label: "Dashboard" },
        { href: "/dashboard/artist/schedule", icon: Calendar, label: "Schedule" },
        { href: "/dashboard/artist/appointments", icon: Clock, label: "Appointments" },
        { href: "/dashboard/artist/clients", icon: Users, label: "My Clients" },
        { href: "/dashboard/artist/portfolio", icon: Palette, label: "Portfolio" },
        { href: "/dashboard/artist/messages", icon: MessageSquare, label: "Messages" },
        { href: "/dashboard/artist/settings", icon: Settings, label: "Settings" },
      ]

    case "studio":
      return [
        { href: "/dashboard/studio", icon: BarChart3, label: "Dashboard" },
        { href: "/dashboard/studio/artists", icon: Users, label: "Artists" },
        { href: "/dashboard/studio/appointments", icon: Calendar, label: "Appointments" },
        { href: "/dashboard/studio/analytics", icon: BarChart3, label: "Analytics" },
        { href: "/dashboard/studio/messages", icon: MessageSquare, label: "Messages" },
        { href: "/dashboard/studio/settings", icon: Settings, label: "Settings" },
      ]

    case "admin":
      return [
        { href: "/dashboard/admin", icon: BarChart3, label: "Dashboard" },
        { href: "/dashboard/admin/users", icon: Users, label: "Users" },
        { href: "/dashboard/admin/studios", icon: Building, label: "Studios" },
        { href: "/dashboard/admin/analytics", icon: BarChart3, label: "Analytics" },
        { href: "/dashboard/admin/system", icon: Settings, label: "System" },
      ]

    default:
      return [{ href: "/dashboard/client", icon: BarChart3, label: "Dashboard" }]
  }
}
