import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/pagination'

export function getDashboardSearchParams() {
  const searchParams = new URLSearchParams()
  searchParams.set('page', DEFAULT_PAGE.toString())
  searchParams.set('pageSize', DEFAULT_PAGE_SIZE.toString())

  return searchParams
}
