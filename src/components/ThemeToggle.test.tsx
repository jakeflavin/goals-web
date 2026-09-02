import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderPage } from '../test/render'
import { ThemeToggle } from './ThemeToggle'

describe('the scheme toggle', () => {
  it('says which of the two is on', () => {
    renderPage(<ThemeToggle mode="dark" onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Dark' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Light' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('asks for the other one', async () => {
    const chosen: string[] = []
    renderPage(<ThemeToggle mode="dark" onChange={(mode) => chosen.push(mode)} />)
    await userEvent.click(screen.getByRole('button', { name: 'Light' }))
    expect(chosen).toEqual(['light'])
  })
})
