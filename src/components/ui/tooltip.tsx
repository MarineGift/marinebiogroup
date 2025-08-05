"use client"

import * as React from "react"

interface TooltipProviderProps {
  children: React.ReactNode
}

export function TooltipProvider({ children }: TooltipProviderProps) {
  return <>{children}</>
}

interface TooltipProps {
  children: React.ReactNode
}

export function Tooltip({ children }: TooltipProps) {
  return <>{children}</>
}

interface TooltipTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export function TooltipTrigger({ children }: TooltipTriggerProps) {
  return <>{children}</>
}

interface TooltipContentProps {
  children: React.ReactNode
  className?: string
}

export function TooltipContent({ children, className }: TooltipContentProps) {
  return (
    <div className={`rounded bg-gray-900 px-2 py-1 text-xs text-white ${className}`}>
      {children}
    </div>
  )
}