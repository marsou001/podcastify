import { Loader } from "lucide-react";

function LoaderSpinner() {
  return (
    <div className="flex-center w-full h-screen">
      <Loader className="animate-spin text-orange-1" size={30} />
    </div>
  )
}

export default LoaderSpinner;