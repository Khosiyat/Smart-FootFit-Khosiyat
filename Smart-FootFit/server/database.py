import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        dbname='volumental',
        user='postgres',
        password='yourpassword',
        host='localhost'
    )
    return conn
