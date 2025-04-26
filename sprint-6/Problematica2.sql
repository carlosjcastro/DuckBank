Problematica 2:
--CREO VENTANA --
CREATE VIEW VistaClientesEdad AS
SELECT
    id,
    sucursal_id AS numero_sucursal,
    descripcion AS nombre,
    dni,
    (strftime('%Y', 'now') - strftime('%Y', fecha_nacimiento)) AS edad
FROM Clientes;


--CALCULO EDAD DE CADA CLIENTE EN BASE A SU FECHA DE NACIMEINTO--
SELECT
    id,
    descripcion,
    sucursal_id,
    dni,
    fecha_nacimiento,
    (strftime('%Y', 'now') - strftime('%Y', fecha_nacimiento)) -
    (strftime('%m-%d', 'now') < strftime('%m-%d', fecha_nacimiento)) AS edad
FROM
    Clientes;


--CONSULTO CLIENTES +40, ORDENO POR DNI --
SELECT
    id,
    numero_sucursal,
    nombre,
    dni,
    edad
FROM
    VistaClientesEdad
WHERE
    edad > 40
ORDER BY
    DNI ASC;


--CONSULTO NOMBRES QUE EMPIEZAN CON "A", ORDENADOS ALFABETICAMENTE --
SELECT *
FROM VistaClientesEdad
WHERE nombre LIKE 'A%'
ORDER BY nombre ASC;


--INSERTO 5 NUEVOS CLIENTES--
INSERT INTO Clientes (id, descripcion, dni, fecha_nacimiento, sucursal_id) VALUES
(80, 'Lois Stout', 47730534, '1984-07-07', NULL),
(55, 'Hall Mcconnell', 52055464, '1968-04-30', NULL),
(77, 'Hilel Mclean', 43625213, '1993-03-28', NULL),
(96, 'Jin Cooley', 21207908, '1959-08-24', NULL),
(78, 'Gabriel Harmon', 57063950, '1976-04-01', NULL);


--AGREGO SUCURSAL --
UPDATE Clientes
SET sucursal_id = 10
WHERE dni IN (47730534, 52055464, 43625213, 21207908, 57063950);


--VERIFICO--
SELECT * FROM Clientes
WHERE dni IN (47730534, 52055464, 43625213, 21207908, 57063950);


--ELIMINO UN CLIENTE POR NOMBRE Y APELLIDO--
DELETE FROM Clientes
WHERE descripcion = 'Lilian Del Valle' AND dni = 67890127;

-- VERIFICO --
SELECT * FROM Clientes
WHERE descripcion = 'Lilian Del Valle' AND dni = 67890127;