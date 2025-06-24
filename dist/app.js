"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const controller_1 = require("./controller/controller");
app.use(express_1.default.json());
// add books
app.use("/api", controller_1.router);
app.use('/', controller_1.router);
exports.default = app;
