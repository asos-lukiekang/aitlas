# Development Workflow

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Working with Users - Execution Guidelines

- **Do exactly what is asked, then stop** - Don't anticipate next steps unless explicitly requested
- **Break work into small chunks** - When users say "first" or indicate incremental work, respect those boundaries
- **Ask before proceeding** - After completing a specific request, ask if the user wants to continue or review
- **Pay attention to scope indicators** - Words like "first", "just", "only", "start with" indicate limited scope
- **Confirm understanding** - If a request seems to have multiple parts, clarify which part to focus on

## Code Quality

- **Always run linting before committing code** - Use `npm run lint` to check for issues
- **Fix minor linting issues automatically** - Address warnings about unused imports, formatting, etc.
- **Resolve all TypeScript errors** - Never commit code with TypeScript compilation errors
- **Use consistent formatting** - Follow established code style patterns
- **Write meaningful commit messages** - Describe what changed and why

### Pre-Commit Checklist

1. Run `npm run lint` and fix any issues
2. Run `npm test` to ensure all tests pass
3. Fix any TypeScript compilation errors
4. Remove unused imports and variables
5. Ensure consistent code formatting

## Feature Development Process

1. **Planning**: Create or update spec documents in `.kiro/specs/`
2. **Implementation**: Follow the task list from specs
3. **Testing**: Write and run tests for new functionality
4. **Review**: Ensure code follows established patterns
5. **Integration**: Test feature integration with existing code

## Error Handling

- Implement proper error boundaries in React
- Use try-catch blocks for async operations
- Provide meaningful error messages to users
- Log errors appropriately for debugging

## Performance Monitoring

- Monitor bundle size and loading performance
- Use Next.js built-in analytics when available
- Optimize images and assets
- Implement proper caching strategies

## Security Considerations

- Validate all user inputs
- Use environment variables for sensitive data
- Implement proper authentication and authorization
- Follow Next.js security best practices
- Keep dependencies updated
