import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { customFetch } from '@/utils/fetch'
import { API_URL } from '@/consts/env'

import { EditUserButton } from './edit-user-button'

const mockToken = 'mockToken'

const mockedUser = {
  id: 'mock_id',
  name: 'Old Name',
  email: 'old.email@example.com',
}

// Mock the customFetch function
jest.mock('../../../utils/fetch.ts', () => ({
  customFetch: jest.fn(),
}))

describe('EditUserButton', () => {
  it('should render the EditUserButton component', () => {
    const { getByText } = render(
      <EditUserButton
        token={mockToken}
        userId={mockedUser.id}
        userName={mockedUser.name}
        userEmail={mockedUser.email}
      />,
    )
    expect(getByText('Edit')).toBeInTheDocument()
  })

  it('should call the customFetch function when the form is submitted', async () => {
    const { getByTestId } = render(
      <EditUserButton
        token={mockToken}
        userId={mockedUser.id}
        userName={mockedUser.name}
        userEmail={mockedUser.email}
      />,
    )
    fireEvent.click(getByTestId('edit-modal-trigger'))

    const nameInput = getByTestId('edit-modal-name')
    const emailInput = getByTestId('edit-modal-email')

    fireEvent.change(nameInput, { target: { value: 'New Name' } })
    fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } })

    fireEvent.click(getByTestId('edit-modal-submit-button'))

    await waitFor(() => {
      expect(customFetch).toHaveBeenCalledWith({
        url: `${API_URL}/users/${mockedUser.id}`,
        method: 'PUT',
        headers: {
          Cookie: `token=${mockToken}`,
        },
        body: JSON.stringify({ email: 'newemail@example.com', name: 'New Name' }),
      })
    })
  })
})
