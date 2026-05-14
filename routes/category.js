var express = require('express');
var router = express.Router();
var categoryModel = require('../models/Category');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let data = await categoryModel.find({});

  res.json(data);
});

router.get('/:id', async function(req, res, next) {
  try{
    let {id} = req.params;
    let data = await categoryModel.findById(id);
    res.json(data);
  }
  catch(error){
    res.status(500).send(error);
  }
})

router.post('/', async function(req, res, next) {
  try {
      const {name} = req.body;
      // let data = await categoryModel.create({name});
      let c = new categoryModel({name});
      let data = await c.save();
      res.json(data);
  } catch (error) {
      // console.log(error);
      res.status(500).send(error);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    let {id} = req.params;
    const {name} = req.body;
    let data = await categoryModel.findByIdAndUpdate(id, {name});
    res.status(200).json({"message": "Update successfully"});
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    let {id} = req.params;
    let data = await categoryModel.findByIdAndDelete(id);
    res.status(200).json({"message": "Delete successfully"});
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
