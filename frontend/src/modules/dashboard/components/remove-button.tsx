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
      className={`bg-transparent text-gray-700 rounded-full flex items-center justify-center
      w-8 h-8 text-xl ${disabled ? ' hidden' : ' hover:bg-gray-100 transition-all'}`}
      disabled={disabled}
      data-testid="remove-button"
      onClick={handleClick}
    >
      &times;
    </button>
  )
}
