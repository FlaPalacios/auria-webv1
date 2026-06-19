const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../lib/prisma')

const registro = async (req, res) => {
  try {
    const { nombre_usuario, correo, contrasena } = req.body

    // Validar que llegaron todos los campos
    if (!nombre_usuario || !correo || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

    // Verificar si el correo ya existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { correo }
    })

    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' })
    }

    // Hashear la contraseña
    const hash = await bcrypt.hash(contrasena, 10)

    // Crear el usuario
    const usuario = await prisma.usuario.create({
      data: {
        nombre_usuario,
        correo,
        contrasena: hash
      }
    })

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuario: {
        id: usuario.id,
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo,
        rol: usuario.rol
      }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body

    if (!correo || !contrasena) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' })
    }

    // Buscar el usuario
    const usuario = await prisma.usuario.findUnique({
      where: { correo }
    })

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    // Comparar contraseña
    const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena)

    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo,
        rol: usuario.rol
      }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = { registro, login }