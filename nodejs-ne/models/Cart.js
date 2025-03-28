const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let cartSchema = new Schema({
    id: {
        type: ObjectId,
    },
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require:true,
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
    quantity: {
        type: Number,
        require: true,
    },
})

module.exports = mongoose.model('Cart', cartSchema) || mongoose.models.Cart;