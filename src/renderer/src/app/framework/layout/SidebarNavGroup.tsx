import { Link } from '@tanstack/react-router'
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@app/components/ui/sidebar'
import type { LucideIcon } from 'lucide-react'

export type SidebarNavItem = {
  title: string
  to: string
  icon: LucideIcon
}

export type SidebarNavItems = readonly SidebarNavItem[]

interface SidebarNavGroupProps {
  items: SidebarNavItems
}

export const SidebarNavGroup = ({ items }: SidebarNavGroupProps) => {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.to}>
          <SidebarMenuButton asChild tooltip={item.title}>
            <Link
              to={item.to}
              activeProps={{ className: 'bg-accent text-accent-foreground font-medium' }}
            >
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
