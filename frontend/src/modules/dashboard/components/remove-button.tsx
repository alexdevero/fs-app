'use client'

import revalidateUsers from '../actions/revalidate-users'

type Props = {
  userId: string
  token?: string
}

export const RemoveButton = ({ userId, token }: Props) => {
  const handleClick = async () => {
    if (!token) return

    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token}`,
        },
        credentials: 'include',
      })
      const data = await res.json()

      revalidateUsers()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <button
      className="bg-blue-500 h-7 text-white rounded-md px-3 text-xs"
      onClick={handleClick}
    >
      Remove
    </button>
  )
}
