import { SignIn } from "@clerk/nextjs";

function Page() {
  return (
    <div className="flex-center glassmorphism-auth w-full h-screen">
      <SignIn />
    </div>
  )
}

export default Page;