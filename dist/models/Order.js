"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    orderPO: {
        type: Number,
        required: true,
    },
    customer: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    factory: {
        type: String,
        required: true,
    },
    completionDate: {
        type: Date,
        default: Date.now
    },
    readyDate: {
        type: Date,
        default: Date.now
    },
    qScore: {
        type: String
    },
    cScore: {
        type: String
    },
    pScore: {
        type: String
    }
});
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;
//# sourceMappingURL=Order.js.map