const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let categorySchema = new Schema({
    id: {
        type: ObjectId,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
});

module.exports = mongoose.model('Category', categorySchema) || mongoose.models.Category;