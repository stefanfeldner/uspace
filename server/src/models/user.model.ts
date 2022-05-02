import { PrismaClient } from '@prisma/client';
import { User } from '../interfaces/user.interface';

const prisma = new PrismaClient();

export class UserModel {
    // creates a single user
    async createUser(req: User) {     // TODO ADD TYPE HERE
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
    }

    async getUser(id: string) {
        try {
            console.log(id)
            const user = await prisma.user.findUnique({
                where: {
                    sub: id,
                },
            });
            return user;
        } catch (error) {
            return error
        }
    }

}

