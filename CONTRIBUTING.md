# Contributing to Tiki Village

Thank you for considering contributing to the Tiki Village e-commerce platform! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment
- Report any inappropriate behavior

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

### 2. Make Changes

Follow our coding standards:

#### TypeScript
- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Export types when reusable

#### React Components
- Use functional components with hooks
- Keep components small and focused
- Use meaningful component names
- Add JSDoc comments for complex logic

#### Styling
- Use Tailwind CSS utility classes
- Follow existing color scheme
- Ensure responsive design
- Test on multiple screen sizes

#### File Organization
```
src/
├── components/
│   ├── layout/      # Layout components (Header, Footer)
│   ├── ui/          # Reusable UI components
│   ├── booking/     # Booking-specific components
│   └── forms/       # Form components
├── lib/
│   ├── utils.ts     # Utility functions
│   ├── types.ts     # Type definitions
│   └── payzen.ts    # Payment integration
└── collections/     # Payload collections
```

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Build the project
npm run build

# Test in development
npm run dev
```

**Manual Testing Checklist:**
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test all affected pages
- [ ] Test form validation
- [ ] Test error handling
- [ ] Check console for errors
- [ ] Verify no TypeScript errors

### 4. Commit Your Changes

Use clear, descriptive commit messages:

```bash
git commit -m "feat: add booking calendar component"
git commit -m "fix: resolve payment webhook error"
git commit -m "docs: update deployment guide"
```

**Commit Message Format:**
```
<type>: <subject>

<body> (optional)

<footer> (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Create a Pull Request with:
- Clear title describing the change
- Description of what changed and why
- Screenshots for UI changes
- Link to related issues

## Coding Standards

### JavaScript/TypeScript

```typescript
// Good
export function calculateTotal(
  price: number,
  quantity: number
): number {
  return price * quantity
}

// Bad
export function calc(p, q) {
  return p * q
}
```

### React Components

```typescript
// Good
interface ProductCardProps {
  name: string
  price: number
  onSelect: () => void
}

export default function ProductCard({ 
  name, 
  price, 
  onSelect 
}: ProductCardProps) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{formatPrice(price)}</p>
      <button onClick={onSelect}>Select</button>
    </div>
  )
}

// Bad
export default function Card(props) {
  return <div>{props.name}</div>
}
```

### Tailwind CSS

```tsx
// Good - Use semantic class combinations
<button className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90">
  Click me
</button>

// Bad - Inconsistent spacing
<button className="bg-blue-400 text-white p-2">
  Click me
</button>
```

## What to Contribute

### High Priority
- Bug fixes
- Performance improvements
- Security enhancements
- Documentation improvements
- Accessibility improvements
- Test coverage

### Feature Additions
Before adding new features:
1. Check existing issues
2. Discuss in an issue first
3. Get approval from maintainers
4. Follow existing patterns

### Good First Issues
Look for issues labeled:
- `good-first-issue`
- `help-wanted`
- `documentation`

## Payload CMS Guidelines

### Collections
- Follow existing collection patterns
- Add proper access control
- Include localized fields when appropriate
- Add helpful admin descriptions

### Fields
```typescript
// Good
{
  name: 'price',
  type: 'number',
  required: true,
  admin: {
    description: 'Price in XPF (Franc Pacifique)',
  },
}

// Bad
{
  name: 'price',
  type: 'number',
}
```

## Testing Guidelines

### Manual Testing
- Test all user flows
- Verify responsive design
- Check accessibility
- Test error states
- Verify translations

### Writing Tests (Future)
When test infrastructure is added:
```typescript
describe('BookingCalendar', () => {
  it('should disable past dates', () => {
    // Test implementation
  })
  
  it('should highlight selected date', () => {
    // Test implementation
  })
})
```

## Documentation

### Code Comments
```typescript
/**
 * Calculate the total price for a booking including extras
 * @param basePrice - Base price per adult
 * @param adults - Number of adult participants
 * @param children - Number of child participants
 * @param childPrice - Price per child
 * @param extras - Array of selected extras
 * @returns Total price in XPF
 */
export function calculateBookingTotal(
  basePrice: number,
  adults: number,
  children: number,
  childPrice: number,
  extras: Array<{ price: number; quantity: number }>
): number {
  // Implementation
}
```

### README Updates
Update documentation when:
- Adding new features
- Changing configuration
- Updating dependencies
- Adding new environment variables

## Pull Request Process

1. **Update Documentation**
   - Update README if needed
   - Add/update code comments
   - Update CHANGELOG if applicable

2. **Self Review**
   - Review your own changes
   - Check for console.logs
   - Remove commented code
   - Verify formatting

3. **Request Review**
   - Tag relevant reviewers
   - Respond to feedback promptly
   - Make requested changes

4. **Merge Requirements**
   - All tests pass
   - Code review approved
   - No merge conflicts
   - Documentation updated

## Questions?

- Open an issue for discussion
- Check existing documentation
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Tiki Village! 🌺
