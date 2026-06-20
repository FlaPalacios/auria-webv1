const prisma = require('../lib/prisma')

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: { nombre: 'asc' }
    })
    res.json(categorias)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener categorías' })
  }
}

const crearCategoria = async (req, res) => {
  try {
    const { nombre } = req.body

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio' })
    }

    const categoria = await prisma.categoria.create({
      data: { nombre }
    })

    res.status(201).json(categoria)
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' })
    }
    console.error(error)
    res.status(500).json({ error: 'Error al crear la categoría' })
  }
}

const editarCategoria = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre } = req.body

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio' })
    }

    const categoria = await prisma.categoria.update({
      where: { id },
      data: { nombre }
    })

    res.json(categoria)
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' })
    }
    console.error(error)
    res.status(500).json({ error: 'Error al editar la categoría' })
  }
}

const eliminarCategoria = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.categoria.delete({ where: { id } })

    res.json({ mensaje: 'Categoría eliminada correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar la categoría' })
  }
}

module.exports = { obtenerCategorias, crearCategoria, editarCategoria, eliminarCategoria }