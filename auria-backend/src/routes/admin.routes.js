const express = require('express')
const router = express.Router()
const { rankingFavoritos } = require('../controllers/admin.controller')
const { verificarToken, verificarAdmin } = require('../middlewares/auth.middleware')

router.get('/favoritos-ranking', verificarToken, verificarAdmin, rankingFavoritos)

module.exports = router