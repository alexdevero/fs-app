'use client'

import { FormEvent, useEffect, useState } from 'react'

import revalidateUsers from '../actions/revalidate-users'

import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
  DialogContent,
  DialogClose,
  DialogTitle,
} from '@/components/dialog'

export const AddUserButton = () => {
  const [isClient, setIsClient] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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
        revalidateUsers()
        setIsOpen(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    isClient && (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>+ Add user</DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-50 bg-slate-500/20" />
          <DialogContent className="fixed left-[50%] top-[50%] z-50 grid max-h-[95vh] max-w-md translate-x-[-50%] translate-y-[-50%] gap-6 overflow-auto bg-white p-14 shadow-lg duration-200 md:w-full rounded-xl">
            <DialogClose className="absolute right-3 top-3">&times;</DialogClose>

            <DialogTitle>
              <h2 className="text-lg font-bold my-0">Add user</h2>
            </DialogTitle>

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
                Add user
              </button>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  )
}
