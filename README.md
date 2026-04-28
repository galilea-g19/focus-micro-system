**Languages:**  
- 🇺🇸 English (default)  
- 🇲🇽 [Español](./README.es.md)
  
[![English](https://img.shields.io/badge/lang-English-blue)](./README.md)
[![Español](https://img.shields.io/badge/lang-Español-green)](./README.es.md)

# focus-micro-system
5-minute focus companion for distracted developers - CLI tool with timer, progress bar and micro-interactions

## Instalación
``` bash
npm install -g focus-micro-system
```
### Uso
``` bash
focus                        # 5 minutos, pregunta tarea
focus --minutes 10           # 10 minutos
focus --task "Revisar PRs"   # sin pregunta
focus --quiet                # solo tiempo restante, sin mensajes
focus --no-progress          # texto, sin barra
focus --help                 # ayuda
```

### Full commands

| Command                     | What it does                           |
| ----------------------------| -------------------------------------- |
| Focus                       | 5 minutos, pregunta tarea              |
| focus --minutes 10          | 10 minutos                             |
| focus --task "Revisar PRs"  | sin pregunta                           |
| focus --quiet               | solo tiempo restante, sin mensajes     |
| focus --no-progress         | texto, sin barra                       |
| focus --help                | ayuda                                  |


# Technologies

- TypeScript
- Node.js
- Chalk
- Commander
- CLI progress
- CLI nativo (sin dependencias externas)


# License

**MIT**
_Galilea Granados_

- GitHub: @galilea-g19
- LinkedIn: galileagranados

> Made with ❤️ for developers who need focus before a challenging task

> This README is also available in Spanish: [README.es.md](./README.es.md)
