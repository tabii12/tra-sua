var express = require('express');
var router = express.Router();
var productModel = require('../models/Product');

/* GET home page. */
router.get('/', async function(req, res, next) {
    let data = await productModel.find({});

    res.render('index', { products: data });
    // res.json(data);
});

module.exports = router;
