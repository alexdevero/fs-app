import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { SignUpPage } from '@/modules/sign-up/sign-up-page'

export default async function Page() {
  const cookieStore = cookies()
  const tokenCookie = cookieStore.get('token')?.value

  if (!tokenCookie) {
    return <SignUpPage />
  } else {
    return redirect('/dashboard')
  }
}
