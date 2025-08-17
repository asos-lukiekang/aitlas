# UI Component Guidelines

## Component Design Principles

- Create reusable, composable components
- Follow single responsibility principle
- Use consistent prop naming conventions
- Implement proper TypeScript interfaces for props
- Support common variants and states

## Base Component Structure

```typescript
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const Component = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  ...props
}: ComponentProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Common UI Components to Create

- Button (with variants: primary, secondary, outline, ghost)
- Input (text, email, password, textarea)
- Card (with header, body, footer sections)
- Modal/Dialog
- Loading indicators
- Form components
- Navigation components

## Accessibility Guidelines

- Use semantic HTML elements
- Provide proper ARIA labels and roles
- Ensure keyboard navigation support
- Maintain proper color contrast ratios
- Support screen readers with descriptive text
- Implement focus management for interactive elements

## Component Documentation

- Document component props and usage examples
- Include visual examples of different variants
- Specify accessibility features
- Note any dependencies or requirements
