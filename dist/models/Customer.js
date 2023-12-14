"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    customer: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    }
});
const Customer = (0, mongoose_1.model)("Customer", CustomerSchema);
exports.default = Customer;
//# sourceMappingURL=Customer.js.map