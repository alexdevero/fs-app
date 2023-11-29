import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { LogoutPage } from '@/modules/logout/logout-page'

export default async function Page() {
  const cookieStore = cookies()
  const tokenCookie = cookieStore.get('token')?.value

  if (!tokenCookie) {
    return redirect('/login')
  } else {
    return <LogoutPage />
  }
}
