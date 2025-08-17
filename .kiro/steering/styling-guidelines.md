# Styling Guidelines

## Tailwind CSS Best Practices

- Use Tailwind utility classes for styling
- Prefer utility classes over custom CSS when possible
- Use consistent spacing scale (4, 8, 12, 16, 24, 32, etc.)
- Leverage Tailwind's responsive design utilities
- Use semantic color names and maintain consistent color palette

## CSS Organization

- Keep custom CSS minimal and well-organized
- Use CSS modules for component-specific styles when needed
- Group related styles together
- Use meaningful class names that describe purpose, not appearance

## Responsive Design

- Follow mobile-first approach
- Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
- Test on multiple screen sizes
- Ensure touch-friendly interface elements (minimum 44px touch targets)

## Component Styling Patterns

```typescript
// Good: Organized utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
  <h2 className="text-lg font-semibold text-gray-900">Title</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
    Action
  </button>
</div>

// Consider extracting to component when classes become too long
const Card = ({ children, className = "" }) => (
  <div className={`p-6 bg-white rounded-lg shadow-sm border ${className}`}>
    {children}
  </div>
)
```

## Design System Approach

- Create reusable UI components with consistent styling
- Define standard spacing, typography, and color scales
- Use design tokens for consistent theming
- Document component variants and usage patterns