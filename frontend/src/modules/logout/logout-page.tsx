'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { API_URL } from '@/consts/env'
import { customFetch } from '@/utils/fetch'

export function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await customFetch({
          url: `${API_URL}/logout`,
          method: 'POST',
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
