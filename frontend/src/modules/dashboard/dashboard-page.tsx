import { cookies } from 'next/headers'

import { API_URL } from '@/consts/env'
import type { GetMeResponse, GetUsersResponse } from '@/types/api'
import { customFetch } from '@/utils/fetch'

import { RemoveButton } from './components/remove-button'
import { EditUserButton } from './components/edit-user-button'

async function getUsersData(token?: string) {
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

async function getMeData(token?: string) {
  if (!token) return

  try {
    const res = await customFetch({
      url: `${API_URL}/me`,
      headers: {
        Cookie: `token=${token}`,
      },
    })
    const data = (await res.json()) as GetMeResponse

    return data.user
  } catch (err) {
    console.error(err)
  }
}

export async function DashboardPage() {
  const cookieStore = cookies()
  const tokenCookie = cookieStore.get('token')?.value
  const data = await getUsersData(tokenCookie)
  const me = await getMeData(tokenCookie)

  return (
    <div className="px-3">
      <table className="w-full">
        <thead className="bg-gray-800 text-white">
          <tr className="text-left font-bold text-sm">
            <th className="h-7 py-3 px-4 uppercase font-semibold text-sm">Name</th>
            <th className="h-7 py-3 px-4 uppercase font-semibold text-sm">Email</th>
            <th className="h-7 py-3 px-4 uppercase font-semibold text-sm" />
          </tr>
        </thead>
        <tbody>
          {data?.map((user, i) => (
            <tr
              key={user.id}
              className={`font-normal text-sm ${
                i % 2 ? 'text-gray-700' : 'bg-gray-100'
              }`}
            >
              <td className="h-7 text-left py-3 px-4">{user.name}</td>
              <td className="h-7 text-left py-3 px-4">{user.email}</td>
              <td className="h-7 py-3 px-4 text-right">
                <div className="flex gap-2 justify-end">
                  <EditUserButton
                    token={tokenCookie}
                    userId={user.id}
                    userName={user.name}
                    userEmail={user.email}
                  />
                  <RemoveButton
                    userId={user.id}
                    token={tokenCookie}
                    disabled={user.email === me?.email}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
