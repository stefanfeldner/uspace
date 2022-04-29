import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// creates a single user
const createUser = async (req) => {
  try {
    const { email, email_verified: emailVerified, username, picture_url: pictureUrl, sub, created_at: createdAt } =
      req;

    const user = await prisma.user.create({
      data: {
        email,
        emailVerified,
        username,
        pictureUrl,
        sub,
        createdAt
      }
    });

    return user;
  } catch (error) {
    return error;
  }
};

// find user by sub and return
const returnUserBySub = async (sub) => {
  console.log(sub);

  try {
    const user = await prisma.user.findFirst({
      where: {
        sub
      }
    });
    return user;
  } catch (error) {
    return error;
  }
}

export default {
  createUser,
  returnUserBySub
};
