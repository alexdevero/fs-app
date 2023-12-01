import { cookies } from 'next/headers'

import { API_URL } from '@/consts/env'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/pagination'
import type { GetMeResponse, GetUsersResponse } from '@/types/api'
import { PageProps } from '@/types/next'
import { customFetch } from '@/utils/fetch'

import { EditUserButton } from './components/edit-user-button'
import { Pagination } from './components/pagination'
import { RemoveButton } from './components/remove-button'

async function getUsersData(
  token?: string,
  pageSize: number = DEFAULT_PAGE_SIZE,
  page: number = DEFAULT_PAGE,
) {
  if (!token) return

  try {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    })
    const url = `${API_URL}/users?${searchParams.toString()}`
    const res = await customFetch({
      url,
      headers: {
        Cookie: `token=${token}`,
      },
    })
    const data = (await res.json()) as GetUsersResponse

    return {
      users: data.users,
      pagination: data.pagination,
    }
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

type Props = PageProps<
  {},
  {
    page?: number
    pageSize?: number
  }
>

export async function DashboardPage({ params, searchParams }: Props) {
  const { page, pageSize } = searchParams ?? {}
  const cookieStore = cookies()
  const tokenCookie = cookieStore.get('token')?.value
  const { users, pagination } = (await getUsersData(tokenCookie, pageSize, page)) ?? {}
  const me = await getMeData(tokenCookie)

  return (
    <div
      className="flex w-screen flex-1 flex-col px-3 pb-2"
      data-testid="dashboard-page"
    >
      <div className="flex flex-1 items-start overflow-y-auto">
        <table className="w-full max-w-full" data-testid="dashboard-table">
          <thead
            className="bg-gray-800 text-white"
            data-testid="dashboard-table-header"
          >
            <tr className="text-left text-sm font-bold">
              <th className="h-7 px-4 py-3 text-sm font-semibold uppercase">Name</th>
              <th className="h-7 px-4 py-3 text-sm font-semibold uppercase">Email</th>
              <th className="h-7 px-4 py-3 text-sm font-semibold uppercase" />
            </tr>
          </thead>
          <tbody data-testid="dashboard-table-body" className="h-auto">
            {users?.map((user, i) => (
              <tr
                key={user.id}
                className={`text-sm font-normal ${
                  i % 2 ? 'text-gray-700' : 'bg-gray-100'
                }`}
                data-testid="dashboard-table-body-row"
              >
                <td className="h-7 px-4 py-3 text-left">{user.name}</td>
                <td className="h-7 px-4 py-3 text-left">{user.email}</td>
                <td className="h-7 px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
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

      <Pagination
        activePage={pagination?.page}
        hasNextPage={pagination?.hasNextPage}
        hasPrevPage={pagination?.hasPrevPage}
        pageSize={pagination?.pageSize}
        totalPageCount={pagination?.totalPageCount}
      />
    </div>
  )
}
