from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from configs import MySQLConnectionConfig


app = Flask(__name__)

db = MySQL(app)

app.config.from_object(MySQLConnectionConfig)


CORS(app, resources={r'/*': {"origins": "*"}})


@app.route('/appointments', methods=['GET'])
def getAppointments():
    try:
        cursor = db.connection.cursor()
        cursor.callproc('ExpiredAppointments', args=())
        sql = 'SELECT id, rut, name, email, date, created_at FROM appointment'
        cursor.execute(sql)
        data = cursor.fetchall()
        db.connection.commit()
        cursor.close()
        print(data)
        if data != ():
            rest = []
            for element in data:
                rest_element = {'created_at': element[5], 'date': element[4],
                                'email': element[3], 'name': element[2], 'rut': element[1], 'id': element[0]}
                rest.append(rest_element)
            return jsonify({'appointments': rest, 'message': 'Successful request'})

        else:
            return jsonify({'message': 'There is no appointments'})

    except Exception as ex:
        return jsonify({'message': 'Error getting appointments'})


@app.route('/appointments/<rut>', methods=['GET'])
def getAppointmentByRut(rut):
    try:
        cursor = db.connection.cursor()
        cursor.callproc('ExpiredAppointments', args=())
        sql = 'SELECT id, rut, name, email, date, created_at FROM appointment WHERE rut = "{0}"'.format(
            rut)
        cursor.execute(sql)
        data = cursor.fetchall()
        db.connection.commit()
        cursor.close()
        if data != ():
            rest = []
            for element in data:
                rest_element = {'created_at': element[5], 'date': element[4],
                                'email': element[3], 'name': element[2], 'rut': element[1], 'id': element[0]}
                rest.append(rest_element)

            return jsonify({'appointment': rest, 'message': 'Successful request'})

        else:
            return jsonify({'message': 'There is no appointment'})

    except Exception as ex:
        return jsonify({'message': 'Error getting the appointments'})


@app.route('/not-available-hours/<date>', methods=['GET'])
def getNotAvailableHours(date):
    try:
        cursor = db.connection.cursor()
        cursor.callproc('ExpiredAppointments', args=())
        sql = "SELECT convert(time(date),char) FROM appointment WHERE date(appointment.date) = '{0}'".format(
            date)
        cursor.execute(sql)
        data = cursor.fetchall()
        print(data)
        db.connection.commit()
        cursor.close()
        rest = []
        for element in data:
            rest.append(element[0])

        return jsonify({'not_available_hours': rest, 'message': 'Successful request'})

    except Exception as ex:

        return jsonify({'message': 'Error getting available hours'})


@app.route('/schedule', methods=['POST'])
def postAppointment():
    print(request.json['date'])
    try:
        cursor = db.connection.cursor()
        cursor.callproc('ExpiredAppointments', args=())
        sql = '''INSERT INTO appointment(rut, name, email, date, created_at) 
                    VALUES ('{0}','{1}','{2}','{3}',now())'''.format(request.json['rut'], request.json['name'], request.json['email'], request.json['date'])
        cursor.execute(sql)
        db.connection.commit()
        cursor.close()
        return jsonify({'message': 'Successfully scheduled appointment'})

    except Exception as ex:
        return jsonify({'message': 'Error posting appointment'})
        # This exception can be caused because of rut, email and/or date already does exist in the table, whitch means,
        # the person is trying to take a second appointnment or the date that wanted is already taken.


@app.route('/change-appointment', methods=['PUT'])
def updateAppointment():
    try:
        cursor = db.connection.cursor()
        cursor.callproc('ExpiredAppointments', args=())
        sql = "UPDATE appointment SET appointment.date = '{0}' WHERE rut = '{1}'".format(
            request.json['date'], request.json['rut'])
        cursor.execute(sql)
        db.connection.commit()
        cursor.close()
        return jsonify({'message': 'Successfully re-scheduled appointment'})

    except Exception as ex:
        return jsonify({'message': 'Error updating appointment'})
        # This error can be caused because of the rut even doesn't exist, whitch means the person don't even have an appointment,
        # or the date is already taken.


@app.route('/cancel-appointment/<rut>', methods=['DELETE'])
def deleteAppointment(rut):
    try:
        cursor = db.connection.cursor()
        cursor.callproc('ExpiredAppointments', args=())
        sql = "DELETE FROM appointment WHERE rut = '{0}'".format(
            rut)
        cursor.execute(sql)
        db.connection.commit()
        cursor.close()
        return jsonify({'message': 'Successfully canceled appointment'})

    except Exception as ex:
        return jsonify({'message': 'Error deleting date'})
