const express = require('express')
const router = express.Router()
const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  editarProducto,
  eliminarProducto
} = require('../controllers/productos.controller')
const { verificarToken, verificarAdmin } = require('../middlewares/auth.middleware')

router.get('/', obtenerProductos)
router.get('/:id', obtenerProducto)
router.post('/', verificarToken, verificarAdmin, crearProducto)
router.put('/:id', verificarToken, verificarAdmin, editarProducto)
router.delete('/:id', verificarToken, verificarAdmin, eliminarProducto)

module.exports = router