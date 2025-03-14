"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
class AuthController {
    constructor() {
        this.register = async (req, res) => {
            try {
                const newUser = await this.userService.createUser(req.body);
                res.status(201).json({ message: 'User registered successfully', user: newUser });
            }
            catch (error) {
                console.error('Error registering user:', error);
                res.status(500).json({ message: 'Error registering user', error: error.message });
            }
        };
        this.login = async (req, res) => {
            try {
                const token = await this.userService.loginUser(req.body);
                res.status(200).json({ message: 'Login successful', token: token });
            }
            catch (error) {
                console.error('Error logging in user:', error);
                res.status(401).json({ message: 'Login failed', error: error.message });
            }
        };
        this.profile = async (req, res) => {
            try {
                // Get the user information from req.user (populated by authMiddleware)
                const user = req.user;
                if (!user) {
                    return res.status(401).json({ message: 'Unauthorized: User information not found in JWT' }); // Reverted to 401 - semantically more accurate
                }
                // Return user profile information
                res.status(200).json({
                    message: 'Profile retrieved successfully',
                    user: {
                        userId: user.userId,
                        email: user.email,
                        username: user.username,
                        roles: user.roles,
                    }
                });
            }
            catch (error) {
                console.error('Error accessing profile:', error);
                res.status(500).json({ message: 'Error accessing profile', error: error.message });
            }
        };
        this.userService = new user_service_1.default();
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map