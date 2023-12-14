"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/api/user"));
const order_1 = __importDefault(require("./routes/api/order"));
const factory_1 = __importDefault(require("./routes/api/factory"));
const customer_1 = __importDefault(require("./routes/api/customer"));
const owner_1 = __importDefault(require("./routes/api/owner"));
const satistics_1 = __importDefault(require("./routes/api/satistics"));
const dbConnect_1 = __importDefault(require("./lib/dbConnect"));
const sendGmail_1 = __importDefault(require("./routes/api/sendGmail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 5000;
const path = require("path");
(0, dbConnect_1.default)();
app.set("trust proxy", true);
app.use((0, cors_1.default)("*"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/static", express_1.default.static(__dirname + "/public"));
app.use("/api/user", user_1.default);
app.use("/api/order", order_1.default);
app.use("/api/factory", factory_1.default);
app.use("/api/customer", customer_1.default);
app.use("/api/owner", owner_1.default);
app.use("/api/satistics", satistics_1.default);
app.use("/api/sendGmail", sendGmail_1.default);
app.get("/api/get-suv-version", (req, res) => {
    res.send(JSON.stringify({
        version: "1.0.0",
        file: "suv-1.0.0.zip",
        update_at: "2023-06-14",
    }));
});
if (process.env.ENVIRONMENT === "PRODUCTION") {
    console.log("Production requested");
    app.use(express_1.default.static(path.join(__dirname, "build", "index.html")));
    app.get("/*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    }));
}
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map