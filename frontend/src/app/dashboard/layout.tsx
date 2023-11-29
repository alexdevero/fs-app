import Link from 'next/link'

import { AddUserButton } from '@/modules/dashboard/components/add-user-button'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen">
      <header>
        <nav className="flex">
          <ul className="flex gap-3 px-4 py-6 w-full text-sm">
            <li className="mr-auto">
              <AddUserButton />
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </div>
  )
}
