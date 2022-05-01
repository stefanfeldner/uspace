import { PrismaClient } from '@prisma/client';
import { User } from '../interfaces/user.interface';

const prisma = new PrismaClient();

export class UserModel {
    // creates a single user
    createUser(req: User): any {     // TODO ADD TYPE HERE
        return async (req: any) => {
            try {
                const { email, email_verified, username, picture_url, sub } = req;

                const user = await prisma.user.create({
                    data: {
                        email: email,
                        email_verified: email_verified,
                        username: username,
                        picture_url: picture_url,
                        sub: sub,
                    },
                });
                return user;

            } catch (error) {
                return error;
            }
        };
    }

    getUser(req: any) {
        return async () => {
            try {
                const { sub } = req;

                const user = prisma.user.findUnique({
                    where: {
                        sub: sub,
                    }
                });
                return user;
            } catch (error) {
                return error
            }
        }
    }

}

