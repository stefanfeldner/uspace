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
exports.SpaceModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class SpaceModel {
    // creates a single space
    createSpace(req) {
        return () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, owner, description } = req;
                const space = yield prisma.space.create({
                    data: {
                        name: name,
                        description: description,
                        owner: owner,
                    },
                });
                return space;
            }
            catch (error) {
                return error;
            }
        });
    }
    ;
    getSpaces(req) {
        return () => __awaiter(this, void 0, void 0, function* () {
            try {
                const allSpaces = [];
                const { owner, page } = req;
                let next = (page * 20);
                // first - 20 own spaces
                const first = prisma.space.findMany({
                    skip: next,
                    take: 20,
                    where: {
                        owner: owner,
                    },
                    orderBy: {
                        created_at: 'desc',
                    },
                    include: {
                        post: true,
                        space_colab: true,
                    },
                });
                const second = prisma.space.findMany({
                    skip: next,
                    take: 20,
                    where: {
                        owner: {
                            not: owner,
                        }
                    },
                    orderBy: {
                        created_at: 'desc',
                    },
                    include: {
                        post: true,
                        space_colab: true,
                    }
                });
                allSpaces.push(first);
                allSpaces.push(second);
                return allSpaces;
            }
            catch (error) {
                return error;
            }
        });
    }
    deleteSpace(req) {
        return () => __awaiter(this, void 0, void 0, function* () {
            const { space_id } = req;
            try {
                const space = prisma.space.delete({
                    where: {
                        space_id: space_id,
                    }
                });
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.SpaceModel = SpaceModel;
