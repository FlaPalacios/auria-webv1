const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Categorías por defecto
  const categorias = ['Ponchos', 'Chompas', 'Gorritos']

  for (const nombre of categorias) {
    await prisma.categoria.upsert({
      where: { nombre },
      update: {},
      create: { nombre }
    })
  }
  console.log('Categorías creadas')

  // Tallas por defecto
  const tallas = ['XS', 'S', 'M', 'L', 'XL', 'Única']

  for (const nombre of tallas) {
    await prisma.talla.upsert({
      where: { nombre },
      update: {},
      create: { nombre }
    })
  }
  console.log('Tallas creadas')

  // Usuario admin
  const hash = await bcrypt.hash('admin123', 10)

  await prisma.usuario.upsert({
    where: { correo: 'edith@auria.com' },
    update: {},
    create: {
      nombre_usuario: 'edith',
      correo: 'edith@auria.com',
      contrasena: hash,
      rol: 'admin'
    }
  })
  console.log('Usuario admin creado')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())