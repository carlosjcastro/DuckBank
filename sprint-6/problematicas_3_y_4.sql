-------------------------3----------------

--1
SELECT * FROM cuenta WHERE balance<0

--2
SELECT customer_name, customer_surname, edad
FROM cliente
WHERE customer_surname like '%Z%'

--3
SELECT customer_name, customer_surname, sucursal.branch_name , edad 
FROM cliente
JOIN sucursal 
on cliente.branch_id= sucursal.branch_id
WHERE customer_name='Brendan'

--4
SELECT * 
FROM prestamo
where loan_total > 8000000 and loan_type='PRENDARIO'
--5
SELECT * 
from prestamo
where loan_total > (select avg(loan_total) FROM prestamo)
--6
SELECT count(edad<50) FROM cliente
--7
SELECT * FROM cuenta WHERE balance> 800000 ORDER BY balance DESC LIMIT 	5

--8
SELECT *
FROM prestamo 
WHERE  (loan_date  LIKE '____-04-%'
or  loan_date  LIKE  '____-06-%'
OR loan_date  LIKE  '____-08-%' )
ORDER BY loan_total


--9

SELECT loan_type, sum(loan_total) as loan_total_accu
FROM prestamo
GROUP BY loan_type

--------------------------4----------------------------

--1
SELECT sucursal.branch_id,branch_name, count(cliente.customer_id) as cantidad_clientes
FROM sucursal
JOIN cliente on sucursal.branch_id=cliente.branch_id
GROUP BY sucursal.branch_id
ORDER BY cantidad_clientes DESC
--2

SELECT sucursal.branch_id,branch_name,
count(empleado.employee_id) * 1.0/count(cliente.customer_id) as empleado_por_cliente
FROM sucursal
left JOIN empleado on sucursal.branch_id=empleado.branch_id
left	JOIN cliente on sucursal.branch_id=cliente.branch_id
GROUP BY sucursal.branch_id

--3
SELECT sucursal.branch_name, t.tipo,
count(tarjeta.id_tarjeta) as total_tarjeta
FROM sucursal
LEFT JOIN cliente on sucursal.branch_id= cliente.branch_id
LEFT JOIN tarjeta t on cliente.customer_id=t.cliente_id
group by sucursal.branch_name, t.tipo

--4
SELECT sucursal.branch_id ,branch_name, avg (loan_total)
FROM sucursal
JOIN cliente on sucursal.branch_id= cliente.branch_id
JOIN prestamo on prestamo.customer_id=cliente.customer_id
group by sucursal.branch_id

--5
CREATE TABLE auditoria_cuenta(
old_id int,
new_id int,
old_balance int,
new_balance int,
old_iban text,
new_iban text,
old_type text,
new_type text,
user_action text,
created_ at TEXT 
);

CREATE TRIGGER log_after_update 
	CREATE TRIGGER log_after_update 
AFTER UPDATE on cuenta
	WHEN  old.iban <> new.balance
		or old.type <> new.type OR old.customer_id <>new.customer_id
		Or old.balance <> new.balance
		
	BEGIN INSERT into  auditoria_cuenta(
	old_id ,
	new_id ,
	old_balance ,
	new_balance ,
	old_iban ,
	new_iban ,
	old_type ,
	new_type ,
	user_action,
	created_ at  )
	
	VALUES(
	old.customer_id,
	new.customer_id,
	old.balance,
	new.balance,
	old.iban,
	new.iban
	old.type,
	new.type,
	'UPDATE',
	datetime(NOW)
	); END;
	
UPDATE 	cuenta
set balance = balance-100
where account_id >= 10 and account_id< =14
	
	
--6
CREATE INDEX indx_dni on cliente(customer_DNI)
--7

CREATE TABLE movimientos(
id_movimiento  INTEGER PRIMARY KEY ,
cuenta_id int,
monto int,
tipo_operacion int,
created_ at TEXT 
);

create trigger movimientos_update AFTER UPDATE on cuenta
when old.balance<> new.balance
BEGIN INSERT into (
cuenta_id ,
monto ,
tipo_operacion ,
created_ at 
)

values (
cuenta.account_id,
old.balance-new.balance,
'Transaccion',
datetime(NOW),
);
	END;

BEGIN TRANSACTION;
	(UPDATE cuenta
	SET balance = balance-1000
	where account_id=200
	
	UPDATE cuenta
	set balance=balance+1000
	where account_id=400)
	ELSE ROLLBACK
	
	
COMMIT;
