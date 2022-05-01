"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserModel {
    // creates a single user
    createUser(req) {
        return (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, email_verified, username, picture_url, sub } = req;
                const user = yield prisma.user.create({
                    data: {
                        email: email,
                        email_verified: email_verified,
                        username: username,
                        picture_url: picture_url,
                        sub: sub,
                    },
                });
                return user;
            }
            catch (error) {
                return error;
            }
        });
    }
    getUser(req) {
        return () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { sub } = req;
                const user = prisma.user.findUnique({
                    where: {
                        sub: sub,
                    }
                });
                return user;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.UserModel = UserModel;
