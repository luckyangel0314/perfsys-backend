"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FactorySchema = new mongoose_1.Schema({
    factory: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    employee: {
        type: String,
    }
});
const Factory = (0, mongoose_1.model)("Factory", FactorySchema);
exports.default = Factory;
//# sourceMappingURL=Factory.js.map