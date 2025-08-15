import { render } from '@testing-library/react'
import SineWave from '../pages/SineWave.jsx'

test('renders sine chart canvas', () => {
  render(<SineWave />)
  const canvases = document.getElementsByTagName('canvas')
  expect(canvases.length).toBeGreaterThan(0)
})
