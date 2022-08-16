-- Create users table
CREATE TABLE IF NOT EXISTS users(
    user_id VARCHAR(64) PRIMARY KEY UNIQUE NOT NULL,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(64) UNIQUE,
    hashed_pass VARCHAR NOT NULL,
    salt VARCHAR(255),
    access_token VARCHAR,
    avatar VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories(
    cat_id VARCHAR(64) PRIMARY KEY UNIQUE NOT NULL,
    cat_name VARCHAR(64) UNIQUE NOT NULL,
    cat_desc VARCHAR(64)
);

-- Create subcategories table
CREATE TABLE IF NOT EXISTS sub_categories(
    subcat_id VARCHAR(64) PRIMARY KEY UNIQUE NOT NULL,
    subcat_name VARCHAR(64) UNIQUE NOT NULL,
    subcat_desc VARCHAR(64) UNIQUE NOT NULL,
    sub_to VARCHAR(64) REFERENCES categories(cat_id)
);

-- Create products table
CREATE TABLE IF NOT EXISTS products(
    product_id VARCHAR(64) PRIMARY KEY UNIQUE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_img VARCHAR(255) NOT NULL,
    product_price INTEGER NOT NULL,
    product_desc TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rates(
    rate_id VARCHAR(64) PRIMARY KEY UNIQUE NOT NULL,
    five_stars_count INTEGER NOT NULL DEFAULT 0,
    four_stars_count INTEGER NOT NULL DEFAULT 0,
    three_stars_count INTEGER NOT NULL DEFAULT 0,
    two_stars_count INTEGER NOT NULL DEFAULT 0,
    one_stars_count INTEGER NOT NULL DEFAULT 0,
    product_id VARCHAR(64) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS offers(
    offer_id VARCHAR(64) PRIMARY KEY UNIQUE NOT NULL,
    offer_name VARCHAR(128),
    offer_image VARCHAR(255),
    offer_desc TEXT,
    discount DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    product_id VARCHAR(64) REFERENCES products(product_id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);