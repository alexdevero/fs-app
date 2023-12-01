import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { LoginPage } from '@/modules/login/login-page'
import { getDashboardSearchParams } from '@/utils/dashboard-search-params'

export default async function Page() {
  const cookieStore = cookies()
  const tokenCookie = cookieStore.get('token')?.value

  if (!tokenCookie) {
    return <LoginPage />
  } else {
    const searchParams = getDashboardSearchParams()
    return redirect(`/dashboard?${searchParams.toString()}`)
  }
}
