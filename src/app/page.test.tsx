import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home Page', () => {
  it('renders the home page', () => {
    render(<Home />)
    
    // Check that the Next.js logo is present
    const logo = screen.getByAltText('Next.js logo')
    expect(logo).toBeInTheDocument()
  })

  it('has a link to the reaction time game', () => {
    render(<Home />)
    
    // Check that the reaction time game link exists
    const gameLink = screen.getByRole('link', { name: /play reaction time game/i })
    expect(gameLink).toBeInTheDocument()
    expect(gameLink).toHaveAttribute('href', '/reaction-time')
  })

  it('displays the getting started instructions', () => {
    render(<Home />)
    
    // Check that basic instructions are present
    expect(screen.getByText(/get started by editing/i)).toBeInTheDocument()
    expect(screen.getByText('src/app/page.tsx')).toBeInTheDocument()
  })
})