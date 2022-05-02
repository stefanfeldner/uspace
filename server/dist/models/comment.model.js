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
exports.CommentModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CommentModel {
    // creates a single post
    createComment(req) {
        return () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, post_id, content } = req;
                const comment = yield prisma.comment.create({
                    data: {
                        user_id: user_id,
                        post_id: post_id,
                        content: content
                    },
                });
                return comment;
            }
            catch (error) {
                return error;
            }
        });
    }
    ;
    deleteComment(req) {
        return () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { comment_id } = req;
                const comment = prisma.comment.delete({
                    where: {
                        comment_id: comment_id,
                    }
                });
                return comment;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.CommentModel = CommentModel;
