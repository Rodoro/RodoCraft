const { Schema, model } = require('mongoose');
const linkDiscordWithMinecraftSchemas  = new Schema({ 
    discordName: { type: String, required: true },
    discordId: { type: String, required: true },
    minecraftName: { type: String, required: true },
    age: { type: Number, required: true },
    howKnow: { type: String },
    hasMicrophone: { type: String },
    whitelist: { type: [String] },
    prefixes: { type: [String] },
    notification: { type: Boolean, required: true, default: false},
})
module.exports = model("LinkDiscordWithMinecraft", linkDiscordWithMinecraftSchemas, "LinkDiscordWithMinecraft");