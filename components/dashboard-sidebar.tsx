"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarItem {
  label: string
  href: string
  icon: string
}

interface DashboardSidebarProps {
  items: SidebarItem[]
}

export function DashboardSidebar({ items }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-gray-200 bg-[#3B82F6] p-4">
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 text-white transition-all hover:bg-white/20",
              pathname === item.href && "bg-white/30 font-semibold",
            )}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
