const { Schema, model } = require('mongoose');
const vipStatusSchemas = new Schema({ 
    userName: String,
    userId: String,
    balance: String,
    exp: String,
    lvl: String,
})
module.exports = model("VipStatus", vipStatusSchemas, "VipStatus")