import { cookies } from 'next/headers'

import { API_URL } from '@/consts/env'
import { GetUsersResponse } from '@/types/api'
import { customFetch } from '@/utils/fetch'

import { RemoveButton } from './components/remove-button'

async function getData(token?: string) {
  if (!token) return

  try {
    const res = await customFetch({
      url: `${API_URL}/users`,
      headers: {
        Cookie: `token=${token}`,
      },
    })
    const data = (await res.json()) as GetUsersResponse

    return data.users
  } catch (err) {
    console.error(err)
  }
}

export async function DashboardPage() {
  const cookieStore = cookies()
  const tokenCookie = cookieStore.get('token')?.value
  const data = await getData(tokenCookie)

  return (
    <div className="px-3">
      <table className="w-full">
        <thead>
          <tr className="text-left font-bold text-sm">
            <th className="h-7">Name</th>
            <th className="h-7">Email</th>
            <th className="h-7" />
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id} className="font-normal text-sm">
              <td className="h-7">{user.name}</td>
              <td className="h-7">{user.email}</td>
              <td className="h-7 text-right">
                <RemoveButton userId={user.id} token={tokenCookie} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
