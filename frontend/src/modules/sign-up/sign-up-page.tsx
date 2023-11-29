'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export async function SignUpPage() {
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, name, password }),
      })
      const res = await response.json()

      if (res.user) {
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
        name="name"
        id="name"
        className="border border-slate-400 rounded-md h-9 px-2 text-sm"
        placeholder="Enter name..."
        required
      />
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
        Sign up
      </button>
    </form>
  )
}
