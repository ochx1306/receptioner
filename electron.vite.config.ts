import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@app': resolve('src/renderer/src/app')
      }
    },
    plugins: [
      tanstackRouter({
        routesDirectory: 'src/routes',
        generatedRouteTree: 'src/routeTree.gen.ts'
      }),
      tailwindcss(),
      react()
    ]
  }
})
