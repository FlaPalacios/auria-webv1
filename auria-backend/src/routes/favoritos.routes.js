const express = require('express')
const router = express.Router()
const {
  obtenerFavoritos,
  agregarFavorito,
  eliminarFavorito
} = require('../controllers/favoritos.controller')
const { verificarToken } = require('../middlewares/auth.middleware')

router.get('/', verificarToken, obtenerFavoritos)
router.post('/', verificarToken, agregarFavorito)
router.delete('/:id', verificarToken, eliminarFavorito)

module.exports = router