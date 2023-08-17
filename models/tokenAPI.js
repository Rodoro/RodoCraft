const { Schema, model } = require('mongoose');
const APISchemas = new Schema({ 
    password: String,
    name: String,
})
module.exports = model("API", APISchemas, "API")