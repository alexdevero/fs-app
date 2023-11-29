import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Page() {
  const cookieStore = cookies()
  const tokenCookie = cookieStore.get('token')?.value

  if (!tokenCookie) {
    redirect('/login')
  } else {
    redirect('/dashboard')
  }
}
