"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware")); // Import authMiddleware
const router = express_1.default.Router();
const authController = new auth_controller_1.default();
router.post('/register', authController.register);
router.post('/login', authController.login);
// Protected endpoint route - now with authMiddleware:
router.get('/profile', authMiddleware_1.default, authController.profile); // Apply authMiddleware to /profile
exports.default = router;
//# sourceMappingURL=auth.routes.js.map