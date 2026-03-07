import type { ReactNode } from 'react'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger
} from '@app/components/ui/sidebar'
import { useRightSidebarStore } from './useRightSidebarStore'

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { isOpen, content, title } = useRightSidebarStore()

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* 左サイドバー */}
        <Sidebar side="left" variant="sidebar" collapsible="icon">
          <SidebarHeader className="border-b h-14 flex items-center px-4">
            <span className="font-bold">Receptioner</span>
          </SidebarHeader>
          <SidebarContent>{/* メニュー群 */}</SidebarContent>
        </Sidebar>

        {/* メイン領域 */}
        <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <header className="h-14 border-b flex items-center px-4 shrink-0 bg-background gap-2">
            <SidebarTrigger />
            <span className="text-sm text-muted-foreground">パンくずリスト</span>
          </header>

          {/* 外部から注入されたコンテンツ（Outletなど）を描画 */}
          <div className="flex-1 overflow-auto p-6 relative">{children}</div>
        </main>

        {/* 右サイドバー */}
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
