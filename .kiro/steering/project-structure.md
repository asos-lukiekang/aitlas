# Project Structure Guidelines

## Directory Structure

Follow this recommended structure for the Next.js App Router project:

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── (auth)/            # Route groups for organization
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components (buttons, inputs, etc.)
│   └── features/         # Feature-specific components
├── lib/                  # Utility functions and configurations
│   ├── utils.ts          # General utilities
│   ├── constants.ts      # Application constants
│   └── types.ts          # Shared TypeScript types
├── hooks/                # Custom React hooks
├── stores/               # State management (if needed)
└── styles/               # Additional styling files
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: lowercase with hyphens (e.g., `user-settings/page.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase for interfaces/types (e.g., `UserData.ts`)
- **Constants**: UPPER_SNAKE_CASE for constants (e.g., `API_ENDPOINTS.ts`)

## Import Organization

Order imports in this sequence:
1. React and Next.js imports
2. Third-party library imports
3. Internal imports (components, utils, types)
4. Relative imports

```typescript
import React from 'react'
import { NextPage } from 'next'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import './styles.css'
```

## Component Structure

- Keep components focused and single-purpose
- Use composition over inheritance
- Extract complex logic into custom hooks
- Separate presentational and container components when beneficial