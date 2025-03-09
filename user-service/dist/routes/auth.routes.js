"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller")); // Import AuthController
const router = express_1.default.Router();
const authController = new auth_controller_1.default(); // Create an instance of AuthController
// Define authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map