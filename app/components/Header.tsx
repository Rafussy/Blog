"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Ralf Journey
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className={`hover:underline ${pathname === "/" ? "font-bold" : ""}`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className={`hover:underline ${pathname === "/blog" ? "font-bold" : ""}`}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/gallery" className={`hover:underline ${pathname === "/gallery" ? "font-bold" : ""}`}>
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/add-post" className={`hover:underline ${pathname === "/add-post" ? "font-bold" : ""}`}>
                Add Post
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

