const express = require('express')
const router = express.Router()
const {
  crearPedido,
  obtenerPedidos,
  actualizarEstadoPedido
} = require('../controllers/pedidos.controller')
const { verificarToken, verificarAdmin } = require('../middlewares/auth.middleware')

// Cualquiera puede crear un pedido, token opcional
router.post('/', (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (authHeader) {
    verificarToken(req, res, next)
  } else {
    next()
  }
}, crearPedido)

router.get('/', verificarToken, verificarAdmin, obtenerPedidos)
router.put('/:id', verificarToken, verificarAdmin, actualizarEstadoPedido)

module.exports = router