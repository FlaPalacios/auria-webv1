const prisma = require('../lib/prisma')

const obtenerFavoritos = async (req, res) => {
  try {
    const usuario_id = req.usuario.id

    const favoritos = await prisma.favorito.findMany({
      where: { usuario_id },
      include: {
        producto: {
          include: {
            imagenes: true,
            categoria: true
          }
        }
      },
      orderBy: { creado_en: 'desc' }
    })

    res.json(favoritos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener favoritos' })
  }
}

const agregarFavorito = async (req, res) => {
  try {
    const usuario_id = req.usuario.id
    const { producto_id } = req.body

    if (!producto_id) {
      return res.status(400).json({ error: 'producto_id es obligatorio' })
    }

    // Verificar si ya existe
    const existe = await prisma.favorito.findFirst({
      where: { usuario_id, producto_id }
    })

    if (existe) {
      return res.status(400).json({ error: 'El producto ya está en favoritos' })
    }

    const favorito = await prisma.favorito.create({
      data: { usuario_id, producto_id }
    })

    res.status(201).json(favorito)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al agregar favorito' })
  }
}

const eliminarFavorito = async (req, res) => {
  try {
    const usuario_id = req.usuario.id
    const { id } = req.params

    const favorito = await prisma.favorito.findFirst({
      where: { id, usuario_id }
    })

    if (!favorito) {
      return res.status(404).json({ error: 'Favorito no encontrado' })
    }

    await prisma.favorito.delete({ where: { id } })

    res.json({ mensaje: 'Favorito eliminado correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar favorito' })
  }
}

module.exports = { obtenerFavoritos, agregarFavorito, eliminarFavorito }