"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const cors_1 = __importDefault(require("cors")); // Import the cors middleware
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// ... other imports
const app = (0, express_1.default)();
// Enable CORS for requests from your frontend origin (http://localhost:5173)
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', //  VERY IMPORTANT: Replace with your frontend URL if different
    credentials: true, // If you need to send cookies with CORS requests (not needed for JWT in headers here, but can be set to true)
}));
app.use(express_1.default.json());
// ... other middleware ...
app.use('/auth', auth_routes_1.default);
// ... routes ...
app.get('/', (req, res) => {
    res.send({ message: 'Budfin User Service is running' });
});
exports.default = app;
//# sourceMappingURL=app.js.map