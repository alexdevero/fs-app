type Params = {
  url: string
  method?: string
  headers?: HeadersInit
  body?: any
}

export async function customFetch({ url, method = 'GET', headers = {}, body }: Params) {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
    ...(body ? { body } : {}),
  })
}
