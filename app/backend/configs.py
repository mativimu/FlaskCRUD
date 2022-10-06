from dotenv import load_dotenv
import os

load_dotenv()

class Config:

    SECRET_KEY = os.getenv('SECRET_KEY')

    def __repr__(this):
        return 'Config(SECRET_KEY={0})'.format(this.SECRET_KEY)

class MySQLConnectionConfig(Config):

    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'asimov'
    MYSQL_PASSWORD = 'asimov'
    MYSQL_DB = 'asimov'
    MYSQL_PORT = 3306

    def __repr__(self):
        return 'MYSQLConnectionCongif(MYSQL_HOST={0}, MYSQL_USER={1}, MYSQL_PASSWORD={2}, MYSQL_DB={3}, MYSQL_PORT={4})'.format(
            self.MYSQL_HOST, self.MYSQL_USER, self.MYSQL_PASSWORD, self.MYSQL_DB, self.MYSQL_PORT
        )
