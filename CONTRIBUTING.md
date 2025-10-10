# Contributing to OneWords

First off, thank you for considering contributing to OneWords! It's people like you that make OneWords such a great tool for SSC CGL aspirants.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots if applicable**
- **Specify your environment** (OS, browser, Node.js version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **A clear and descriptive title**
- **A detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** following the coding standards
4. **Add or update tests** if applicable
5. **Ensure all tests pass**:
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```
6. **Commit your changes** using conventional commits:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Create a Pull Request**

## Development Setup

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/onewords.git
   cd onewords
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Copy environment file**:
   ```bash
   cp .env.example .env
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## Coding Standards

### TypeScript
- Use TypeScript for all new files
- Follow strict TypeScript configuration
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary

### React
- Use functional components with hooks
- Follow React best practices
- Use proper component naming (PascalCase)
- Keep components focused and reusable

### Styling
- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS custom properties for theme values

### Code Organization
- Follow the established folder structure
- Use absolute imports with `@/` prefix
- Keep files focused on single responsibility
- Use meaningful file and variable names

### Git Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding or updating tests
- `chore:` maintenance tasks

Example: `feat: add question timer functionality`

## Testing

- Write tests for new features
- Update tests when modifying existing code
- Ensure all tests pass before submitting PR
- Aim for meaningful test coverage

## Documentation

- Update README.md if your changes affect setup or usage
- Add inline comments for complex logic
- Update TypeScript interfaces and types
- Document new components and functions

## Questions?

Feel free to open an issue for any questions or clarifications needed. We're here to help!

## Recognition

Contributors will be recognized in our README file and release notes.

Thank you for contributing to OneWords! 🎯