'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function NotFound() {
  const pathname = usePathname()
  return (
    <div>
      <h2>
        Not Found Page for this path: {pathname}
      </h2>
      <p>Could not find requested resource</p>
      <p>
        Go back to <Link href="/">Home</Link>
      </p>
    </div>
  )
}