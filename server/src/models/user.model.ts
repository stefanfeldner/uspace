import { PrismaClient } from '@prisma/client';
import { User } from '../interfaces/user.interface';
import { ErrorResponse } from '../interfaces/error.interface';

const prisma = new PrismaClient();

export class UserModel {

    async createUser(req: User) {
        try {
            const { email, email_verified, username, picture_url, sub } = req;

            return await prisma.user.create({
                data: {
                    email: email,
                    email_verified: email_verified,
                    username: username,
                    picture_url: picture_url,
                    sub: sub,
                },
            });
        } catch (error) {
            console.error(error)
            return {
                error: 'Could not create User'
            }
        }
    }

    async getUser(user_id: string) {
        try {
            return await prisma.user.findUnique({
                where: {
                    sub: user_id,
                },
            });
        } catch (error) {
            console.error(error)
            return {
                error: 'Could not find User'
            }
        }
    }

}

