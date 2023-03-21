"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('About to start a server');
const express_1 = __importDefault(require("express"));
const serve_index_1 = __importDefault(require("serve-index"));
const app = (0, express_1.default)();
const port = 3000;
app.use((req, res, next) => {
    console.log('url:', req.path);
    next();
});
app.use(express_1.default.static('.'));
app.use((0, serve_index_1.default)('.', { icons: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
