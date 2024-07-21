import { Button } from "@/components/ui/button"
import Link from "next/link"

const NavDefault = () => {
  return (
    <nav className="flex items-center gap-6 font-medium">
      <Link
        href="/#how-it-works"
        className="hidden md:block transition-colors hover:text-neutral-300">
        How it works
      </Link>
      <Link
        href="/#courses"
        className="hidden md:block transition-colors hover:text-neutral-300">
        Courses
      </Link>
      <Button asChild>
        <Link href="/sign-in">Sign in</Link>
      </Button>
    </nav>
  )
}

export default NavDefault