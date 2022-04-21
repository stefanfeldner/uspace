const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// modular route: returns all entries in a table
const returnAllEntries = async (route) => {
  const tableName = route;

  try {
    const entries = await prisma[tableName].findMany();
    return entries;
  } catch (error) {
    return error;
  }
};

// modular route: returns single entry in a table by id
const returnEntryById = async (route, id) => {
  // extract path from url and remove slashes and plural 's'
  const tableName = route.match(/(\/\w+\/)/g)[0].slice(1, -2);

  try {
    const user = await prisma[tableName].findUnique({
      where: {
        id: +id, // parsed string
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};

// creates a single user
const createUser = async (req) => {
  try {
    const { email, email_verified, username, picture_url, sub, created_at } =
      req;

    const user = await prisma.user.create({
      data: {
        email,
        email_verified,
        username,
        picture_url,
        sub,
        created_at,
      },
    });

    return user;
  } catch (error) {
    return error;
  }
};

// creates a single space
const createSpace = async (req) => {
  try {
    const { name, created_at, description } = req;

    const space = await prisma.space.create({
      data: {
        name,
        created_at,
        description,
      },
    });

    return space;
  } catch (error) {
    return error;
  }
};

// creates a single post
const createPost = async (req) => {
  try {
    const { title, tags, created_at, content, user_id, space_id } = req;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        created_at,
        tags,
        user_id,
        space_id,
      },
    });

    return post;
  } catch (error) {
    return error;
  }
};

// creates a single comment
const createComment = async (req) => {
  try {
    const { content, created_at, user_id, post_id } = req;

    const comment = await prisma.comment.create({
      data: {
        content,
        created_at,
        user_id,
        post_id,
      },
    });

    return comment;
  } catch (error) {
    return error;
  }
};

// creates a single User_Space_Role
const createUserSpaceRole = async (req) => {
  try {
    const { user_id, space_id, role_id } = req;

    const userSpaceRole = await prisma.User_Space_Role.create({
      data: {
        user_id,
        space_id,
        role_id,
      },
    });

    return userSpaceRole;
  } catch (error) {
    return error;
  }
};

const returnSpacesAndCreators = async () => {
  const spacesAndCreators = await prisma.space.findMany({
    include: {
      User_Space_Role: {
        where: {
          role_id: 2,
        },
        select: {
          user: {
            select: {
              username: true,
              email: true,
            },
          },
        },
      },
    },
  });
  return spacesAndCreators;
};

const returnSpaceData = async (id) => {
  const spaceData = await prisma.space.findMany({
    where: {
      id: +id,
    },
    include: {
      Post: {
        include: {
          Comment: true,
        },
      },
      User_Space_Role: {
        where: {
          role_id: 2,
        },
        select: {
          user: {
            select: {
              username: true,
              email: true,
              picture_url: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return spaceData;
};

module.exports = {
  createUser,
  createSpace,
  returnAllEntries,
  returnEntryById,
  createPost,
  createComment,
  createUserSpaceRole,
  returnSpacesAndCreators,
  returnSpaceData,
};
