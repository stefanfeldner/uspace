import { PrismaClient } from '@prisma/client';
import { User } from '../interfaces/user.interface';

const prisma = new PrismaClient();

export class UserModel {
    // creates a single user
    createUser(req: User): any {     // TODO ADD TYPE HERE
      return async (req) => {
        try {
            const { email, email_verified, username, picture_url, sub } = req;
            const user = await prisma.user.create({
                data: {
                    email,
                    email_verified,
                    username,
                    picture_url,
                    sub
                },
            });

            return user;
        } catch (error) {
            return error;
        }
    };
}

}

