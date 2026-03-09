import { HomeIcon, RoleIcon, SettingsIcon } from '@/components/feature-icons'
import type { SidebarNavItems } from '@/app/framework/layout/SidebarNavGroup'

export const MAIN_NAV_ITEMS: SidebarNavItems = [
  {
    title: 'Home',
    to: '/',
    icon: HomeIcon
  },
  {
    title: 'Role',
    to: '/roles',
    icon: RoleIcon
  }
]

export const SUB_NAV_ITEMS: SidebarNavItems = [
  {
    title: 'Settings',
    to: '/settings',
    icon: SettingsIcon
  }
]
