const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth.routes')

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares globales
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor Auria funcionando' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

const { verificarToken, verificarAdmin } = require('./middlewares/auth.middleware')

// Ruta protegida de prueba
app.get('/api/perfil', verificarToken, (req, res) => {
  res.json({ mensaje: 'Ruta protegida', usuario: req.usuario })
})

// Ruta solo admin de prueba
app.get('/api/admin/test', verificarToken, verificarAdmin, (req, res) => {
  res.json({ mensaje: 'Ruta de admin', usuario: req.usuario })
})