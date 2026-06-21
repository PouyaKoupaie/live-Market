'use client'

import { TanstackProvider } from './tanstack-provider'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
      <TanstackProvider>{children}</TanstackProvider>
    </ThemeProvider>
  )
}
