"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes")); // Import auth routes
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parse JSON request bodies
// Routes
app.use('/auth', auth_routes_1.default); // Mount auth routes under /auth path
// Default route for API health check
app.get('/', (req, res) => {
    res.status(200).send({ message: 'Budfin User Service is running' });
});
exports.default = app;
//# sourceMappingURL=app.js.map