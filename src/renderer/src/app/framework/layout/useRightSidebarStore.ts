import { create } from 'zustand'
import type { ReactNode } from 'react'

interface RightSidebarState {
  isOpen: boolean
  content: ReactNode | null
  title: string
  setContent: (title: string, content: ReactNode) => void
  clearContent: () => void
  setIsOpen: (isOpen: boolean) => void
}

export const useRightSidebarStore = create<RightSidebarState>((set) => ({
  isOpen: false,
  content: null,
  title: '',
  setContent: (title, content) => set({ title, content, isOpen: true }),
  clearContent: () => set({ title: '', content: null, isOpen: false }),
  setIsOpen: (isOpen) => set({ isOpen })
}))
