const prisma = require('../lib/prisma')

const rankingFavoritos = async (req, res) => {
  try {
    const ranking = await prisma.favorito.groupBy({
      by: ['producto_id'],
      _count: { producto_id: true },
      orderBy: { _count: { producto_id: 'desc' } },
      take: 10
    })

    const productosIds = ranking.map(r => r.producto_id)

    const productos = await prisma.producto.findMany({
      where: { id: { in: productosIds } },
      include: { imagenes: true, categoria: true }
    })

    const resultado = ranking.map(r => ({
      producto: productos.find(p => p.id === r.producto_id),
      total_favoritos: r._count.producto_id
    }))

    res.json(resultado)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener el ranking' })
  }
}

module.exports = { rankingFavoritos }