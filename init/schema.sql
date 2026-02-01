-- ============================
-- ENUM TYPES
-- ============================
CREATE TYPE language_proficiency AS ENUM ('basic', 'fluent', 'native');
CREATE TYPE order_status AS ENUM ('pending', 'in_progress', 'delivered', 'late', 'cancelled');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================
-- USERS
-- ============================
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(30),
    password_hash TEXT NOT NULL,
    age INT,
    gender VARCHAR(20),
    bio TEXT,
    avatar_url TEXT,
    background_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- LANGUAGES (master)
-- ============================
CREATE TABLE languages (
    language_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- User ↔ Languages
CREATE TABLE user_languages (
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    language_id INT REFERENCES languages(language_id) ON DELETE CASCADE,
    proficiency language_proficiency NOT NULL,
    PRIMARY KEY (user_id, language_id)
);

-- ============================
-- SKILLS (master)
-- ============================
CREATE TABLE skills (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- User ↔ Skills
CREATE TABLE user_skills (
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    category_id INT REFERENCES skills(category_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, category_id)
);

-- ============================
-- PORTFOLIO ITEMS
-- ============================
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    title VARCHAR(255),
    mature_content BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Stores likes: one row per (post, user). Backend handles toggle logic.
CREATE TABLE post_likes (
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (post_id, user_id)
);

-- ============================
-- GIGS
-- ============================
CREATE TABLE gigs (
    gig_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    delivery_days INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- GIG PACKAGES
-- ============================
CREATE TABLE gig_packages (
    gig_package_id SERIAL PRIMARY KEY,
    gig_id INT REFERENCES gigs(gig_id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- basic / standard / premium
    price NUMERIC(10,2) NOT NULL,
    revisions_amount INT NOT NULL
);

CREATE TABLE features (
    feature_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE gig_package_features (
    gig_package_id INT REFERENCES gig_packages(gig_package_id) ON DELETE CASCADE,
    feature_id INT REFERENCES features(feature_id) ON DELETE CASCADE,
    PRIMARY KEY (gig_package_id, feature_id)
);

-- ============================
-- TAGS (master)
-- ============================
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Gig ↔ Tags
CREATE TABLE gig_tags (
    gig_id INT REFERENCES gigs(gig_id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (gig_id, tag_id)
);

CREATE TABLE post_tags (
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- ============================
-- ORDERS
-- ============================
CREATE TABLE orders (
    order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id UUID REFERENCES users(user_id),
    seller_id UUID REFERENCES users(user_id),
    gig_id INT REFERENCES gigs(gig_id),
    gig_package_id INT REFERENCES gig_packages(gig_package_id),
    price NUMERIC(10,2) NOT NULL,
    requirements TEXT,
    status order_status DEFAULT 'pending',
    deadline TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    delivered_at TIMESTAMP,
    accepted_at TIMESTAMP,
    delivered_late BOOLEAN DEFAULT FALSE
);

-- ============================
-- DELIVERIES
-- ============================
CREATE TABLE deliveries (
    delivery_id SERIAL PRIMARY KEY,
    order_id UUID REFERENCES orders(order_id) ON DELETE CASCADE,
    message TEXT,
    delivered_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- DELIVERY IMAGES
-- ============================
CREATE TABLE delivery_images (
    image_id SERIAL PRIMARY KEY,
    delivery_id INT REFERENCES deliveries(delivery_id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- REVIEWS
-- ============================
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    reviewer_id UUID REFERENCES users(user_id),
    reviewee_id UUID REFERENCES users(user_id),
    order_id UUID REFERENCES orders(order_id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================
-- MESSAGES
-- ============================
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    order_id UUID REFERENCES orders(order_id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(user_id),
    sender_id UUID REFERENCES users(user_id),
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);