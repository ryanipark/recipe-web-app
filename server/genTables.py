import sqlite3
import bcrypt

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

cursor.execute("DROP TABLE IF EXISTS users;")
cursor.execute("DROP TABLE IF EXISTS recipe;")
cursor.execute("DROP TABLE IF EXISTS tag;")
cursor.execute("DROP TABLE IF EXISTS ingredients;")
cursor.execute("DROP TABLE IF EXISTS steps;")

cursor.execute('''
    CREATE TABLE recipe (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_by TEXT NOT NULL,
        serving_size TEXT NOT NULL,
        time_it_takes TEXT NOT NULL,
        notes TEXT,
        images TEXT
    )
''')

cursor.execute('''
    CREATE TABLE tag (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER NOT NULL,
        tag TEXT,
        FOREIGN KEY (recipe_id) REFERENCES Recipe(id)
    )
''')

cursor.execute('''
    CREATE TABLE ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER NOT NULL,
        ingredient TEXT,
        FOREIGN KEY (recipe_id) REFERENCES Recipe(id)
    )
''')

cursor.execute('''
    CREATE TABLE steps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER NOT NULL,
        step_number INTEGER,
        step_description TEXT,
        FOREIGN KEY (recipe_id) REFERENCES Recipe(id)
    )
''')

# Test Recipe
cursor.execute("INSERT INTO recipe (name, created_by, serving_size, time_it_takes, notes, images) VALUES ('Hamburger', 'Test Testington', '1-2','45 minutes','Great for sunny day', 'image.png');")
cursor.execute("INSERT INTO ingredients (recipe_id, ingredient) VALUES (1, '1b ground beef 75/25');")
cursor.execute("INSERT INTO ingredients (recipe_id, ingredient) VALUES (1, 'Your choice of bun');")
cursor.execute("INSERT INTO ingredients (recipe_id, ingredient) VALUES (1, 'Lawrys seasoned salt');")
cursor.execute("INSERT INTO tag (recipe_id, tag) VALUES (1, 'BBQ');")
cursor.execute("INSERT INTO tag (recipe_id, tag) VALUES (1, '1-3 people');")
cursor.execute("INSERT INTO tag (recipe_id, tag) VALUES (1, 'Grill');")
cursor.execute("INSERT INTO steps (recipe_id, step_number, step_description) VALUES (1, 1, 'Heat grill to 350');")
cursor.execute("INSERT INTO steps (recipe_id, step_number, step_description) VALUES (1, 2, 'Roll meat into a ball');")
cursor.execute("INSERT INTO steps (recipe_id, step_number, step_description) VALUES (1, 3, 'Flaten the ball to your prefrence');")
cursor.execute("INSERT INTO steps (recipe_id, step_number, step_description) VALUES (1, 4, 'Repeat this process desired amount of patties');")
cursor.execute("INSERT INTO steps (recipe_id, step_number, step_description) VALUES (1, 5, 'Place paddies on the grill seasoning with Lawrys seasoned salt');")
cursor.execute("INSERT INTO steps (recipe_id, step_number, step_description) VALUES (1, 6, 'Take the patties off the grill after 30 minutes');")
cursor.execute("INSERT INTO steps (recipe_id, step_number, step_description) VALUES (1, 7, 'Place burger on a bun');")
cursor.execute("INSERT INTO steps (recipe_id, step_number, step_description) VALUES (1, 8, 'Enjoy your poorly grilled burgers!');")


cursor.execute('''
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
''')

# Bcrypt to insert initial test user
test_password_hash = bcrypt.hashpw(b"test", bcrypt.gensalt())

sql = "INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?);"
testUser = ("test", test_password_hash, "test@gmail.com")

cursor.execute(sql, testUser)

conn.commit()
conn.close()