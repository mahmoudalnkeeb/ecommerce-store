-- Create users table
CREATE TABLE IF NOT EXISTS users(
    user_id VARCHAR(64) PRIMARY KEY UNIQUE NOT NULL,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(64) UNIQUE,
    hashed_pass VARCHAR NOT NULL,
    salt VARCHAR(255),
    access_token VARCHAR(255),
    avatar VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admins(
    admin_id VARCHAR(64) PRIMARY KEY UNIQUE NOT NULL,
    admin_fullname VARCHAR(64) NOT NULL,
    admin_username VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(64) UNIQUE,
    hashed_pass VARCHAR NOT NULL,
    salt VARCHAR(255),
    access_token VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories(
    cat_id SERIAL PRIMARY KEY,
    cat_name VARCHAR(64) UNIQUE NOT NULL,
    cat_image VARCHAR(255) NOT NULL,
    cat_desc TEXT
);

-- Create subcategories table
CREATE TABLE IF NOT EXISTS sub_categories(
    subcat_id SERIAL PRIMARY KEY,
    subcat_name VARCHAR(64) UNIQUE NOT NULL,
    subcat_image VARCHAR(255) NOT NULL,
    subcat_desc TEXT,
    sub_to INTEGER REFERENCES categories(cat_id) ON DELETE
    SET
        NULL ON UPDATE CASCADE
);

-- Create products table
CREATE TABLE IF NOT EXISTS products(
    product_id VARCHAR(64) PRIMARY KEY UNIQUE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_price INTEGER NOT NULL,
    product_desc TEXT NOT NULL,
    product_images VARCHAR [],
    product_category INTEGER REFERENCES categories(cat_id) ON DELETE
    SET
        NULL ON UPDATE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rates(
    rate_id SERIAL PRIMARY KEY,
    rate_value INTEGER,
    rate_text TEXT,
    product_id VARCHAR(64) REFERENCES products(product_id) ON DELETE
    SET
        NULL ON UPDATE CASCADE,
        user_id VARCHAR(64) REFERENCES users(user_id) ON DELETE
    SET
        NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS offers(
    offer_id SERIAL PRIMARY KEY,
    offer_name VARCHAR(128),
    offer_image VARCHAR(255),
    offer_desc TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    product_id VARCHAR(64) REFERENCES products(product_id) ON DELETE
    SET
        NULL ON UPDATE CASCADE
);

-- create discounts table
CREATE TABLE IF NOT EXISTS discounts(
    discount_id SERIAL PRIMARY KEY,
    discount_value DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    discount_time INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    product_id VARCHAR(64) REFERENCES products(product_id) ON DELETE
    SET
        NULL ON UPDATE CASCADE
);

-- coupons 
CREATE TABLE IF NOT EXISTS coupons(
    coupon_id SERIAL PRIMARY KEY,
    coupon_code VARCHAR(32) NOT NULL UNIQUE,
    discount_value DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    product_id VARCHAR(64) REFERENCES products(product_id) ON DELETE
    SET
        NULL ON UPDATE CASCADE
);

-- orders 
CREATE TABLE IF NOT EXISTS orders(
    order_id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id VARCHAR(64) REFERENCES users(user_id) ON DELETE
    SET
        NULL ON UPDATE CASCADE,
        product_id VARCHAR(64) REFERENCES products(product_id) ON DELETE
    SET
        NULL ON UPDATE CASCADE,
);