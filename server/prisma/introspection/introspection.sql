-- CreateSchema
CREATE SCHEMA legacy;

-- CreateTable
CREATE TABLE legacy.user (
    email VARCHAR ( 255 ) NOT NULL,
    email_verified BOOLEAN,                
    username VARCHAR( 50 ) NOT NULL,
    picture_url VARCHAR ( 255 ), 
    sub VARCHAR ( 255 ) PRIMARY KEY NOT NULL, 
    created_at TIMESTAMP NOT NULL
);

-- CreateTable
CREATE TABLE legacy.space (
    space_id SERIAL PRIMARY KEY NOT NULL,    
    user_id VARCHAR ( 255 ) NOT NULL,    
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES legacy.user(sub)
);

-- CreateTable
CREATE TABLE legacy.post (
    post_id SERIAL PRIMARY KEY NOT NULL,
    space_id INTEGER NOT NULL,
    title  TEXT NOT NULL,
    tags TEXT NOT NULL,
    content TEXT,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (space_id)
        REFERENCES legacy.space(space_id)
);

-- CreateTable
CREATE TABLE legacy.comment (
    comment_id SERIAL PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    user_id VARCHAR ( 255 ) NOT NULL,
    post_id INTEGER NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES legacy.user(sub),
    FOREIGN KEY (post_id)
        REFERENCES legacy.post(post_id)
);

-- CreateTable
CREATE TABLE legacy.space_colab (
    space_colab_id SERIAL PRIMARY KEY NOT NULL,
    space_id INTEGER NOT NULL,
    user_id VARCHAR ( 255 ) NOT NULL,
    post_id INTEGER NOT NULL,
    canWrite BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (space_id)
        REFERENCES legacy.space(space_id),
    FOREIGN KEY (user_id)
        REFERENCES legacy.user(sub),
    FOREIGN KEY (post_id)
        REFERENCES legacy.post(post_id)
);


