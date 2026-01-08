# Commit Message Guidelines

## Format Requirements

All commit messages must follow the Conventional Commits specification and comply with commitlint rules:

### Header Format

- **Maximum length**: 72 characters
- **Format**: `<type>(<scope>): <subject>`
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`
- **Scope** (optional): Feature or module name in parentheses (lowercase)
- **Subject**: Short description in imperative mood (lowercase, except for proper nouns like class/component names)

### Examples

```bash
feat: implement margin policy system with column storage
feat(margin): add margin calculation logic
fix(auth): resolve token expiration issue
refactor(api): improve error handling
```

### Body Format

- **Maximum line length**: 100 characters
- Use bullet points (`-`) for lists
- Wrap long lines appropriately
- Provide context and reasoning when needed

### Example with Body

```bash
feat: implement margin policy system with column storage

- Replace JSON marginsByCostType with individual columns
  (materialMargin, laborMargin, subcontractMargin, servicesMargin,
  managementMargin) in Prisma schema
- Add margin policy enums: CostType, MarginOverrideMode,
  MarginApplication
- Implement complete margin policy domain for companies and projects
- Add core margin calculation logic with inheritance/override rules
- Create comprehensive test coverage for all components
```

## Best Practices

1. **Be descriptive but concise**: The header should clearly describe what the commit does
2. **Use imperative mood**: "add feature" not "added feature" or "adds feature"
3. **Use lowercase**: All text should be lowercase except for proper nouns (class names, component names, etc.)
4. **Reference issues**: If applicable, reference issue numbers in the body
5. **Explain why, not what**: The code shows what changed; the commit message should explain why
6. **Keep related changes together**: One logical change per commit

## Validation

Commit messages are automatically validated using commitlint. Ensure your commits pass validation before pushing.
