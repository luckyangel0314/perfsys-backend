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
const Factory_1 = __importDefault(require("../../models/Factory"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/add", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const factory_dd = new Factory_1.default({
        factory: req.body.factory,
        location: req.body.location,
        employee: req.body.employee,
    });
    try {
        const { factory } = req.body;
        let factory_check = yield Factory_1.default.findOne({ factory });
        if (factory_check) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Factory already exists" }] });
        }
        yield factory_dd.save();
        res.json(factory_dd);
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
}));
router.get("/all", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const factories = yield Factory_1.default.find().sort("factory");
    res.json(factories);
}));
router.delete("/delete/:factory_id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let factory = yield Factory_1.default.findOne({ _id: req.params.factory_id });
    if (!factory) {
        return res.status(404).json({ msg: "User not found." });
    }
    if (req.user.role !== "admin") {
        return res
            .status(400)
            .json({ msg: "You don't have permission to delete user" });
    }
    yield Factory_1.default.deleteOne({ _id: req.params.factory_id });
    res.json({ msg: "Delete Successfully" });
}));
exports.default = router;
//# sourceMappingURL=factory.js.map