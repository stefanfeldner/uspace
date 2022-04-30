-- CreateSchema
CREATE SCHEMA legacy;

-- CreateTable
CREATE TABLE legacy.user (
    email VARCHAR ( 255 ) NOT NULL,
    email_verified BOOLEAN,                
    username VARCHAR( 50 ) NOT NULL,
    picture_url VARCHAR ( 255 ), 
    sub VARCHAR ( 255 ) NOT NULL, 
    user_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE legacy.space (
    space_id SERIAL PRIMARY KEY NOT NULL,    
    user_id INTEGER NOT NULL,    
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES legacy.user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE legacy.post (
    post_id SERIAL PRIMARY KEY NOT NULL,
    space_id INTEGER NOT NULL,
    title  TEXT NOT NULL,
    tags TEXT NOT NULL,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (space_id)
        REFERENCES legacy.space(space_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE legacy.comment (
    comment_id SERIAL PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES legacy.user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (post_id)
        REFERENCES legacy.post(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE legacy.space_colab (
    space_colab_id SERIAL PRIMARY KEY NOT NULL,
    space_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    canWrite BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (space_id)
        REFERENCES legacy.space(space_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id)
        REFERENCES legacy.user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (post_id)
        REFERENCES legacy.post(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateJoinTable
CREATE TABLE legacy._SpaceUser (
    A integer NOT NULL REFERENCES legacy.space(space_id) ,
    B integer NOT NULL REFERENCES legacy.user(user_id)
);
CREATE UNIQUE INDEX _SpaceUser_AB_unique ON legacy._SpaceUser (A int4_ops,B int4_ops);
CREATE INDEX _SpaceUser_B_index ON legacy._SpaceUser(B int4_ops);

-- CreateJoinTable
CREATE TABLE legacy._PostSpace (
    A integer NOT NULL REFERENCES legacy.post(post_id) ,
    B integer NOT NULL REFERENCES legacy.space(space_id)
);
CREATE UNIQUE INDEX _PostSpace_AB_unique ON legacy._PostSpace(A int4_ops,B int4_ops);
CREATE INDEX _PostSpace_B_index ON legacy._PostSpace(B int4_ops);

-- CreateJoinTable
CREATE TABLE legacy._CommentPost (
    A integer NOT NULL REFERENCES legacy.comment(comment_id) ,
    B integer NOT NULL REFERENCES legacy.user(user_id)
);
CREATE UNIQUE INDEX _CommentPost_AB_unique ON legacy._CommentPost(A int4_ops,B int4_ops);
CREATE INDEX _CommentPost_B_index ON legacy._CommentPost(B int4_ops);