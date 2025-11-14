# Fusion Angular Tailwind Starter

A production-ready Angular application template with TypeScript, TailwindCSS 3, and modern tooling.

## Tech Stack

- **Frontend**: Angular 20 + TypeScript + TailwindCSS 3.4.11
- **Styling**: TailwindCSS 3 with Typography Plugin + PostCSS + Autoprefixer
- **Testing**: Angular Testing Framework (Jasmine + Karma via `ng test`)
- **Build Tool**: Angular CLI with Vite
- **Package Manager**: npm

## Project Structure

```
src/                     # Angular application source
├── app/                 # Main application module
│   ├── app.html         # Main app template
│   ├── app.ts           # App component
│   ├── app.config.ts    # App configuration
│   ├── app.routes.ts    # Route definitions
│   └── app.spec.ts      # App component tests
├── styles.css           # Global styles with TailwindCSS imports
├── index.html           # Main HTML entry point
└── main.ts              # Application bootstrap

public/                  # Static assets
├── favicon.ico          # Site favicon
└── ...                  # Other static files
```

## Key Features

### Angular Standalone Components

The application uses Angular's modern standalone component architecture:

- Standalone components with self-contained dependencies
- Functional route guards and resolvers
- Minimal bundle size with tree-shaking

### Styling System

- **Primary**: TailwindCSS 3.4.11 utility classes
- **Typography**: `@tailwindcss/typography` plugin for rich text styling
- **PostCSS**: Autoprefixer for cross-browser compatibility
- **Configuration**: `tailwind.config.js` for custom theming

```typescript
// Example of TailwindCSS usage in Angular templates
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
  <div class="text-center">
    <h1 class="text-2xl font-semibold text-slate-800">Welcome to Fusion</h1>
  </div>
</div>
```

### Routing System

Angular Router with standalone route configuration:

```typescript
// app.routes.ts
import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", component: AppComponent },
  // Add more routes here
];
```

### Development Commands

```bash
npm start          # Start development server
npm run build      # Production build
npm run watch      # Build with watch mode
npm test          # Run Angular tests (ng test)
ng serve          # Alternative dev server command
```

## Adding Features

### New Components

1. Create component in `src/app/components/`:

```typescript
// my-component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-my-component",
  standalone: true,
  template: `
    <div class="p-4 bg-white rounded-lg shadow">
      <h2 class="text-xl font-bold text-gray-900">My Component</h2>
      <p class="text-gray-600">This is my new component.</p>
    </div>
  `,
})
export class MyComponent {}
```

2. Import in your app or other components:

```typescript
import { MyComponent } from "./components/my-component";
```

### New Routes

1. Create component in `src/app/pages/`:

```typescript
// pages/my-page.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-my-page",
  standalone: true,
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900">My Page</h1>
    </div>
  `,
})
export class MyPageComponent {}
```

2. Add route in `src/app/app.routes.ts`:

```typescript
import { MyPageComponent } from "./pages/my-page";

export const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "my-page", component: MyPageComponent },
  // Add more routes here
];
```

### Custom TailwindCSS Configuration

1. Update `tailwind.config.js` for custom theming:

```javascript
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#64748b",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
```

2. Add custom styles in `src/styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
}
```

## Production Deployment

- **Standard**: `npm run build` creates optimized production build
- **Development**: `npm start` for local development
- **Testing**: `npm test` runs Angular tests with Jasmine/Karma

## CSS and Styling Guidelines

### Component-Level Styling

**Every component must follow this CSS structure:**

1. **Component CSS Files** (`component.component.css`):
   - Add CSS specific to that component
   - Use `@apply` for component-specific classes
   - Add animations, transitions, and custom properties needed only by that component
   - Example:

```css
/* login.component.css */
:host {
  display: block;
}

/* Component-specific custom properties */
.form-input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
}

/* Animations only used in this component */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}
```

2. **Global Styles** (`src/styles.css`):
   - Add TailwindCSS imports
   - Add common styles used across multiple components
   - Add global theme variables
   - Add reusable component classes
   - Example:

```css
/* src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global theme variables */
:root {
  --color-primary-blue: #049ad0;
  --color-text-dark: #181c32;
}

/* Reusable component styles */
@layer components {
  .btn-primary {
    @apply px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors;
  }

  .form-group {
    @apply mb-6;
  }
}
```

### Template Styling

- **Use TailwindCSS utility classes** in templates as the primary styling approach
- Apply classes directly in HTML for layout, spacing, colors, etc.
- Only use component CSS files when:
  - Custom animations are needed
  - Component-specific logic is required
  - CSS variables or complex selectors are necessary
  - Responsive behavior needs media queries beyond Tailwind

### Styling Checklist

When creating or updating a component:

- ✅ Add component-specific CSS to the `.component.css` file
- ✅ Use Tailwind utility classes in the template for layout and styling
- ✅ Add global/reusable styles to `src/styles.css`
- ✅ Avoid inline styles; use utility classes or CSS files
- ✅ Use semantic CSS class names (e.g., `.form-input` not `.f-i`)
- ✅ Keep component CSS scoped to that component only

## Architecture Notes

- Angular 20 with standalone components
- TypeScript throughout the application
- TailwindCSS 3.4.11 for utility-first styling
- Typography plugin for rich text content
- PostCSS with Autoprefixer for cross-browser support
- Angular Testing Framework (Jasmine + Karma) for unit testing
- Angular CLI for development and build tooling
- Component-scoped CSS with global styles centralized in `src/styles.css`
