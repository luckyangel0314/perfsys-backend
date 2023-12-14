"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    orderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "order",
    },
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
    factory: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    completionDate: {
        type: Date,
        default: Date.now,
    },
    readyDate: {
        type: Date,
        default: Date.now,
    },
    saveDate: {
        type: Date,
        default: Date.now,
    },
});
// async function findBidReportsByGroupId(groupId: number) {
//   return await BidReport.aggregate([
//     {
//       $lookup: {
//         from: "users",
//         localField: "userId",
//         foreignField: "_id",
//         as: "users",
//       },
//     },
//     {
//       $match: {
//         "users.0.groupid": groupId
//       },
//     },
//     {
//       $project: {
//         userId: 1,
//         bidCount: 1,
//         contactCount: 1,
//         chatting: 1,
//         successed: 1,
//         codeInGame: 1,
//         workingTime: 1,
//         other: 1,
//         reportdate: 1
//       }
//     }
//   ]).sort({ userId: "desc" })
//     .exec();
// }
const OrderHistory = (0, mongoose_1.model)("OrderHistory", OrderSchema);
exports.default = OrderHistory;
// export {
//   findBidReportsByGroupId
// }
//# sourceMappingURL=OrderHistory.js.map