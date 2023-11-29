'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { API_URL } from '@/consts/env'
import { LoginResponse } from '@/types/api'
import { customFetch } from '@/utils/fetch'

export async function LoginPage() {
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await customFetch({
        url: `${API_URL}/login`,
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const res = (await response.json()) as LoginResponse

      if (res.token) {
        router.push('/dashboard')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[320px] gap-4">
      <input
        type="text"
        name="email"
        id="email"
        className="border border-slate-400 rounded-md h-9 px-2 text-sm"
        placeholder="Enter email..."
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        className="border border-slate-400 rounded-md h-9 px-2 text-sm"
        placeholder="Enter password..."
        required
      />
      <button type="submit" className="bg-blue-500 h-9 text-white rounded-md">
        Login
      </button>
    </form>
  )
}
