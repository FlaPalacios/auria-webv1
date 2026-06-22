# AURIA — Project Brief

Catálogo digital de prendas artesanales de baby alpaca. Web con panel de cliente y panel de administrador. Sin pagos en línea — el cierre de venta ocurre por WhatsApp.

---

## Stack

- **Frontend:** React 19 + Vite + Tailwind CSS v3
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL 17 + Prisma ORM
- **Auth:** JWT + bcrypt
- **Imágenes:** Cloudinary (URL guardada en BD, nunca el archivo)
- **Icons:** Lucide React

---

## Paleta

| Token | Hex | Uso |
|-------|-----|-----|
| `negro` | `#2B2B2B` | Texto principal, fondo navbar |
| `blanco` | `#F7F7F7` | Fondo general de página |
| `hueso` | `#EBE8DD` | Fondo de secciones alternas, cards |
| `uva` | `#46395E` | Acentos, botones primarios, badges |
| `dorado` | `#F2CD66` | Detalles, hover states, íconos destacados |

---

## Tipografía
- **Display / marca:** `Ananda Personal Use` — archivo: `Ananda Personal Use.ttf`
- **UI / cuerpo:** `Coolvetica Rg Cond` — archivo: `Coolvetica Rg Cond.otf`
- Si las fuentes no cargan, fallback: `'Playfair Display'` para display y `'Inter'` para UI
- Ambas fuentes están en `/src/assets/fonts/`

---

## Layout y estructura de páginas

### Navbar
- Logo "AURIA" izquierda en Ananda
- Links centro: Catálogo, Encargos, Nosotros
- Derecha: ícono favoritos, ícono usuario, ícono cotización (badge con cantidad)
- Fondo negro `#2B2B2B`, texto blanco
- Sticky en scroll

### Home (`/`)
- **Hero:** imagen full-width con overlay oscuro, texto encima centrado, botón CTA
- **Categorías:** fila de círculos con nombre debajo (referencia: wireframe — Suéteres, Accesorios, Mantas, Encargos)
- **Productos destacados:** grid 4 columnas, cards con imagen, nombre, precio condicional
- **Banner encargos:** sección con fondo `hueso`, texto sobre pedidos personalizados y botón

### Catálogo (`/catalogo`)
- Filtro por categoría en la parte superior (tabs o pills)
- Grid de productos responsive: 4 cols desktop, 2 cols móvil
- Card: imagen, nombre, categoría, precio (si `precio_visible = true`)

### Detalle de producto (`/producto/:id`)
- Referencia de estructura: kunastores.com/products/guantes-paolo-de-baby-alpaca-color-gris
- Izquierda: imagen principal grande + miniaturas debajo
- Derecha: badge categoría, nombre, descripción, tallas disponibles (selector), precio condicional, botón "Agregar a cotización", botón favorito
- Abajo: sección "También te puede interesar" con productos de la misma categoría

### Cotización (`/cotizacion`)
- Lista de productos seleccionados
- Campo nombre y número de teléfono
- Botón verde WhatsApp que abre `wa.me/` con mensaje pre-armado
- El carrito vive en React Context (no en BD)

### Encargos / Pedido personalizado (`/encargo`)
- Formulario: nombre, teléfono, descripción del pedido (color, diseño, tipo de prenda)
- Se guarda en BD
- Confirmación visual al enviar

### Auth (`/login`, `/registro`)
- Formularios simples, estética limpia
- Campos mínimos: nombre de usuario, correo, contraseña

### Favoritos (`/favoritos`)
- Solo para usuarios autenticados
- Grid de productos guardados, botón para quitar

### Panel Admin (`/admin/*`)
- Ruta protegida por rol `admin`
- Sidebar izquierdo con navegación interna
- Secciones: Productos, Categorías, Pedidos personalizados, Ranking favoritos

---

## Convenciones de código

### Frontend
- Componentes en `PascalCase`, archivos `.jsx`
- Carpetas: `components/`, `pages/`, `hooks/`, `context/`, `services/`, `assets/`
- Llamadas a la API centralizadas en `services/api.js` usando axios
- Context de Auth en `context/AuthContext.jsx`
- Context de Cotización en `context/CotizacionContext.jsx`

### Backend
- Estructura: `routes/`, `controllers/`, `middlewares/`, `prisma/`
- Cada módulo tiene su propio archivo de rutas y controlador
- Variables de entorno en `.env` (nunca hardcodeadas)
- Errores siempre devueltos como `{ error: "mensaje" }` con el status HTTP correcto

### Variables de entorno necesarias (.env backend)
```
DATABASE_URL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
WHATSAPP_NUMBER=
```

---

## Flujo de cotización (sin BD)

1. Usuario agrega productos desde el catálogo — se guardan en `CotizacionContext`
2. En `/cotizacion` ve el resumen y completa nombre + teléfono
3. Al confirmar se genera: `wa.me/{WHATSAPP_NUMBER}?text=...` con los productos listados
4. Se abre WhatsApp Web en nueva pestaña

---

## Roles

| Rol | Acceso |
|-----|--------|
| `visitante` | Catálogo, detalle, cotización, encargo |
| `cliente` | Todo lo anterior + favoritos |
| `admin` | Todo + panel de administración |

---

## Notas importantes

- No revises la carpeta llamada "Omitir Carpeta"
- `precio_visible = false` mostrar "Consultar por WhatsApp" en lugar del precio
- Imágenes: solo se guarda la URL de Cloudinary en BD, nunca el archivo
- El número de WhatsApp de Edith va en variable de entorno, nunca en el código
- Categorías por defecto al inicializar: Ponchos, Chompas, Gorritos
- El usuario admin inicial se crea desde el seed de Prisma
