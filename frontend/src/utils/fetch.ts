import { FieldError } from '@/types/api'

type Params = {
  url: string
  method?: string
  headers?: HeadersInit
  body?: any
}

export async function customFetch({ url, method = 'GET', headers = {}, body }: Params) {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
    ...(body ? { body } : {}),
  })

  if (!res.ok) {
    const errorData = await res.json()

    throw new FieldError(errorData.message, errorData.fields)
  }

  return res
}
