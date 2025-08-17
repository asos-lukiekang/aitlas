# Coding Standards

## General Principles

- Write clean, readable, and maintainable code
- Follow TypeScript best practices and leverage type safety
- Prioritize code clarity over cleverness
- Use meaningful variable and function names
- Keep functions small and focused on a single responsibility
- Write self-documenting code with clear intent

## TypeScript Guidelines

- Always use TypeScript for all new files
- Define proper types and interfaces instead of using `any`
- Use strict TypeScript configuration
- Leverage union types, generics, and utility types appropriately
- Export types and interfaces for reusability
- Use `const assertions` where appropriate

## React/Next.js Best Practices

- Use functional components with hooks
- Prefer server components when possible (App Router)
- Use client components only when necessary (interactivity, browser APIs)
- Follow Next.js App Router conventions for file structure
- Use proper error boundaries for error handling
- Implement proper loading states and error states
- Use Next.js built-in optimizations (Image, Link, etc.)

## Code Organization

- Group related files in feature-based directories
- Use barrel exports (index.ts) for clean imports
- Separate business logic from UI components
- Create reusable utility functions and custom hooks
- Use consistent file naming conventions (kebab-case for files, PascalCase for components)

## Performance Considerations

- Implement proper code splitting and lazy loading
- Use React.memo() judiciously for expensive components
- Optimize images with Next.js Image component
- Minimize bundle size by avoiding unnecessary dependencies
- Use proper caching strategies

## Testing Approach

- Write unit tests for utility functions and business logic
- Create integration tests for critical user flows
- Use meaningful test descriptions
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies appropriately
- Place test files next to their relevant source files (e.g., `component.tsx` → `component.test.tsx`)
- Use React Testing Library for component testing
- Focus on testing user behavior, not implementation details
- Use semantic queries (`getByRole`, `getByLabelText`) over implementation details
- Test file naming: `ComponentName.test.tsx`, `page.test.tsx`, `utils.test.ts`

### Test Commands

- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode

See [Testing Documentation](../docs/testing.md) for detailed guidelines.
