-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('cliente', 'admin');

-- CreateEnum
CREATE TYPE "EstadoPedido" AS ENUM ('pendiente', 'revisado', 'contactado');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre_usuario" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'cliente',
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(10,2),
    "precio_visible" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoria_id" TEXT NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talla" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Talla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductoTalla" (
    "producto_id" TEXT NOT NULL,
    "talla_id" TEXT NOT NULL,

    CONSTRAINT "ProductoTalla_pkey" PRIMARY KEY ("producto_id","talla_id")
);

-- CreateTable
CREATE TABLE "ImagenProducto" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "es_principal" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "producto_id" TEXT NOT NULL,

    CONSTRAINT "ImagenProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorito" (
    "id" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,
    "producto_id" TEXT NOT NULL,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoPersonalizado" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "numero_telefono" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "EstadoPedido" NOT NULL DEFAULT 'pendiente',
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT,

    CONSTRAINT "PedidoPersonalizado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombre_usuario_key" ON "Usuario"("nombre_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nombre_key" ON "Categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Talla_nombre_key" ON "Talla"("nombre");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoTalla" ADD CONSTRAINT "ProductoTalla_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoTalla" ADD CONSTRAINT "ProductoTalla_talla_id_fkey" FOREIGN KEY ("talla_id") REFERENCES "Talla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenProducto" ADD CONSTRAINT "ImagenProducto_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoPersonalizado" ADD CONSTRAINT "PedidoPersonalizado_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
