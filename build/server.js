"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const socket_1 = __importDefault(require("./socket"));
const port = process.env.PORT || 8080;
// tslint:disable:no-console
const server = app_1.default.listen(port, () => {
    console.log(`Listing on port ${port}`);
}).on("error", (e) => {
    console.error(e);
    process.exit(1);
});
socket_1.default(server);
//# sourceMappingURL=server.js.map