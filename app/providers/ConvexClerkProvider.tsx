"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

function ConvexClerkProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!} appearance={{
      layout: {
        socialButtonsVariant: "iconButton",
        logoImageUrl: "/icons/auth-logo.svg",
      },
      variables: {
        colorText: "white",
        colorBackground: "#15171c",
        colorInputText: "white",
        colorInputBackground: "#1b1f29",
        colorPrimary: "",
      }
    }}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}

export default ConvexClerkProvider;