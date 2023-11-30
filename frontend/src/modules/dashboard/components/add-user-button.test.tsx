import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { customFetch } from '@/utils/fetch'
import { API_URL } from '@/consts/env'

import { AddUserButton } from './add-user-button'

jest.mock('../../../utils/fetch.ts', () => ({
  customFetch: jest.fn(),
}))

describe('AddUserButton', () => {
  it('should render the AddUserButton component', () => {
    const { getByTestId } = render(<AddUserButton />)
    expect(getByTestId('add-modal-trigger')).toBeInTheDocument()
  })

  it('should call the customFetch function when the form is submitted', async () => {
    const { getByTestId } = render(<AddUserButton />)
    fireEvent.click(getByTestId('add-modal-trigger'))

    const nameInput = getByTestId('add-modal-name')
    const emailInput = getByTestId('add-modal-email')
    const passwordInput = getByTestId('add-modal-password')

    fireEvent.change(nameInput, { target: { value: 'New Name' } })
    fireEvent.change(emailInput, { target: { value: 'new.email@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'secret_password' } })

    fireEvent.click(getByTestId('add-modal-submit-button'))

    await waitFor(() => {
      expect(customFetch).toHaveBeenCalledWith({
        url: `${API_URL}/register`,
        method: 'POST',
        body: JSON.stringify({
          email: 'new.email@email.com',
          name: 'New Name',
          password: 'secret_password',
        }),
      })
    })
  })
})
