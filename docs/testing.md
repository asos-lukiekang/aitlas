# Testing

This project uses Jest and React Testing Library for testing with a colocated test structure.

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch
```

## Test Structure

Tests are colocated with their relevant files:

```
src/
├── app/
│   ├── page.tsx
│   ├── page.test.tsx          # Tests for home page
│   └── reaction-time/
│       ├── page.tsx
│       └── page.test.tsx      # Tests for reaction time game page
```

## Current Test Coverage

- ✅ Home page renders correctly
- ✅ Navigation link to reaction time game exists
- ✅ Reaction time game page renders correctly
- ✅ Basic UI elements are present

## Testing Guidelines

- **Colocation**: Place test files next to the files they test (e.g., `component.tsx` → `component.test.tsx`)
- **Descriptive names**: Use test names that explain what is being tested
- **AAA pattern**: Follow Arrange, Act, Assert structure
- **User behavior**: Test user-facing behavior, not implementation details
- **Semantic queries**: Use `screen.getByRole()` and semantic queries when possible

## Test File Naming

- Component tests: `ComponentName.test.tsx`
- Page tests: `page.test.tsx`
- Utility tests: `utils.test.ts`
- Hook tests: `useHookName.test.ts`