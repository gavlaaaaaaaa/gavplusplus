drop TABLE IF EXISTS post;

CREATE TABLE post (
    id INTEGER PRIMARY KEY,
    author TEXT,
    title TEXT,
    filename TEXT,
    create_time DATETIME
);

