INSERT INTO appointment(rut, name, email, date, created_at)
VALUES ('123456789','name', 'name@dominio', '2022-01-01 00:00:00', now());

UPDATE appointment
SET email = ''
WHERE d = 0;
COMMIT;

SELECT convert(hour(date), char)
FROM appointment WHERE date(appointment.date) = '2022-07-05';

SELECT *
FROM appointment;

DELETE FROM appointment
WHERE id = 52;

DELIMITER //
CREATE PROCEDURE ExpiredAppointments ()
BEGIN
	DELETE FROM asimov.appointment WHERE appointment.date < now();
    COMMIT;
END //

CALL ExpiredAppointments();

DROP PROCEDURE ExpiredAppointments;