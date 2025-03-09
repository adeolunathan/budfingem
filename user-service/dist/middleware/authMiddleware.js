"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract JWT from Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Authentication required: No token provided' }); // 401 if no token
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret); // Verify and decode JWT
        req.user = decoded; // Attach user payload to the request object (augmenting Request type - see below)
        next(); // Call next middleware or route handler  <-- CRUCIAL: Ensure next() is being called in success case
    }
    catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).json({ message: 'Authentication failed: Invalid token' }); // 401 for invalid token
        // Do NOT call next() in error case, as authentication failed.
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map