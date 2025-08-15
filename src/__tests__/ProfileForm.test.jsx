import { render, screen } from '@testing-library/react'
import ProfileForm from '../pages/ProfileForm.jsx'

test('renders profile form headings', () => {
  render(<ProfileForm />)
  expect(screen.getByText(/Create Profile/i)).toBeInTheDocument()
  expect(screen.getByText(/Saved Profiles/i)).toBeInTheDocument()
})
