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
const mongoose_1 = __importDefault(require("mongoose"));
const Order_1 = __importDefault(require("../../models/Order"));
const OrderHistory_1 = __importDefault(require("../../models/OrderHistory"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post("/create", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user._id);
    const order = new Order_1.default({
        userId: new mongoose_1.default.Types.ObjectId(req.user._id),
        orderPO: req.body.orderPO,
        factory: req.body.factory,
        customer: req.body.customer,
        owner: req.body.owner,
        completionDate: req.body.completionDate,
        readyDate: req.body.readyDate,
        qScore: req.body.qScore,
        cScore: req.body.cScore,
        pScore: req.body.pScore,
    });
    try {
        const savedOrder = yield order.save();
        const orderHistory = new OrderHistory_1.default({
            orderId: new mongoose_1.default.Types.ObjectId(String(savedOrder._id)),
            userId: new mongoose_1.default.Types.ObjectId(req.user._id),
            orderPO: req.body.orderPO,
            factory: req.body.factory,
            customer: req.body.customer,
            owner: req.body.owner,
            completionDate: req.body.completionDate,
            readyDate: req.body.readyDate,
        });
        yield orderHistory.save();
        res.json(order);
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
}));
router.get("/getFactoryByCustomer/:customer", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.find({ customer: req.params.customer });
        if (order.length) {
            const filterorders = yield Order_1.default.aggregate([
                {
                    $match: {
                        customer: { $eq: req.params.customer },
                    },
                },
                {
                    $group: {
                        _id: { factory: "$factory" },
                        count: { $sum: 1 },
                    },
                },
            ]);
            console.log(filterorders);
            if (filterorders.length) {
                return res.json(filterorders);
            }
            else if (!filterorders.length) {
                res.status(204).json({ msg: "Not Found Any Orders!" });
            }
            else {
                res.status(400).json({ msg: "You have no permission" });
            }
            res.json(filterorders);
        }
    }
    catch (error) {
        res.status(500).send({ msg: "An error currupted." });
    }
}));
router.get("/getFactoryByOwner/:owner", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.find({ owner: req.params.owner });
        if (order.length) {
            const filterorders = yield Order_1.default.aggregate([
                {
                    $match: {
                        owner: { $eq: req.params.owner },
                    },
                },
                {
                    $group: {
                        _id: { factory: "$factory" },
                        count: { $sum: 1 },
                    },
                },
            ]);
            console.log(filterorders);
            if (filterorders.length) {
                return res.json(filterorders);
            }
            else if (!filterorders.length) {
                res.status(204).json({ msg: "Not Found Any Orders!" });
            }
            else {
                res.status(400).json({ msg: "You have no permission" });
            }
            res.json(filterorders);
        }
    }
    catch (error) {
        res.status(500).send({ msg: "An error currupted." });
    }
}));
router.put("/complete/:orderId/:userId", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findById(req.params.orderId);
    console.log("score length", order.qScore.length);
    const completeOrder = {
        _id: req.params.orderId,
        qScore: req.body.qScore,
        cScore: req.body.cScore,
        pScore: req.body.pScore,
    };
    if (order.qScore.length == 0) {
        yield Order_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(req.params.orderId) }, completeOrder);
        const updatedOrders = yield Order_1.default.find({ userId: req.params.userId });
        return res.json(updatedOrders);
    }
    else {
        return res.status(400).json({ msg: "Not updated" });
    }
}));
router.post("/addhistory/:orderId", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user._id);
    const orderHistory = new OrderHistory_1.default({
        userId: new mongoose_1.default.Types.ObjectId(req.user._id),
        orderId: req.params.orderId,
        orderPO: req.body.orderPO,
        factory: req.body.factory,
        customer: req.body.customer,
        owner: req.body.owner,
        completionDate: req.body.completionDate,
        readyDate: req.body.readyDate,
    });
    try {
        yield orderHistory.save();
        res.json(orderHistory);
    }
    catch (error) {
        res.status(400).json({ msg: error });
    }
}));
router.get("/:userid", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_1.default.find({
        userId: req.params.userid,
    });
    if (orders.length) {
        return res.json(orders);
    }
    else if (!orders.length) {
        res.status(204).json({ msg: "Not Found Any Orders!" });
    }
    else {
        res.status(400).json({ msg: "You have no permission" });
    }
}));
router.get("/getScoreCustomer/:customer", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_1.default.find({ customer: req.params.customer });
    if (orders.length) {
        return res.json(orders);
    }
    else if (!orders.length) {
        res.status(204).json({ msg: "Not Found Any Orders!" });
    }
    else {
        res.status(400).json({ msg: "You have no permission" });
    }
}));
router.get("/getScoreFactory/:factory", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_1.default.find({ factory: req.params.factory });
    if (orders.length) {
        return res.json(orders);
    }
    else if (!orders.length) {
        res.status(204).json({ msg: "Not Found Any Orders!" });
    }
    else {
        res.status(400).json({ msg: "You have no permission" });
    }
}));
router.get("/getScoreOwner/:owner", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_1.default.find({ owner: req.params.owner });
    if (orders.length) {
        return res.json(orders);
    }
    else if (!orders.length) {
        res.status(204).json({ msg: "Not Found Any Orders!" });
    }
    else {
        res.status(400).json({ msg: "You have no permission" });
    }
}));
router.get("/history/:orderid", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield OrderHistory_1.default.find({
        orderId: req.params.orderid,
    });
    console.log("backend history", req.params.orderid);
    if (orders.length) {
        return res.json(orders);
    }
    else if (!orders.length) {
        res.status(204).json({ msg: "Not Found Any Orders!" });
    }
    else {
        res.status(400).json({ msg: "You have no permission" });
    }
}));
router.put("/:orderId", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findById(req.params.orderId);
    console.log("--------Scores---------", order["qScore"]);
    const updateOrder = {
        _id: req.params.orderId,
        factory: req.body.factory,
        customer: req.body.customer,
        owner: req.body.owner,
        completionDate: req.body.completionDate,
        readyDate: req.body.readyDate,
    };
    if (order) {
        const test = yield Order_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(req.params.orderId) }, updateOrder);
        console.log("--------------test----------", test);
        const returnOrder = {
            _id: req.params.orderId,
            userId: order.userId,
            orderPO: order.orderPO,
            factory: req.body.factory,
            customer: req.body.customer,
            owner: req.body.owner,
            completionDate: req.body.completionDate,
            readyDate: req.body.readyDate,
            qScore: order.qScore,
            cScore: order.cScore,
            pScore: order.pScore
        };
        return res.json(returnOrder);
    }
    else {
        return res.status(400).json({ msg: "You have no permission" });
    }
}));
router.delete("/:orderId", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findById(req.params.orderId);
    console.log(req.params.orderId);
    if (!order) {
        console.log("not found!");
        return res.status(404).json({ msg: "Order not found!" });
    }
    yield Order_1.default.deleteOne({ _id: req.params.orderId });
    yield res.json({ msg: "Order has been deleted successfully!" });
}));
exports.default = router;
//# sourceMappingURL=order.js.map