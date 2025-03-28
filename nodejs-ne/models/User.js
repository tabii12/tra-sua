const mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.ObjectId

let userSchema = new Schema({
    id: {
        type: ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('User', userSchema) || mongoose.models.User