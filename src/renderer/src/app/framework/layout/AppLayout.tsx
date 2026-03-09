import type { ReactNode } from 'react'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter
} from '@app/components/ui/sidebar'
import { SidebarNavGroup, type SidebarNavItems } from './SidebarNavGroup'
import { useRightSidebarStore } from './useRightSidebarStore'

interface AppLayoutProps {
  appName: string
  appLogoSrc: string
  sidebarContentItems: SidebarNavItems
  sidebarFooterItems: SidebarNavItems
  version?: string
  children: ReactNode
}

export const AppLayout = ({
  appName,
  appLogoSrc,
  sidebarContentItems,
  sidebarFooterItems,
  version,
  children
}: AppLayoutProps) => {
  const { isOpen, content, title } = useRightSidebarStore()

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar side="left" variant="sidebar" collapsible="icon">
          <SidebarHeader className="border-b h-14 flex items-center justify-center px-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <img
                src={appLogoSrc}
                alt={`${appName} Logo`}
                className="w-6 h-6 object-contain shrink-0"
              />
              <span className="font-bold truncate group-data-[collapsible=icon]:hidden">
                {appName}
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarNavGroup items={sidebarContentItems} />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarNavGroup items={sidebarFooterItems} />
              </SidebarGroupContent>
            </SidebarGroup>
            {version && (
              <SidebarGroup>
                <SidebarGroupContent>ver.{version}</SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <header className="h-14 border-b flex items-center px-4 shrink-0 bg-background gap-2">
            <SidebarTrigger />
            <span className="text-sm text-muted-foreground">パンくずリスト</span>
          </header>

          <div className="flex-1 overflow-auto p-6 relative">{children}</div>
        </main>

        {isOpen && content && (
          <Sidebar
            side="right"
            variant="floating"
            className="border-l w-80 shrink-0 hidden md:flex"
          >
            <SidebarHeader className="border-b h-14 flex items-center px-4 justify-between shrink-0">
              <span className="font-semibold text-sm">{title}</span>
            </SidebarHeader>
            <SidebarContent className="p-4 overflow-y-auto">{content}</SidebarContent>
          </Sidebar>
        )}
      </div>
    </SidebarProvider>
  )
}
