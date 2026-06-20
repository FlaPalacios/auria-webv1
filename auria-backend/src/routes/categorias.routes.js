const express = require('express')
const router = express.Router()
const {
  obtenerCategorias,
  crearCategoria,
  editarCategoria,
  eliminarCategoria
} = require('../controllers/categorias.controller')
const { verificarToken, verificarAdmin } = require('../middlewares/auth.middleware')

router.get('/', obtenerCategorias)
router.post('/', verificarToken, verificarAdmin, crearCategoria)
router.put('/:id', verificarToken, verificarAdmin, editarCategoria)
router.delete('/:id', verificarToken, verificarAdmin, eliminarCategoria)

module.exports = router