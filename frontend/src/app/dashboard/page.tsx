import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { DashboardPage } from '@/modules/dashboard/dashboard-page'
import { PageProps } from '@/types/next'

type Props = PageProps<
  {},
  {
    page?: number
    pageSize?: number
  }
>

export default async function Page(props: Props) {
  const { page, pageSize } = props.searchParams ?? {}
  const cookieStore = cookies()
  const tokenCookie = cookieStore.get('token')

  if (!tokenCookie) {
    return redirect('/login')
  }

  if (page && pageSize) {
    return <DashboardPage {...props} />
  }

  return redirect('/dashboard?page=1&pageSize=10')
}
