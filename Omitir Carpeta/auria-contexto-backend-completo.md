# Auria — Contexto del Proyecto para continuar en nuevo chat

## Qué es Auria
Catálogo digital de prendas artesanales de baby alpaca para la marca de Edith (tía de Fla).
Tiene panel de administrador (Edith) y panel de cliente. Sin pagos en línea — el cierre de venta ocurre por WhatsApp.

---

## Estado actual del proyecto

### Backend — COMPLETO
Ubicación: `D:\Flavio\2026\Claude Code Proyectos\auria-web\auria-backend`
Servidor corriendo en: `http://localhost:3000`
Comando para iniciar: `npm run dev` (desde la carpeta auria-backend)

**Módulos implementados y probados:**
- Autenticación: registro y login con JWT + bcrypt (`/api/auth/`)
- Productos: CRUD completo (`/api/productos/`)
- Categorías: CRUD completo (`/api/categorias/`)
- Favoritos: agregar, ver, eliminar (`/api/favoritos/`)
- Pedidos personalizados: crear y gestionar (`/api/pedidos/`)
- Ranking admin: productos con más favoritos (`/api/admin/favoritos-ranking`)

**Middlewares implementados:**
- `verificarToken` — verifica JWT en header Authorization
- `verificarAdmin` — verifica que el rol sea admin

**Stack backend:**
- Node.js v22 + Express
- PostgreSQL 17 (base de datos: `auria_db`)
- Prisma 7 ORM (con adapter PrismaPg — Prisma 7 requiere esto)
- JWT + bcrypt
- Bruno como cliente HTTP para pruebas (reemplazó Thunder Client)

**Notas críticas de Prisma 7:**
- La URL de BD va en `prisma.config.ts` bajo `datasource.url`, NO en schema.prisma
- El seed va bajo `migrations.seed` en `prisma.config.ts`
- El cliente Prisma requiere adapter: `new PrismaClient({ adapter: new PrismaPg(pool) })`
- Ver `src/lib/prisma.js` para el patrón correcto

**Credenciales de prueba:**
- Admin: `edith@auria.com` / `admin123`
- Cliente: `test@gmail.com` / `123456`

**Variables de entorno (.env):**
```
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/auria_db"
JWT_SECRET=auria_secret_key_2025
WHATSAPP_NUMBER=51999999999
```

---

### Frontend — PENDIENTE
Ubicación: `D:\Flavio\2026\Claude Code Proyectos\auria-web\auria-frontend`
Stack: React 19 + Vite + Tailwind CSS v3 + Lucide React
Estado: carpeta creada con `npm create vite@latest`, sin desarrollo aún

**Plan para el frontend:**
1. Instalar dependencias: `npm install axios lucide-react`
2. Configurar Tailwind CSS v3
3. Cargar fuentes Ananda y Coolvetica desde `/src/assets/fonts/`
4. Usar Claude Code con el CLAUDE.md del proyecto para generar el scaffold visual
5. Conectar al backend con axios desde `services/api.js`

---

## Estructura de carpetas del proyecto

```
auria-web/
├── CLAUDE.md                    ← Brief completo del proyecto para Claude Code
├── logo-auria-simple.jpg
├── tipografias/                 ← Fuentes Ananda y Coolvetica descargadas
├── auria-backend/
│   ├── src/
│   │   ├── index.js             ← Servidor Express, middlewares globales, rutas
│   │   ├── routes/              ← auth, productos, categorias, favoritos, pedidos, admin
│   │   ├── controllers/         ← lógica de cada módulo
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   └── lib/
│   │       └── prisma.js        ← instancia singleton de Prisma con adapter
│   ├── prisma/
│   │   ├── schema.prisma        ← tablas: Usuario, Categoria, Producto, Talla,
│   │   │                           ProductoTalla, ImagenProducto, Favorito,
│   │   │                           PedidoPersonalizado
│   │   └── seed.js
│   ├── prisma.config.ts
│   └── .env
└── auria-frontend/
    └── (sin desarrollar)
```

---

## Paleta de colores (para el frontend)

| Token | Hex | Uso |
|-------|-----|-----|
| negro | `#2B2B2B` | Texto principal, fondo navbar |
| blanco | `#F7F7F7` | Fondo general |
| hueso | `#EBE8DD` | Fondos alternos, cards |
| uva | `#46395E` | Botones primarios, acentos |
| dorado | `#F2CD66` | Detalles, hover states |

Tipografía: Ananda (display/marca) + Coolvetica (UI/cuerpo)
Fallbacks: Playfair Display + Inter

---

## Referencias de diseño
- Home: estructura de anntarah.com (hero full-width, categorías en círculos, grid de productos)
- Detalle de producto: estructura de kunastores.com (imagen izquierda grande + info derecha)
- Wireframe: hero + sección categorías círculos + grid 4 columnas + banner encargos

---

## Páginas del frontend a construir

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/` | Home: hero, categorías, productos destacados, banner encargos | Público |
| `/catalogo` | Grid de productos con filtro por categoría | Público |
| `/producto/:id` | Detalle: galería, tallas, favorito, agregar a cotización | Público |
| `/cotizacion` | Resumen + nombre/tel + botón WhatsApp | Público |
| `/encargo` | Formulario de pedido personalizado | Público |
| `/login` | Inicio de sesión | Público |
| `/registro` | Crear cuenta | Público |
| `/favoritos` | Lista de productos guardados | Autenticado |
| `/admin/*` | Panel admin con sidebar | Solo admin |

---

## Contexto de aprendizaje
- Fla es el desarrollador, nivel intermedio, aprendiendo backend en la práctica
- Claude actúa como profesor/mentor de arquitectura de software
- Se explican los conceptos al construir, no solo se da el código
- Documentos generados: Especificación del proyecto + Guía de Referencia Backend
- Repositorio en GitHub (privado): auria-web
- Entorno: Windows + PowerShell (usar New-Item en vez de touch, mkdir separado)
- Herramienta de pruebas API: Bruno (Thunder Client tuvo problemas)

---

## Próximos pasos (en orden)

1. Abrir chat nuevo
2. Instalar dependencias del frontend y configurar Tailwind
3. Copiar fuentes a `/src/assets/fonts/` y configurarlas en CSS
4. Usar Claude Code con CLAUDE.md para generar scaffold visual
5. Revisar y corregir el scaffold generado
6. Conectar frontend al backend módulo por módulo
7. Integrar Cloudinary para subida de imágenes en el admin
8. Pruebas finales de flujo completo
