import sqlite3
import bcrypt

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute("DROP TABLE IF EXISTS users;")
cursor.execute('''
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
''')

# Bcrypt to insert initial test user
test_password_hash = bcrypt.hashpw(b"test", bcrypt.gensalt())

sql = "INSERT INTO users (username, password_hash) VALUES (?, ?);"
testUser = ("test", test_password_hash)

cursor.execute(sql, testUser)

conn.commit()
conn.close()