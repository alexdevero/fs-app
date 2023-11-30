import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { API_URL } from '@/consts/env'
import { customFetch } from '@/utils/fetch'
import { resolvedComponent } from '@/utils/tests'

import { SignUpPage } from './sign-up-page'

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

describe('SignUpPage', () => {
  it('should render', async () => {
    const SignUpPageResolved = await resolvedComponent(SignUpPage, {})
    const { getByTestId } = render(<SignUpPageResolved />)

    expect(getByTestId('sign-up-form')).toBeInTheDocument()
  })

  it('should call customFetch with correct params', async () => {
    const SignUpPageResolved = await resolvedComponent(SignUpPage, {})
    const { getByTestId } = render(<SignUpPageResolved />)

    const nameInput = getByTestId('sign-up-name-input')
    const emailInput = getByTestId('sign-up-email-input')
    const passwordInput = getByTestId('sign-up-password-input')
    const submitButton = getByTestId('sign-up-submit-button')

    fireEvent.change(nameInput, { target: { value: 'Joe Doe' } })
    fireEvent.change(emailInput, { target: { value: 'joedoe@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'secret' } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(customFetch).toHaveBeenCalledWith({
        url: `${API_URL}/register`,
        method: 'POST',
        body: JSON.stringify({
          email: 'joedoe@example.com',
          name: 'Joe Doe',
          password: 'secret',
        }),
      })
    })
  })
})
