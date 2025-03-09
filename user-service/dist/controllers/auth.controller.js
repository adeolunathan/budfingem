"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service")); // Import UserService
class AuthController {
    constructor() {
        this.register = async (req, res) => {
            try {
                // Call UserService to register user (not implemented yet)
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
                // Call UserService to login user (not implemented yet)
                const token = await this.userService.loginUser(req.body);
                res.status(200).json({ message: 'Login successful', token: token });
            }
            catch (error) {
                console.error('Error logging in user:', error);
                res.status(401).json({ message: 'Login failed', error: error.message }); // 401 Unauthorized for login failures
            }
        };
        this.userService = new user_service_1.default(); // Create an instance of UserService
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map