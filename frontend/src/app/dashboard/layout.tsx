import Link from 'next/link'

import { AddUserButton } from '@/modules/dashboard/components/add-user-button'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen relative">
      <header>
        <nav className="flex">
          <ul className="flex gap-3 px-4 py-6 w-full text-sm justify-end">
            <li>
              <Link href="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}

      <div className="fixed bottom-5 right-5">
        <AddUserButton />
      </div>
    </div>
  )
}
