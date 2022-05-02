"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers/controllers");
const controller = new controllers_1.BaseController();
const router = express_1.default.Router();
// USERS
router.get('/users/:id', controller.getUser);
router.post('/users', controller.postUser);
// SPACES
router.get('/spaces/:page', controller.getAllSpaces);
router.post('/spaces', controller.postSpace);
router.delete('/spaces/:id', controller.deleteSpace);
// POSTS
router.post('/posts', controller.postPost);
router.delete('/posts/:id', controller.deletePost);
// COMMENTS
router.post('/comments', controller.postComment);
router.delete('/comments/:id', controller.deleteComment);
exports.default = router;
