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
const Customer_1 = __importDefault(require("../../models/Customer"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/add", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer_dd = new Customer_1.default({
        customer: req.body.customer,
        location: req.body.location,
    });
    try {
        const { customer } = req.body;
        let customer_check = yield Customer_1.default.findOne({ customer });
        if (customer_check) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Customer already exists" }] });
        }
        yield customer_dd.save();
        res.json(customer_dd);
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
}));
router.get("/all", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield Customer_1.default.find().sort("customer");
    res.json(customers);
}));
router.delete("/delete/:customer_id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let customer = yield Customer_1.default.findOne({ _id: req.params.customer_id });
    if (!customer) {
        return res.status(404).json({ msg: "Customer not found." });
    }
    if (req.user.role !== "admin") {
        return res
            .status(400)
            .json({ msg: "You don't have permission to delete user" });
    }
    yield Customer_1.default.deleteOne({ _id: req.params.customer_id });
    res.json({ msg: "Delete Successfully" });
}));
exports.default = router;
//# sourceMappingURL=customer.js.map