"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      enableColorScheme={false} // 🎯 Impede a injeção do script legado do React 18
    >
      {children}
    </NextThemesProvider>
  )
}
