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
const Owner_1 = __importDefault(require("../../models/Owner"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/add", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner_dd = new Owner_1.default({
        owner: req.body.owner,
        location: req.body.location,
    });
    try {
        const { owner } = req.body;
        let owner_check = yield Owner_1.default.findOne({ owner });
        if (owner_check) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Owner already exists" }] });
        }
        yield owner_dd.save();
        res.json(owner_dd);
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
}));
router.get("/all", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owners = yield Owner_1.default.find().sort("owner");
    res.json(owners);
}));
router.delete("/delete/:owner_id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let owner = yield Owner_1.default.findOne({ _id: req.params.owner_id });
    if (!owner) {
        return res.status(404).json({ msg: "Owner not found." });
    }
    if (req.user.role !== "admin") {
        return res
            .status(400)
            .json({ msg: "You don't have permission to delete user" });
    }
    yield Owner_1.default.deleteOne({ _id: req.params.owner_id });
    res.json({ msg: "Delete Successfully" });
}));
exports.default = router;
//# sourceMappingURL=owner.js.map