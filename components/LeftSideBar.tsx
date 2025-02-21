import Image from "next/image";
import Link from "next/link";

function LeftSideBar() {
  return (
    <aside className="left_sidebar">
      <nav className="flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-1 pb-10 max-lg:justify-center cursor-pointer">
          <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
          <h1 className="text-24 font-extrabold text-white max-lg:hidden">Podcastr</h1>
        </Link>
      </nav>
    </aside>
  )
}

export default LeftSideBar;