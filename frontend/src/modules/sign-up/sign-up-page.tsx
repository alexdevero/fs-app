'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { API_URL } from '@/consts/env'
import { CreateUserResponse } from '@/types/api'
import { customFetch } from '@/utils/fetch'

export async function SignUpPage() {
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await customFetch({
        url: `${API_URL}/register`,
        method: 'POST',
        body: JSON.stringify({ email, name, password }),
      })
      const res = (await response.json()) as CreateUserResponse

      if (res.user) {
        router.push('/dashboard')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[320px] gap-4"
      data-testid="sign-up-form"
    >
      <input
        type="text"
        name="name"
        id="name"
        className="border border-slate-400 rounded-md h-9 px-2 text-sm"
        placeholder="Enter name..."
        data-testid="sign-up-name-input"
        required
      />
      <input
        type="text"
        name="email"
        id="email"
        className="border border-slate-400 rounded-md h-9 px-2 text-sm"
        placeholder="Enter email..."
        data-testid="sign-up-email-input"
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        className="border border-slate-400 rounded-md h-9 px-2 text-sm"
        placeholder="Enter password..."
        data-testid="sign-up-password-input"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 h-9 text-white rounded-md"
        data-testid="sign-up-submit-button"
      >
        Sign up
      </button>
    </form>
  )
}
