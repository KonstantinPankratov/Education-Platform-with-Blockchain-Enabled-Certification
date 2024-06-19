import Link from "next/link"

const Footer = function () {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 mt-32">
      <div className="container flex justify-center md:justify-between items-center py-6">
        <nav className="justify-between items-center gap-4 lg:gap-6 font-medium hidden md:flex" aria-label="Global">
          <Link
            href="/#how-it-works"
            className="transition-colors hover:text-neutral-300">
            How it works
          </Link>
          <Link
            href="/#courses"
            className="transition-colors hover:text-neutral-300">
            Courses
          </Link>
        </nav>
        <p className="text-base text-neutral-500">© 2024 EDUPLA. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
