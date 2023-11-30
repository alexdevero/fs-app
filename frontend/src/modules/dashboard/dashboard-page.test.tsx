import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'

import { API_URL } from '@/consts/env'
import { customFetch } from '@/utils/fetch'
import { resolvedComponent } from '@/utils/tests'

import { DashboardPage } from './dashboard-page'
import { GetUsersResponse } from '@/types/api'

jest.mock('next/headers', () => ({
  cookies() {
    return {
      requestAsyncStorage: () => null,
      get: () => null,
    }
  },
}))

jest.mock('../../utils/fetch.ts', () => ({
  customFetch: jest.fn(),
}))

describe('DashboardPage', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should render', async () => {
    const DashboardPageResolved = await resolvedComponent(DashboardPage, {})
    const { getByTestId } = render(<DashboardPageResolved />)

    expect(getByTestId('dashboard-page')).toBeInTheDocument()
  })

  it('should render dashboard table', async () => {
    const mockUsersData: GetUsersResponse = {
      users: [
        {
          id: '1',
          name: 'John Doe',
          email: 'joedoe@example.com',
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString(),
        },
      ],
    }
    const mockMeData = { user: { name: 'John Doe', email: 'joedoe@example.com' } }

    fetchMock.mockResponses(JSON.stringify(mockUsersData), JSON.stringify(mockMeData))

    const DashboardPageResolved = await resolvedComponent(DashboardPage, {})
    const { getByTestId } = render(<DashboardPageResolved />)

    const tableEl = getByTestId('dashboard-table')
    const tableHeaderEl = getByTestId('dashboard-table-header')
    const tableBodyEl = getByTestId('dashboard-table-body')

    await waitFor(() => {
      expect(tableEl).toBeInTheDocument()
      expect(tableHeaderEl).toBeInTheDocument()
      expect(tableBodyEl).toBeInTheDocument()
    })
  })
})
