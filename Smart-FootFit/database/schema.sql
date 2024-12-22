-- CREATE TABLE foot_scans (
--     id SERIAL PRIMARY KEY,
--     file_path TEXT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );



-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100),
--     email VARCHAR(100)
-- );

-- CREATE TABLE shoes (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id),
--     model_name VARCHAR(100),
--     file_path VARCHAR(200)
-- );

-- CREATE TABLE foot_scans (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id),
--     file_path VARCHAR(200)
-- );

-- CREATE TABLE recommendations (
--     id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(id),
--     shoe_id INT REFERENCES shoes(id),
--     score FLOAT
-- );




CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);

CREATE TABLE foot_scans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    file_path VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shoe_recommendations (
    id SERIAL PRIMARY KEY,
    foot_scan_id INTEGER REFERENCES foot_scans(id),
    shoe_size VARCHAR(10),
    shoe_model VARCHAR(100),
    recommended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
