const prisma = require('../lib/prisma')

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const { categoria_id } = req.query

    const productos = await prisma.producto.findMany({
      where: categoria_id ? { categoria_id } : {},
      include: {
        categoria: true,
        imagenes: true,
        tallas: {
          include: { talla: true }
        }
      },
      orderBy: { creado_en: 'desc' }
    })

    res.json(productos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener productos' })
  }
}

// Obtener un producto por id
const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params

    const producto = await prisma.producto.findUnique({
      where: { id },
      include: {
        categoria: true,
        imagenes: true,
        tallas: {
          include: { talla: true }
        }
      }
    })

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    res.json(producto)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener el producto' })
  }
}

// Crear producto (solo admin)
const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, precio_visible, categoria_id, tallas } = req.body

    if (!nombre || !categoria_id) {
      return res.status(400).json({ error: 'Nombre y categoría son obligatorios' })
    }

    const producto = await prisma.producto.create({
      data: {
        nombre,
        descripcion,
        precio: precio ? parseFloat(precio) : null,
        precio_visible: precio_visible ?? false,
        categoria_id,
        tallas: {
          create: tallas?.map(talla_id => ({ talla_id })) ?? []
        }
      },
      include: {
        categoria: true,
        tallas: { include: { talla: true } },
        imagenes: true
      }
    })

    res.status(201).json(producto)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear el producto' })
  }
}

// Editar producto (solo admin)
const editarProducto = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, descripcion, precio, precio_visible, categoria_id, tallas } = req.body

    // Si vienen tallas nuevas, eliminamos las anteriores y ponemos las nuevas
    if (tallas) {
      await prisma.productoTalla.deleteMany({ where: { producto_id: id } })
    }

    const producto = await prisma.producto.update({
      where: { id },
      data: {
        ...(nombre && { nombre }),
        ...(descripcion !== undefined && { descripcion }),
        ...(precio !== undefined && { precio: precio ? parseFloat(precio) : null }),
        ...(precio_visible !== undefined && { precio_visible }),
        ...(categoria_id && { categoria_id }),
        ...(tallas && {
          tallas: {
            create: tallas.map(talla_id => ({ talla_id }))
          }
        })
      },
      include: {
        categoria: true,
        tallas: { include: { talla: true } },
        imagenes: true
      }
    })

    res.json(producto)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al editar el producto' })
  }
}

// Eliminar producto (solo admin)
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params

    // Eliminamos primero las relaciones
    await prisma.productoTalla.deleteMany({ where: { producto_id: id } })
    await prisma.imagenProducto.deleteMany({ where: { producto_id: id } })
    await prisma.favorito.deleteMany({ where: { producto_id: id } })

    await prisma.producto.delete({ where: { id } })

    res.json({ mensaje: 'Producto eliminado correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar el producto' })
  }
}

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  editarProducto,
  eliminarProducto
}