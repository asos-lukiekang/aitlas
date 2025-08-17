import { render, screen } from '@testing-library/react'
import ReactionTimePage from './page'

describe('Reaction Time Game Page', () => {
  it('renders the reaction time game page', () => {
    render(<ReactionTimePage />)
    
    // Check that the main heading is present
    const heading = screen.getByRole('heading', { name: /reaction time game/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays the game description', () => {
    render(<ReactionTimePage />)
    
    // Check that the description text is present
    expect(screen.getByText(/test how quickly you can react to visual changes/i)).toBeInTheDocument()
    expect(screen.getByText(/click as fast as you can when the screen turns green/i)).toBeInTheDocument()
  })

  it('has a start game button', () => {
    render(<ReactionTimePage />)
    
    // Check that the start button exists
    const startButton = screen.getByRole('button', { name: /start game/i })
    expect(startButton).toBeInTheDocument()
  })

  it('displays helpful context about reaction times', () => {
    render(<ReactionTimePage />)
    
    // Check that context about average reaction time is shown
    expect(screen.getByText(/average human reaction time is 200-300ms/i)).toBeInTheDocument()
  })

  it('has a placeholder game area', () => {
    render(<ReactionTimePage />)
    
    // Check that the game area placeholder is present
    expect(screen.getByText(/game will be implemented here/i)).toBeInTheDocument()
  })
})