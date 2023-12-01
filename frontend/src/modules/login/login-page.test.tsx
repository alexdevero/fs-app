import { fireEvent, render, waitFor } from '@testing-library/react'

import React from 'react'

import { API_URL } from '@/consts/env'
import { customFetch } from '@/utils/fetch'

import { LoginPage } from './login-page'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: () => null,
    }
  },
}))

jest.mock('../../utils/fetch.ts', () => ({
  customFetch: jest.fn(),
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: () => [null, jest.fn()],
}))

describe('LoginPage', () => {
  it('should render', async () => {
    const { getByTestId } = render(<LoginPage />)

    expect(getByTestId('login-form')).toBeInTheDocument()
  })

  it('should call customFetch with correct params', async () => {
    const { getByTestId } = render(<LoginPage />)

    const emailInput = getByTestId('login-email-input')
    const passwordInput = getByTestId('login-password-input')
    const submitButton = getByTestId('login-submit-button')

    fireEvent.change(emailInput, { target: { value: 'joedoe@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'secret' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(customFetch).toHaveBeenCalledWith({
        url: `${API_URL}/login`,
        method: 'POST',
        body: JSON.stringify({ email: 'joedoe@example.com', password: 'secret' }),
      })
    })
  })
})
