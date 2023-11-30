import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { customFetch } from '@/utils/fetch'
import { API_URL } from '@/consts/env'

import { RemoveButton } from './remove-button'

const mockUserId = 'mockUserId'
const mockToken = 'mockToken'

jest.mock('../../../utils/fetch.ts', () => ({
  customFetch: jest.fn(),
}))

describe('RemoveButton', () => {
  it('should render the RemoveButton component', () => {
    const { getByTestId } = render(
      <RemoveButton userId={mockUserId} token={mockToken} />,
    )
    expect(getByTestId('remove-button')).toBeInTheDocument()
  })

  it('should call the customFetch function when the form is submitted', async () => {
    const { getByTestId } = render(
      <RemoveButton userId={mockUserId} token={mockToken} />,
    )
    fireEvent.click(getByTestId('remove-button'))

    await waitFor(() => {
      expect(customFetch).toHaveBeenCalledWith({
        url: `${API_URL}/users/${mockUserId}`,
        method: 'DELETE',
        headers: {
          Cookie: `token=${mockToken}`,
        },
      })
    })
  })
})
