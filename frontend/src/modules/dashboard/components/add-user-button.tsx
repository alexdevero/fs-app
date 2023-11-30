'use client'

import { FormEvent, useEffect, useState } from 'react'

import { API_URL } from '@/consts/env'
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
  DialogContent,
  DialogClose,
  DialogTitle,
} from '@/components/dialog'
import { CreateUserResponse, FieldError } from '@/types/api'
import { customFetch } from '@/utils/fetch'

import revalidateUsers from '../actions/revalidate-users'

export const AddUserButton = () => {
  const [isClient, setIsClient] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

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
        revalidateUsers()
        setIsOpen(false)
      }
    } catch (err) {
      console.error(err)
      setError((err as Error | FieldError).message)
    }
  }

  return (
    isClient && (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <span
            className="w-14 h-14 text-white rounded-full bg-blue-600 flex items-center justify-center"
            data-testid="add-modal-trigger"
          >
            +
          </span>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-50 bg-slate-500/20" />
          <DialogContent className="fixed left-[50%] top-[50%] z-50 grid max-h-[95vh] max-w-md translate-x-[-50%] translate-y-[-50%] gap-6 overflow-auto bg-white p-14 shadow-lg duration-200 md:w-full rounded-xl">
            <DialogClose className="absolute right-3 top-3">&times;</DialogClose>

            <DialogTitle className="text-lg font-bold my-0 text-center">
              Add user
            </DialogTitle>

            <form onSubmit={handleSubmit} className="flex flex-col w-[320px] gap-4">
              <input
                type="text"
                name="name"
                id="name"
                data-testid="add-modal-name"
                className={`border border-slate-400 rounded-md h-9 px-2 text-sm${
                  error ? ' border-red-500' : ''
                }`}
                placeholder="Enter name..."
                required
              />
              <input
                type="text"
                name="email"
                id="email"
                data-testid="add-modal-email"
                className={`border border-slate-400 rounded-md h-9 px-2 text-sm${
                  error ? ' border-red-500' : ''
                }`}
                placeholder="Enter email..."
                required
              />
              <input
                type="password"
                name="password"
                id="password"
                data-testid="add-modal-password"
                className={`border border-slate-400 rounded-md h-9 px-2 text-sm${
                  error ? ' border-red-500' : ''
                }`}
                placeholder="Enter password..."
                required
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="bg-blue-500 h-9 text-white rounded-md"
                data-testid="add-modal-submit-button"
              >
                Add user
              </button>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  )
}
