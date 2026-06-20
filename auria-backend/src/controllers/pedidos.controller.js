const prisma = require('../lib/prisma')

const crearPedido = async (req, res) => {
  try {
    const { nombre, numero_telefono, descripcion } = req.body

    if (!nombre || !numero_telefono || !descripcion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

    const pedido = await prisma.pedidoPersonalizado.create({
      data: {
        nombre,
        numero_telefono,
        descripcion,
        usuario_id: req.usuario?.id ?? null
      }
    })

    res.status(201).json({
      mensaje: 'Pedido enviado correctamente. Edith se pondrá en contacto contigo.',
      pedido
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear el pedido' })
  }
}

const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await prisma.pedidoPersonalizado.findMany({
      include: { usuario: true },
      orderBy: { creado_en: 'desc' }
    })

    res.json(pedidos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener pedidos' })
  }
}

const actualizarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params
    const { estado } = req.body

    const estadosValidos = ['pendiente', 'revisado', 'contactado']

    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: 'Estado inválido' })
    }

    const pedido = await prisma.pedidoPersonalizado.update({
      where: { id },
      data: { estado }
    })

    res.json(pedido)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar el pedido' })
  }
}

module.exports = { crearPedido, obtenerPedidos, actualizarEstadoPedido }