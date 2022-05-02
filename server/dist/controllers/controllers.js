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
exports.BaseController = void 0;
const user_model_1 = require("../models/user.model");
const post_model_1 = require("../models/post.model");
const space_model_1 = require("../models/space.model");
const comment_model_1 = require("../models/comment.model");
const userModel = new user_model_1.UserModel;
const postModel = new post_model_1.PostModel;
const spaceModel = new space_model_1.SpaceModel;
const commentModel = new comment_model_1.CommentModel;
class BaseController {
    // creates a single user
    postUser() {
        (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel.createUser(req.body);
                res.status(201);
                res.send(user);
            }
            catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        });
    }
    // find user by sub
    getUser() {
        (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield userModel.getUser(req.params.id);
                res.status(201);
                res.send(deletedUser);
            }
            catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        });
    }
    // create a space
    postSpace() {
        (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const space = yield spaceModel.createSpace(req.body);
                res.status(201);
                res.send(space);
            }
            catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        });
    }
    // get 20 own spaces and 20 other spaces 
    getAllSpaces() {
        (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allSpaces = yield spaceModel.getSpaces(req.params.page);
                res.status(201);
                res.send(allSpaces);
            }
            catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        });
    }
    // delete a space
    deleteSpace() {
        (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedSpace = yield spaceModel.deleteSpace(req.params.id);
                res.status(201);
                res.send(deletedSpace);
            }
            catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        });
    }
    // post a post
    postPost() {
        (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield postModel.createPost(req.body);
                res.status(201);
                res.send(post);
            }
            catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        });
    }
    // delete post by id
    deletePost() {
        (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPost = yield postModel.deletePost(req.params.id);
                res.status(201);
                res.send(deletedPost);
            }
            catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        });
    }
    // post a comment 
    postComment() {
        (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield commentModel.createComment(req.body);
                res.status(201);
                res.send(comment);
            }
            catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        });
    }
    // delete comment by id
    deleteComment() {
        (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedComment = yield commentModel.deleteComment(req.params.id);
                res.status(201);
                res.send(deletedComment);
            }
            catch (error) {
                res.status(500);
                res.send(JSON.stringify(error));
            }
        });
    }
}
exports.BaseController = BaseController;
