CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL
);
INSERT OR REPLACE INTO articles VALUES
    (1, 'First article', 'Neque porro quisquam est qui'),
    (2, 'Second article', 'ipsum quia dolor sit amet'),
    (3, 'Last article', 'dolorem consectetur, adipisci velit').
    