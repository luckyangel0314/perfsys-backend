"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OwnerSchema = new mongoose_1.Schema({
    owner: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    }
});
const Owner = (0, mongoose_1.model)("Owner", OwnerSchema);
exports.default = Owner;
//# sourceMappingURL=Owner.js.map