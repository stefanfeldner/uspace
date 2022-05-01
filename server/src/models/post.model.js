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
exports.PostModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PostModel {
    // creates a single post
    createPost(req) {
        return () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, space_id, title, tags, content } = req;
                const post = yield prisma.post.create({
                    data: {
                        space_id: space_id,
                        user_id: user_id,
                        title: title,
                        content: content,
                        tags: tags,
                    },
                });
                return post;
            }
            catch (error) {
                return error;
            }
        });
    }
    ;
    deletePost(req) {
        return () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { post_id } = req;
                const post = prisma.post.delete({
                    where: {
                        post_id: post_id,
                    }
                });
                return post;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.PostModel = PostModel;
