import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <header>
        <nav className="flex justify-end">
          <ul className="flex gap-2 px-4 py-6">
            <li>
              <Link href="/sign-up">Sign up</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="w-screen flex-1 flex items-center justify-center">{children}</div>
    </div>
  )
}
