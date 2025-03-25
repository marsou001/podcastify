"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "text-white-1 flex gap-2 items-center px-4 py-3 rounded-lg",
          description: "text-white-1",
          success: "bg-orange-1",
          error: "bg-red-500",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
