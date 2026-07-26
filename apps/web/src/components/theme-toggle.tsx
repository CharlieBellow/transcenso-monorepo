"use client"

import { useEffect, useState } from "react"
import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { CustomButton } from "@/components/ui/custom/Button"
const emptySubscribe = () => () => {}

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Valor retornado no cliente
    () => false // Valor retornado no servidor (SSR)
  )
}
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useIsMounted()
  const isDark = resolvedTheme === "dark"
  

  return (
    <CustomButton
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? isDark
            ? "Ativar modo claro"
            : "Ativar modo escuro"
          : "Alternar tema"
      }
      className="h-9 w-9 p-0 rounded-xl border border-border bg-secondary/40 text-foreground/90 transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )
      ) : (
        <span className="h-4 w-4" aria-hidden="true" />
      )}
    </CustomButton>
  )
}
