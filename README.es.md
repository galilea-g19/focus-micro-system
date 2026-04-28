**Languages:**

- 🇺🇸 English (default)
- 🇲🇽 [Español](./README.es.md)

[![English](https://img.shields.io/badge/lang-English-blue)](./README.md)
[![Español](https://img.shields.io/badge/lang-Español-green)](./README.es.md)

# focus-micro-system

5-minutos de compañero de enfoque para desarrolladores distraídos - Herramienta CLI con contador, barra de progreso y micro-interacciones

## Instalación

```bash
npm install -g focus-micro-system
```

### Uso

```bash
focus                        # 5 minutos, pregunta tarea
focus --minutes 10           # 10 minutos
focus --task "Revisar PRs"   # sin pregunta
focus --quiet                # solo tiempo restante, sin mensajes
focus --no-progress          # texto, sin barra
focus --help                 # ayuda

# Ejemplo
node dist/index.js --minutes 1 --task "Probar colores" --color mint
```

### Full commands

| Command                    | What it does                       |
| -------------------------- | ---------------------------------- |
| Focus                      | 5 minutos, pregunta tarea          |
| focus --minutes 10         | 10 minutos                         |
| focus --task "Revisar PRs" | sin pregunta                       |
| focus --quiet              | solo tiempo restante, sin mensajes |
| focus --no-progress        | texto, sin barra                   |
| focus --help               | ayuda                              |

# Tecnologías

- TypeScript
- Node.js
- Chalk
- Commander
- CLI progress
- CLI nativo (sin dependencias externas)

# Licencia

**MIT**
_Galilea Granados_

- GitHub: @galilea-g19
- LinkedIn: galileagranados

> Hecho con ❤️ para desarrolladores quienes necesitan enfocarse antes de una tarea retadora
