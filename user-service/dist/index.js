"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const app_1 = __importDefault(require("./app")); // Import the Express app
const config_1 = __importDefault(require("./config/config")); // Import configuration
const port = config_1.default.port;
app_1.default.listen(port, () => {
    console.log(`Budfin User Service listening on port ${port}`);
});
//# sourceMappingURL=index.js.map