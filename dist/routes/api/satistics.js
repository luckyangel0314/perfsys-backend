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
const User_1 = __importDefault(require("../../models/User"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.get("/users", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({ "role": "user" }, "email");
    if (users.length) {
        return res.json(users);
    }
    else if (!users.length) {
        res.status(204).json({ msg: "Not Found Any users!" });
    }
    else {
        res.status(400).json({ msg: "You have no permission" });
    }
}));
exports.default = router;
//# sourceMappingURL=satistics.js.map