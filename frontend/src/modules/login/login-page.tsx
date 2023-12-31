'use client'

import { FormEvent, useState } from 'react'

import { useRouter } from 'next/navigation'

import { API_URL } from '@/consts/env'
import { FieldError, LoginResponse } from '@/types/api'
import { getDashboardSearchParams } from '@/utils/dashboard-search-params'
import { customFetch } from '@/utils/fetch'

export function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

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
        const searchParams = getDashboardSearchParams()
        router.push(`/dashboard?${searchParams.toString()}`)
      }
    } catch (err) {
      console.error(err)
      setError((err as Error | FieldError).message)
    }
  }

  return (
    <div>
      <h1 className="mb-8 text-center text-2xl">Welcome</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-[320px] flex-col gap-4"
        data-testid="login-form"
      >
        <input
          type="text"
          name="email"
          id="email"
          className={`h-9 rounded-md border border-slate-400 px-2 text-sm${
            error ? ' border-red-500' : ''
          }`}
          placeholder="Enter email..."
          data-testid="login-email-input"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          className={`h-9 rounded-md border border-slate-400 px-2 text-sm${
            error ? ' border-red-500' : ''
          }`}
          placeholder="Enter password..."
          data-testid="login-password-input"
          required
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="h-9 rounded-md bg-blue-500 text-white"
          data-testid="login-submit-button"
        >
          Login
        </button>
      </form>
    </div>
  )
}
