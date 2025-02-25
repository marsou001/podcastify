import { SignUp } from "@clerk/nextjs";

function Page() {
  return (
    <div className="flex-center glassmorphism-auth w-full h-screen">
      <SignUp />
    </div>
  )
}

export default Page;