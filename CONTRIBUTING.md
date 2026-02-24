# Contributing to growth-quiz-engine

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/your-username/growth-quiz-engine.git
cd growth-quiz-engine
npm install
npm run dev
```

## Making Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes
4. Ensure the build passes: `npm run build`
5. Commit with conventional commits: `git commit -m "feat: add new question type"`
6. Push and open a Pull Request

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `refactor:` — Code change that neither fixes a bug nor adds a feature
- `docs:` — Documentation only
- `test:` — Adding or updating tests
- `chore:` — Maintenance tasks

## Code Style

- TypeScript strict mode
- Functional components with hooks
- Immutable patterns (no mutation)
- Files under 400 lines (800 max)
- Functions under 50 lines
- No `console.log` in production code

## Project Structure

- `src/lib/` — Business logic (scoring, questions, results)
- `src/pages/` — Screen components
- `src/components/` — Reusable UI components
- `src/types/` — TypeScript type definitions
- `src/context/` — React Context providers
- `src/hooks/` — Custom React hooks

## Adding Questions

1. Define the question in `src/lib/questions.ts`
2. Add the corresponding type in `src/types/index.ts`
3. Add the screen ID to the `ScreenId` type and `QUIZ_STEPS` array
4. Create a page component in `src/pages/`
5. Register it in `src/router/index.tsx`

## Reporting Issues

Open an issue with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/OS info

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
