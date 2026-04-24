-- Datos de prueba.
USE academic_db;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE notas;
TRUNCATE TABLE alumnos;
TRUNCATE TABLE materias;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO alumnos (nombre, apellido, email, fecha_nacimiento) VALUES
('Juan David', 'Perez Rojas', 'juan.perez@correo.com', '2000-05-20'),
('Maria Fernanda', 'Gomez Castro', 'maria.gomez@correo.com', '2001-03-14'),
('Carlos Andres', 'Lopez Herrera', 'carlos.lopez@correo.com', '1999-11-02'),
('Ana Sofia', 'Martinez Quintero', 'ana.martinez@correo.com', '2002-01-11'),
('Luis Alberto', 'Ramirez Molina', 'luis.ramirez@correo.com', '1998-07-29'),
('Laura Camila', 'Vargas Salazar', 'laura.vargas@correo.com', '2000-12-05'),
('Diego Alejandro', 'Torres Medina', 'diego.torres@correo.com', '1999-04-17'),
('Paula Andrea', 'Moreno Fuentes', 'paula.moreno@correo.com', '2001-09-23'),
('Andres Felipe', 'Sanchez Cardenas', 'andres.sanchez@correo.com', '2000-03-08'),
('Valentina Isabel', 'Diaz Pineda', 'valentina.diaz@correo.com', '2002-06-19');

INSERT INTO materias (nombre, codigo, creditos) VALUES
('Matematicas I', 'MAT101', 4),
('Programacion I', 'PRG101', 3),
('Bases de Datos', 'BDD201', 4);

INSERT INTO notas (valor, fecha_registro, alumno_id, materia_id) VALUES
(4.50, NOW(), 1, 1),
(4.20, NOW(), 1, 2),
(3.80, NOW(), 2, 1),
(4.90, NOW(), 2, 3),
(3.50, NOW(), 3, 2),
(4.00, NOW(), 3, 3),
(4.30, NOW(), 4, 1),
(3.90, NOW(), 5, 2),
(4.70, NOW(), 6, 3),
(3.60, NOW(), 7, 1),
(4.10, NOW(), 8, 2),
(4.80, NOW(), 9, 3),
(3.70, NOW(), 10, 1);
