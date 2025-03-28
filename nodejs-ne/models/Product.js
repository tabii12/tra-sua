const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let productSchema = new Schema({
    id: {
        type: ObjectId,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category", 
        required: true
    },
})

module.exports = mongoose.model('Product', productSchema) || mongoose.models.Product;