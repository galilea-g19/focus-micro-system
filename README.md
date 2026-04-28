**Languages:**

- 🇺🇸 English (default)
- 🇲🇽 [Español](./README.es.md)

[![English](https://img.shields.io/badge/lang-English-blue)](./README.md)
[![Español](https://img.shields.io/badge/lang-Español-green)](./README.es.md)

# focus-micro-system

5-minute focus companion for distracted developers - CLI tool with timer, progress bar and micro-interactions

## Installation

```bash
npm install -g focus-micro-system
```

### Use

```bash
focus                        # 5 minutes, task prompt
focus --minutes 10           # 10 minutes
focus --task "Revisar PRs"   # no question
focus --quiet                # only remainig time, no prompts
focus --no-progress          # text, no progress bas
focus --help                 # help
```

### Full commands

| Command                    | What it does                   |
| -------------------------- | ------------------------------ |
| Focus                      | 5 minutes, task prompt         |
| focus --minutes 10         | 10 minutes                     |
| focus --task "Revisar PRs" | no question                    |
| focus --quiet              | only remainig time, no prompts |
| focus --no-progress        | text, no progress bash         |
| focus --help               | help                           |

# Technologies

- TypeScript
- Node.js
- Chalk
- Commander
- CLI progress
- CLI nativo (without external dependencies)

# License

**MIT**
_Galilea Granados_

- GitHub: @galilea-g19
- LinkedIn: galileagranados

> Made with ❤️ for developers who need focus before a challenging task

> This README is also available in Spanish: [README.es.md](./README.es.md)
