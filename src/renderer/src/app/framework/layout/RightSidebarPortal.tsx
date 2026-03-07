import { useEffect, type ReactNode } from 'react'
import { useRightSidebarStore } from './useRightSidebarStore'

interface RightSidebarPortalProps {
  title: string
  children: ReactNode
}

export const RightSidebarPortal = ({ title, children }: RightSidebarPortalProps) => {
  const setContent = useRightSidebarStore((state) => state.setContent)
  const clearContent = useRightSidebarStore((state) => state.clearContent)

  useEffect(() => {
    setContent(title, children)

    return () => clearContent()
  }, [title, children, setContent, clearContent])

  return null
}
