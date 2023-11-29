'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        if (response.ok) {
          router.push('/')
        }
      } catch (err) {
        console.error(err)
      }
    }

    logout()
  }, [router])

  return <div></div>
}
