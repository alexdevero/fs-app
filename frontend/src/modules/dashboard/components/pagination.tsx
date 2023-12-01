import Link from 'next/link'

import classNames from 'classnames'

type Props = {
  activePage?: number
  hasNextPage?: boolean
  hasPrevPage?: boolean
  pageSize?: number
  totalPageCount?: number
}

export const Pagination = ({
  activePage,
  hasNextPage,
  hasPrevPage,
  pageSize,
  totalPageCount,
}: Props) => {
  const pages = Array.from({ length: totalPageCount ?? 1 }, (_, i) => i + 1)

  return (
    <div
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      data-testid="pagination"
    >
      <div className="flex flex-1 justify-between sm:hidden">
        {hasPrevPage && (
          <Link
            href={
              hasPrevPage ? `?page=${(activePage ?? 1) - 1}&pageSize=${pageSize}` : ''
            }
            className={classNames(
              'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50',
              {
                'pointer-events-none cursor-not-allowed opacity-90': !hasPrevPage,
              },
            )}
            data-testid="pagination-prev-mobile"
          >
            Previous
          </Link>
        )}
        {hasNextPage && (
          <Link
            href={
              hasNextPage ? `?page=${(activePage ?? 1) + 1}&pageSize=${pageSize}` : ''
            }
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            data-testid="pagination-next-mobile"
          >
            Next
          </Link>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Link
              href={
                hasPrevPage ? `?page=${(activePage ?? 1) - 1}&pageSize=${pageSize}` : ''
              }
              className={classNames(
                'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                {
                  'pointer-events-none cursor-not-allowed opacity-90': !hasPrevPage,
                },
              )}
              data-testid="pagination-prev"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            {pages.map((page) => (
              <Link
                key={page}
                aria-current="page"
                className={classNames(
                  'relative inline-flex items-center px-4 py-2 text-sm font-semibold',
                  {
                    'z-10 cursor-pointer bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600':
                      activePage === page,
                  },
                  {
                    'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                      activePage !== page,
                  },
                )}
                href={`?page=${page}&pageSize=${pageSize}`}
                data-testid="pagination-page"
              >
                {page}
              </Link>
            ))}
            <Link
              href={
                hasNextPage ? `?page=${(activePage ?? 1) + 1}&pageSize=${pageSize}` : ''
              }
              aria-disabled={!hasNextPage}
              className={classNames(
                'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                {
                  'pointer-events-none cursor-not-allowed opacity-90': !hasNextPage,
                },
              )}
              data-testid="pagination-next"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
