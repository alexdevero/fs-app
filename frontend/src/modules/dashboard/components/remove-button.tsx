'use client'

import { API_URL } from '@/consts/env'
import { DeleteUserResponse } from '@/types/api'
import { customFetch } from '@/utils/fetch'

import revalidateUsers from '../actions/revalidate-users'

type Props = {
  userId: string
  token?: string
  disabled?: boolean
}

export const RemoveButton = ({ disabled, userId, token }: Props) => {
  const handleClick = async () => {
    if (!token) return

    try {
      const res = await customFetch({
        url: `${API_URL}/users/${userId}`,
        method: 'DELETE',
        headers: {
          Cookie: `token=${token}`,
        },
      })
      const data = (await res.json()) as DeleteUserResponse

      revalidateUsers()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <button
      className={`bg-blue-500 h-7 text-white rounded-md px-3 text-xs${
        disabled ? ' bg-gray-400 opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      Remove
    </button>
  )
}
