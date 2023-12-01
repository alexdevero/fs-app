import { fireEvent, render } from '@testing-library/react'

import React from 'react'

import { Pagination } from './pagination'

describe('Pagination', () => {
  it('should render without crashing', () => {
    const { container } = render(<Pagination />)

    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render previous and next buttons', () => {
    const { getByTestId } = render(<Pagination hasNextPage hasPrevPage />)

    expect(getByTestId('pagination-prev-mobile')).toBeInTheDocument()
    expect(getByTestId('pagination-next-mobile')).toBeInTheDocument()
  })

  it('should render previous button as disabled', () => {
    const { getByTestId } = render(<Pagination hasNextPage />)

    expect(getByTestId('pagination-prev')).toHaveClass('cursor-not-allowed')
  })

  it('should render next button as disabled', () => {
    const { getByTestId } = render(<Pagination hasPrevPage />)

    expect(getByTestId('pagination-next')).toHaveClass('cursor-not-allowed')
  })

  it('should render page numbers', () => {
    const { getByText } = render(<Pagination totalPageCount={3} />)

    expect(getByText('1')).toBeInTheDocument()
    expect(getByText('2')).toBeInTheDocument()
    expect(getByText('3')).toBeInTheDocument()
  })

  it('should render active page', () => {
    const { getByText } = render(<Pagination activePage={2} totalPageCount={3} />)

    expect(getByText('2')).toHaveClass('bg-indigo-600')
  })

  it('should render previous and next buttons with correct href', () => {
    const { getByTestId } = render(
      <Pagination
        activePage={2}
        hasNextPage
        hasPrevPage
        pageSize={10}
        totalPageCount={3}
      />,
    )

    expect(getByTestId('pagination-prev')).toHaveAttribute(
      'href',
      '?page=1&pageSize=10',
    )
    expect(getByTestId('pagination-next')).toHaveAttribute(
      'href',
      '?page=3&pageSize=10',
    )
  })

  it('should render page numbers with correct href', () => {
    const { getByText } = render(
      <Pagination
        activePage={2}
        hasNextPage
        hasPrevPage
        pageSize={10}
        totalPageCount={3}
      />,
    )

    expect(getByText('1')).toHaveAttribute('href', '?page=1&pageSize=10')
    expect(getByText('2')).toHaveAttribute('href', '?page=2&pageSize=10')
    expect(getByText('3')).toHaveAttribute('href', '?page=3&pageSize=10')
  })

  it('should redirect to previous page when clicking on previous button', async () => {
    const { getByTestId, rerender, getByText } = render(
      <Pagination
        activePage={2}
        hasNextPage
        hasPrevPage
        pageSize={10}
        totalPageCount={3}
      />,
    )

    fireEvent.click(getByTestId('pagination-prev'))

    rerender(
      <Pagination
        activePage={1}
        hasNextPage
        hasPrevPage
        pageSize={10}
        totalPageCount={3}
      />,
    )

    expect(getByText('1')).toHaveClass('bg-indigo-600')
  })

  it('should redirect to next page when clicking on next button', async () => {
    const { getByTestId, rerender, getByText } = render(
      <Pagination
        activePage={2}
        hasNextPage
        hasPrevPage
        pageSize={10}
        totalPageCount={3}
      />,
    )

    fireEvent.click(getByTestId('pagination-next'))

    rerender(
      <Pagination
        activePage={3}
        hasNextPage
        hasPrevPage
        pageSize={10}
        totalPageCount={3}
      />,
    )

    expect(getByText('3')).toHaveClass('bg-indigo-600')
  })
})
