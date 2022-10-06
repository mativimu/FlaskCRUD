from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user:password@localhost/flask-crud'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Appointment(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    rut = db.Column(db.String(9), unique=True, nullable=False)
    name = db.Column(db.String(30), unique=False, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    date = db.Column(db.DateTime, unique=True, nullable=False)
    created_at = db.Column(db.DateTime, unique=True, nullable=False)

    def __repr__(self):
        return f'{self.id} - {self.name} - {self.email} - {self.date} - {self.created_at}'