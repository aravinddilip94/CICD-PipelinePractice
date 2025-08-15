import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'

test('login shows error for short password', async () => {
  render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>)
  fireEvent.change(screen.getByPlaceholderText(/you@example.com/i), { target: { value: 'a@b.com' } })
  fireEvent.change(screen.getByPlaceholderText(/At least 6 characters/i), { target: { value: '123' } })
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
  await new Promise(r => setTimeout(r, 300))
  expect(screen.getByText(/login failed|invalid credentialss/i)).toBeInTheDocument()
})
