CREATE TABLE "Clientes" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "sucursal_id" INTEGER REFERENCES Sucursal(id),
    "dni" TEXT,
    "fecha_nacimiento" TEXT
)

CREATE TABLE "Marca" (
	"id"	INTEGER,
	"descripcion"	TEXT NOT NULL,
	PRIMARY KEY("id")
)

CREATE TABLE Tarjetas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero TEXT NOT NULL UNIQUE CHECK (length(numero) <= 20),
    cvv INTEGER NOT NULL CHECK (length(cvv) = 3),
    fecha_otorgamiento TEXT NOT NULL,
    fecha_expiracion TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('Crédito', 'Débito')),
    marca_id INTEGER NOT NULL,
    cliente_id INTEGER NOT NULL,
    FOREIGN KEY (marca_id) REFERENCES Marca(id),
    FOREIGN KEY (cliente_id) REFERENCES Clientes(id)
)


INSERT INTO Clientes (descripcion) VALUES
('María López'),
('Carlos González'),
('Ana Torres'),
('Luis Ramírez'),
('Carmen Castillo'),
('Ricardo Morales'),
('Patricia Núñez'),
('Jorge Ortega'),
('Sofía Gutiérrez'),
('Enrique Díaz'),
('Laura Fernández'),
('Alberto Romero'),
('Marta Herrera'),
('Roberto Campos'),
('Elena Reyes'),
('Felipe Silva'),
('Natalia Ruiz'),
('Gustavo Soto'),
('Verónica Cabrera'),
('Diego Suárez'),
('Claudia Molina'),
('Andrés Peña'),
('Gabriela Rojas'),
('Sebastián Castro'),
('Lucía Navarro'),
('Pablo Maldonado'),
('Isabel Aguirre'),
('Héctor Luna'),
('Rosa Vázquez'),
('Mauricio Ríos'),
('Susana Sandoval'),
('Fernando Medina'),
('Jessica Moreno'),
('Francisco Paredes'),
('Andrea Domínguez'),
('Raúl Acosta'),
('Alejandra Chávez'),
('Ramiro Espinoza'),
('Mónica Escobar'),
('Daniela Villalobos'),
('César Vargas'),
('Carolina Carrillo'),
('Edgar Guzmán'),
('Lilian Del Valle'),
('Nicolás Benítez'),
('Viviana Araya'),
('Oscar Fuentes'),
('Lorena Peña'),
('Miguel Herrera'),
('Inés Salazar');



--Inserto tarjetas de CRÉDITO--
INSERT INTO Tarjetas (numero, cvv, fecha_otorgamiento, fecha_expiracion, tipo, marca_id, cliente_id) VALUES
('4920752912740521', 763, '2020-11-15', '2025-11-15', 'Crédito', 1, 1);


--No me dejo insertarla--
INSERT INTO Tarjetas (numero, cvv, fecha_otorgamiento, fecha_expiracion, tipo, marca_id, cliente_id) VALUES
('4539287446359842', 198, '2021-04-21', '2026-04-21', 'Crédito', 2, 2);


INSERT INTO Tarjetas (numero, cvv, fecha_otorgamiento, fecha_expiracion, tipo, marca_id, cliente_id) VALUES
('6011124082234567', 482, '2022-01-30', '2027-01-30', 'Crédito', 3, 3);
('5140427164302719', 385, '2019-09-12', '2024-09-12', 'Crédito', 1, 4);
('3782822463100050', 291, '2021-08-06', '2026-08-06', 'Crédito', 3, 5);
('4716185761137524', 750, '2018-12-20', '2023-12-20', 'Crédito', 3, 6);
('6011658315749036', 637, '2022-06-14', '2027-06-14', 'Crédito', 2, 7),
('4532732823069487', 505, '2020-03-01', '2025-03-01', 'Crédito', 3, 8),
('5155904823082982', 219, '2021-11-18', '2026-11-18', 'Crédito', 1, 9),
('3484395738298572', 482, '2019-07-23', '2024-07-23', 'Crédito', 2, 10);




--INSERTO TARJETAS DE DÉBITO A LOS CLIENTES ANTERIORES--
INSERT INTO Tarjetas (numero, cvv, fecha_otorgamiento, fecha_expiracion, tipo, marca_id, cliente_id) VALUES
('4539939810102043', 193, '2020-10-08', '2025-10-08', 'Débito', 1, 1),
--('6011395185203056', 827, '2022-04-09', '2027-04-09', 'Débito', 1, 2),ALGO PASA CON EL CLIENTE 2--
('5555555555554444', 350, '2020-01-01', '2025-01-01', 'Débito', 1, 3),
('3714496353984301', 141, '2018-11-22', '2023-11-22', 'Débito', 1, 4),
('4485660025889316', 672, '2019-04-12', '2024-04-12', 'Débito', 1, 5),
('6011789654309274', 245, '2021-07-17', '2026-07-17', 'Débito', 1, 6),
('379354508162306', 956, '2020-09-30', '2025-09-30', 'Débito', 1, 7),
('6011167800221098', 189, '2022-08-25', '2027-08-25', 'Débito', 1, 8),
('4539237645123746', 300, '2019-12-03', '2024-12-03', 'Débito', 1, 9),
('5178495738298416', 467, '2021-05-29', '2026-05-29', 'Débito', 1, 10);


--INSERTO OTRAS TARJETAS deb y cred DE FORMA ALEATORIA--
INSERT INTO Tarjetas (numero, cvv, fecha_otorgamiento, fecha_expiracion, tipo, marca_id, cliente_id) VALUES
('6011000995504101', 568, '2022-03-15', '2027-03-15', 'Crédito', 1, 11),
('5552010023683896', 407, '2019-10-02', '2024-10-02', 'Crédito', 2, 12),
('4532115512120281', 173, '2021-06-30', '2026-06-30', 'Crédito', 3, 13),
('4916739654371742', 865, '2020-08-20', '2025-08-20', 'Crédito',2, 14),
('6011101012952436', 902, '2022-11-07', '2027-11-07', 'Débito', 1, 15),
('4532756780945612', 674, '2019-02-15', '2024-02-15', 'Crédito', 1, 16),
('5110328912976782', 305, '2021-01-22', '2026-01-22', 'Crédito', 3, 17),
('6011794513290146', 147, '2018-06-09', '2023-06-09', 'Débito', 1, 18),
('6011604237849234', 264, '2020-12-31', '2025-12-31', 'Crédito', 2, 19),
('379654968364809', 998, '2021-09-27', '2026-09-27', 'Crédito', 3, 20),
('6011406736820004', 539, '2022-01-15', '2027-01-15', 'Crédito', 1, 21),
('4532761936541287', 111, '2019-05-03', '2024-05-03', 'Crédito', 2, 22),
('6011384729098437', 572, '2020-03-15', '2025-03-15', 'Débito', 1, 23),
('6011987291012024', 384, '2021-10-13', '2026-10-13', 'Crédito', 3, 24),
('4916146798432029', 998, '2022-05-01', '2027-05-01', 'Crédito', 1, 25),
('5555222212341234', 477, '2020-07-17', '2025-07-17', 'Débito', 1, 26),
('3787344936710005', 103, '2021-04-25', '2026-04-25', 'Crédito', 3, 27),
('6011173856738216', 205, '2019-09-15', '2024-09-15', 'Crédito', 3, 28),
('6011745321649813', 319, '2022-07-01', '2027-07-01', 'Crédito', 2, 29),
('6011300985632015', 604, '2019-12-17', '2024-12-17', 'Débito', 1, 30),
('4485290034859713', 709, '2021-06-02', '2026-06-02', 'Crédito', 3, 31),
('4716532821013764', 901, '2022-03-30', '2027-03-30', 'Crédito', 1, 32),
('6011374580291736', 193, '2020-11-20', '2025-11-20', 'Débito', 1, 33),
('6011609832015271', 481, '2021-08-11', '2026-08-11', 'Crédito', 2, 34),
('4539930001122334', 748, '2019-03-09', '2024-03-09', 'Crédito', 1, 35),
('6011776329101284', 294, '2020-05-15', '2025-05-15', 'Crédito', 3, 36),
('6011730214301928', 667, '2022-02-23', '2027-02-23', 'Débito', 1, 37),
('4916140900912763', 105, '2019-08-15', '2024-08-15', 'Débito', 1, 38),
('6011662993710485', 342, '2020-06-12', '2025-06-12', 'Débito', 1, 39),
('6011100983241200', 906, '2021-12-25', '2026-12-25', 'Crédito', 3, 40);


--INSERTO CLIENTES CON SOLO TARJETA DE DÉBITO--
INSERT INTO Tarjetas (numero, cvv, fecha_otorgamiento, fecha_expiracion, tipo, marca_id, cliente_id) VALUES
('4012345678901234', 123, '2023-01-15', '2028-01-15', 'Débito', 1, 41),
('4012456789012345', 456, '2023-02-20', '2028-02-20', 'Débito', 1, 42),
('4012567890123456', 789, '2023-03-10', '2028-03-10', 'Débito', 1, 43),
('4012678901234567', 234, '2023-04-05', '2028-04-05', 'Débito', 1, 44),
('4012789012345678', 567, '2023-05-15', '2028-05-15', 'Débito', 1, 45),
('4012890123456789', 890, '2023-06-25', '2028-06-25', 'Débito', 1, 46),
('4012901234567890', 135, '2023-07-30', '2028-07-30', 'Débito', 1, 47),
('4012012345678901', 246, '2023-08-10', '2028-08-10', 'Débito', 1, 48),
('4012123456789012', 357, '2023-09-15', '2028-09-15', 'Débito', 1, 49),
('4012234567890123', 468, '2023-10-20', '2028-10-20', 'Débito', 1, 50),
('4012345678901230', 579, '2023-11-25', '2028-11-25', 'Débito', 1, 51),
('4012456789012341', 680, '2023-12-30', '2028-12-30', 'Débito', 1, 52);


CREATE TABLE "Sucursal" (
	"id"	INTEGER,
	"calle"	TEXT NOT NULL,
	"numero"	INTEGER NOT NULL,
	"ciudad"	TEXT NOT NULL,
	"provincia"	TEXT NOT NULL,
	"codigo_postal"	TEXT NOT NULL,
	"tipo_entidad"	 NOT NULL CHECK("tipo_entidad" IN ('Cliente', 'Empleado', 'Sucursal')),
	"entidad_id"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
)

--INSERTO DIRECCIONES PARA SUCURSALES--
INSERT INTO Sucursal (calle, número, ciudad, provincia, codigo_postal, tipo_entidad, entidad_id) VALUES
-- Sucursales en Santa Fe
('Boulevard Galvez', 2560, 'Santa Fe', 'Santa Fe', '3000', 'Sucursal', 1),
('Calle San Martín', 3100, 'Rosario', 'Santa Fe', '2000', 'Sucursal', 2),
('Avenida Rivadavia', 1500, 'Reconquista', 'Santa Fe', '3560', 'Sucursal', 3),
('Calle Pellegrini', 2750, 'Rafaela', 'Santa Fe', '2300', 'Sucursal', 4),
('Calle 9 de Julio', 1850, 'Esperanza', 'Santa Fe', '3080', 'Sucursal', 5),
('Calle Libertador', 2100, 'Villa Constitución', 'Santa Fe', '2919', 'Sucursal', 6),


-- Sucursales en Buenos Aires
('Avenida 7', 113, 'La Plata', 'Buenos Aires', '1900', 'Sucursal', 7),
('Calle Florida', 800, 'Buenos Aires', 'Buenos Aires', '1005', 'Sucursal', 8),
('Avenida Libertador', 4500, 'Vicente López', 'Buenos Aires', '1638', 'Sucursal', 9),
('Calle Maipú', 1100, 'San Isidro', 'Buenos Aires', '1642', 'Sucursal', 10),
('Calle San Martín', 1300, 'Avellaneda', 'Buenos Aires', '1870', 'Sucursal', 11),
('Calle Belgrano', 900, 'Quilmes', 'Buenos Aires', '1878', 'Sucursal', 12);


CREATE TABLE Empleados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    sucursal_id INTEGER NOT NULL, fecha_contratacion TEXT,
    FOREIGN KEY (sucursal_id) REFERENCES "Sucursal"(id) 
)

--ASIGNO DIRECCIONES PARA CADA EMPLEADO --
INSERT INTO Empleados (nombre, apellido, sucursal_id) VALUES
('Juan', 'Pérez', 1),
('Laura', 'Gómez', 1),
('Carlos', 'Ruiz', 2),
('Ana', 'López', 2),
('Luis', 'Díaz', 3),
('María', 'Torres', 3),
('Sofía', 'Martínez', 4),
('Diego', 'Fernández', 4),
('Cecilia', 'Romero', 5),
('Federico', 'Herrera', 5),
('Elena', 'Castro', 6),
('Fernando', 'Suárez', 6),
('Graciela', 'Navarro', 7),
('José', 'García', 7),
('Paula', 'Ortiz', 8),
('Rafael', 'Mendoza', 8),
('Silvana', 'Alonso', 9),
('Marcos', 'Aguilar', 9),
('Nora', 'Campos', 10),
('Gustavo', 'Paredes', 10),
('Viviana', 'Salinas', 11),
('Enrique', 'Vargas', 11),
('Alicia', 'Figueroa', 12),
('Mario', 'Luna', 12);


–COMBINO LOS DATOS DE EMPLEADOS Y SUCURSAL—
SELECT
    Empleados.id,
    Empleados.nombre,
    Empleados.apellido,
    Empleados.sucursal_id,
    Sucursal.calle,
    Sucursal.numero,
    Sucursal.ciudad,
    Sucursal.provincia,
    Sucursal.codigo_postal
FROM
    Empleados
JOIN
    Sucursal ON Empleados.sucursal_id = Sucursal.id;


--ASIGNO DIRECCIONES PARA CADA CLIENTE --
ALTER TABLE Clientes
ADD COLUMN sucursal_id INTEGER REFERENCES Sucursal(id);


UPDATE Clientes
SET sucursal_id = (ABS(RANDOM()) % 12) + 1;



ALTER TABLE Empleados
ADD COLUMN fecha_contratacion TEXT;


--INSERTO FECHAS DE CONTRATACIÓN PARA CADA EMPLEADO--
UPDATE Empleados SET fecha_contratacion = '2024-01-15' WHERE id = 1;
UPDATE Empleados SET fecha_contratacion = '2024-02-10' WHERE id = 2;


UPDATE Empleados SET fecha_contratacion = '2023-11-05' WHERE id = 3;
UPDATE Empleados SET fecha_contratacion = '2024-02-18' WHERE id = 4;
UPDATE Empleados SET fecha_contratacion = '2024-03-12' WHERE id = 5;
UPDATE Empleados SET fecha_contratacion = '2023-12-30' WHERE id = 6;
UPDATE Empleados SET fecha_contratacion = '2024-01-20' WHERE id = 7;
UPDATE Empleados SET fecha_contratacion = '2024-04-15' WHERE id = 8;
UPDATE Empleados SET fecha_contratacion = '2023-10-22' WHERE id = 9;
UPDATE Empleados SET fecha_contratacion = '2024-05-08' WHERE id = 10;
UPDATE Empleados SET fecha_contratacion = '2023-09-27' WHERE id = 11;
UPDATE Empleados SET fecha_contratacion = '2024-06-03' WHERE id = 12;


UPDATE Empleados SET fecha_contratacion = '2024-07-19' WHERE id = 13;
UPDATE Empleados SET fecha_contratacion = '2024-08-11' WHERE id = 14;
UPDATE Empleados SET fecha_contratacion = '2024-09-05' WHERE id = 15;
UPDATE Empleados SET fecha_contratacion = '2024-10-27' WHERE id = 16;
UPDATE Empleados SET fecha_contratacion = '2024-11-18' WHERE id = 17;
UPDATE Empleados SET fecha_contratacion = '2025-01-04' WHERE id = 18;
UPDATE Empleados SET fecha_contratacion = '2025-02-23' WHERE id = 19;
UPDATE Empleados SET fecha_contratacion = '2025-03-15' WHERE id = 20;
UPDATE Empleados SET fecha_contratacion = '2025-04-06' WHERE id = 21;
UPDATE Empleados SET fecha_contratacion = '2025-05-29' WHERE id = 22;
UPDATE Empleados SET fecha_contratacion = '2025-06-17' WHERE id = 23;
UPDATE Empleados SET fecha_contratacion = '2025-07-08' WHERE id = 24;

ALTER TABLE Clientes
ADD COLUMN dni TEXT;


ALTER TABLE Clientes
ADD COLUMN fecha_nacimiento TEXT;


UPDATE Clientes SET dni = '12345678', fecha_nacimiento = '1989-03-15' WHERE id = 1;
UPDATE Clientes SET dni = '23456789', fecha_nacimiento = '1995-07-22' WHERE id = 2;
UPDATE Clientes SET dni = '34567890', fecha_nacimiento = '1978-01-05' WHERE id = 3;
UPDATE Clientes SET dni = '45678901', fecha_nacimiento = '1984-05-10' WHERE id = 4;
UPDATE Clientes SET dni = '56789012', fecha_nacimiento = '1997-11-30' WHERE id = 5;
UPDATE Clientes SET dni = '67890123', fecha_nacimiento = '1972-08-12' WHERE id = 6;
UPDATE Clientes SET dni = '78901234', fecha_nacimiento = '1993-09-25' WHERE id = 7;
UPDATE Clientes SET dni = '89012345', fecha_nacimiento = '1992-06-18' WHERE id = 8;
UPDATE Clientes SET dni = '90123456', fecha_nacimiento = '1974-02-02' WHERE id = 9;
UPDATE Clientes SET dni = '01234567', fecha_nacimiento = '1979-12-20' WHERE id = 10;
UPDATE Clientes SET dni = '12345679', fecha_nacimiento = '1990-10-15' WHERE id = 11;
UPDATE Clientes SET dni = '23456780', fecha_nacimiento = '1987-04-01' WHERE id = 12;
UPDATE Clientes SET dni = '34567891', fecha_nacimiento = '1973-03-22' WHERE id = 13;
UPDATE Clientes SET dni = '45678902', fecha_nacimiento = '1994-08-09' WHERE id = 14;
UPDATE Clientes SET dni = '56789013', fecha_nacimiento = '1986-07-11' WHERE id = 15;
UPDATE Clientes SET dni = '67890124', fecha_nacimiento = '1981-05-25' WHERE id = 16;
UPDATE Clientes SET dni = '78901235', fecha_nacimiento = '1975-01-17' WHERE id = 17;
UPDATE Clientes SET dni = '89012346', fecha_nacimiento = '1996-12-05' WHERE id = 18;
UPDATE Clientes SET dni = '90123457', fecha_nacimiento = '1982-11-28' WHERE id = 19;
UPDATE Clientes SET dni = '01234568', fecha_nacimiento = '1988-02-14' WHERE id = 20;
UPDATE Clientes SET dni = '12345680', fecha_nacimiento = '1991-09-30' WHERE id = 21;
UPDATE Clientes SET dni = '23456781', fecha_nacimiento = '1970-10-11' WHERE id = 22;
UPDATE Clientes SET dni = '34567892', fecha_nacimiento = '1983-06-16' WHERE id = 23;
UPDATE Clientes SET dni = '45678903', fecha_nacimiento = '1985-04-04' WHERE id = 24;
UPDATE Clientes SET dni = '56789014', fecha_nacimiento = '1989-01-26' WHERE id = 25;
UPDATE Clientes SET dni = '67890125', fecha_nacimiento = '1977-02-18' WHERE id = 26;
UPDATE Clientes SET dni = '78901236', fecha_nacimiento = '1997-11-22' WHERE id = 27;
UPDATE Clientes SET dni = '89012347', fecha_nacimiento = '1984-08-08' WHERE id = 28;
UPDATE Clientes SET dni = '90123458', fecha_nacimiento = '1980-05-19' WHERE id = 29;
UPDATE Clientes SET dni = '01234569', fecha_nacimiento = '1992-03-21' WHERE id = 30;
UPDATE Clientes SET dni = '12345681', fecha_nacimiento = '1994-07-30' WHERE id = 31;
UPDATE Clientes SET dni = '23456782', fecha_nacimiento = '1972-09-09' WHERE id = 32;
UPDATE Clientes SET dni = '34567893', fecha_nacimiento = '1987-10-20' WHERE id = 33;
UPDATE Clientes SET dni = '45678904', fecha_nacimiento = '1973-12-29' WHERE id = 34;
UPDATE Clientes SET dni = '56789015', fecha_nacimiento = '1995-08-16' WHERE id = 35;
UPDATE Clientes SET dni = '67890126', fecha_nacimiento = '1983-11-11' WHERE id = 36;
UPDATE Clientes SET dni = '78901237', fecha_nacimiento = '1990-02-13' WHERE id = 37;
UPDATE Clientes SET dni = '89012348', fecha_nacimiento = '1979-01-07' WHERE id = 38;
UPDATE Clientes SET dni = '90123459', fecha_nacimiento = '1991-05-24' WHERE id = 39;
UPDATE Clientes SET dni = '01234570', fecha_nacimiento = '1974-04-08' WHERE id = 40;
UPDATE Clientes SET dni = '12345682', fecha_nacimiento = '1988-06-15' WHERE id = 41;
UPDATE Clientes SET dni = '23456783', fecha_nacimiento = '1993-09-03' WHERE id = 42;
UPDATE Clientes SET dni = '34567894', fecha_nacimiento = '1981-12-17' WHERE id = 43;
UPDATE Clientes SET dni = '45678905', fecha_nacimiento = '1976-07-21' WHERE id = 44;
UPDATE Clientes SET dni = '56789016', fecha_nacimiento = '1997-03-30' WHERE id = 45;
UPDATE Clientes SET dni = '67890127', fecha_nacimiento = '1969-10-10' WHERE id = 46;
UPDATE Clientes SET dni = '78901238', fecha_nacimiento = '1984-11-22' WHERE id = 47;
UPDATE Clientes SET dni = '89012349', fecha_nacimiento = '1990-06-14' WHERE id = 48;
UPDATE Clientes SET dni = '90123460', fecha_nacimiento = '1985-08-03' WHERE id = 49;
UPDATE Clientes SET dni = '01234571', fecha_nacimiento = '1982-02-02' WHERE id = 50;
UPDATE Clientes SET dni = '12345683', fecha_nacimiento = '1994-10-16' WHERE id = 51;
UPDATE Clientes SET dni = '23456784', fecha_nacimiento = '1987-01-29' WHERE id = 52;


