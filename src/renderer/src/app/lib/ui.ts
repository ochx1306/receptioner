export const MAX_WIDTH_CLASSES = {
  sm: 'sm:max-w-sm', // 384px
  md: 'sm:max-w-md', // 448px
  lg: 'sm:max-w-lg', // 512px
  xl: 'sm:max-w-xl', // 576px
  '2xl': 'sm:max-w-2xl', // 672px
  full: 'sm:max-w-[95vw]' // 画面幅の95%
} as const

export type MaxWidthVariant = keyof typeof MAX_WIDTH_CLASSES
