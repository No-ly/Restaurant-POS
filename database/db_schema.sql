-- 1. Crear la Base de Datos
CREATE DATABASE RestauranteDB1;
USE RestauranteDB1;


-- 2. Tabla CATEGORIAS
CREATE TABLE Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- 3. Tabla USUARIOS (Meseros/Cajeros - Sin contraseña)
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL -- 'Mesero', 'Caja', 'Cocina'
);

-- 4. Tabla INGREDIENTES (Catálogo para personalizar)
CREATE TABLE Ingredientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio_extra DECIMAL(10,2) DEFAULT 0.00 -- Costo si piden extra
);

-- 5. Tabla PRODUCTOS
CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen_url TEXT, -- TEXT para que quepan URLs largas
    area_cocina VARCHAR(50) NOT NULL, -- 'Cocina', 'Barra'
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id)
);

-- 6. Tabla RECETAS (Relación Producto - Ingrediente default)
CREATE TABLE Producto_Ingredientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    id_ingrediente INT NOT NULL,
    cantidad_default INT DEFAULT 1,
    es_modificable TINYINT(1) DEFAULT 1, -- 1=Sí, 0=No se puede quitar
    FOREIGN KEY (id_producto) REFERENCES Productos(id),
    FOREIGN KEY (id_ingrediente) REFERENCES Ingredientes(id)
);

-- 7. Tabla MESAS
CREATE TABLE Mesas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(50) NOT NULL,
    estado VARCHAR(50) DEFAULT 'Libre' -- 'Libre', 'Ocupada'
);

-- 8. Tabla PEDIDOS (Cabecera de la cuenta)
CREATE TABLE Pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT NOT NULL,
    mesa VARCHAR(50), -- "Mesa 1" o nombre del cliente si es para llevar
    total DECIMAL(10,2) DEFAULT 0.00,
    estado VARCHAR(50) DEFAULT 'Pendiente', -- 'Pendiente', 'Pagado'
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

-- 9. Tabla DETALLE_PEDIDO (Platillos individuales)
CREATE TABLE Detalle_Pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    especificaciones TEXT, -- "Sin cebolla, Extra queso"
    estado_preparacion VARCHAR(50) DEFAULT 'En Cola',
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id),
    FOREIGN KEY (id_producto) REFERENCES Productos(id)
);

-- =============================================
-- DATOS DE PRUEBA (SEED DATA)
-- =============================================

-- Insertar Categorías
INSERT INTO Categorias (nombre) VALUES ('Hamburguesas'), ('Bebidas'), ('Complementos');

-- Insertar Usuarios
INSERT INTO Usuarios (nombre, rol) VALUES ('Juan Pérez', 'Mesero'), ('Maria López', 'Caja'), ('Carlos Chef', 'Cocina');

-- Insertar Ingredientes
INSERT INTO Ingredientes (nombre, precio_extra) VALUES 
('Carne Res', 25.00), 
('Queso Americano', 10.00),
('Cebolla', 0.00), 
('Tomate', 0.00),
('Lechuga', 0.00),
('Pan Artesanal', 15.00);

-- Insertar Productos (URLs de ejemplo)
INSERT INTO Productos (nombre, precio, id_categoria, area_cocina, imagen_url) VALUES 
('Hamburguesa Clásica', 120.00, 1, 'Cocina', 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'),
('Refresco Cola', 35.00, 2, 'Barra', 'https://cdn-icons-png.flaticon.com/512/2405/2405597.png'),
('Papas Fritas', 45.00, 3, 'Cocina', 'https://cdn-icons-png.flaticon.com/512/305/305385.png');

-- Configurar la Hamburguesa (Lleva todo por default)
INSERT INTO Producto_Ingredientes (id_producto, id_ingrediente, cantidad_default) VALUES 
(1, 6, 1), -- Pan
(1, 1, 1), -- Carne
(1, 2, 1), -- Queso
(1, 4, 1), -- Tomate
(1, 3, 1); -- Cebolla

-- Mesas
INSERT INTO Mesas (numero) VALUES ('Mesa 1'), ('Mesa 2'), ('Mesa 3'), ('Mesa 4');