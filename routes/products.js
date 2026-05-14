var express = require('express');
var router = express.Router();
var productModel = require('../models/Product');



//file router upload
let upload = require('../middleware/upload');

router.get('/formupload', async function(req, res, next) {
  res.render('upload', {})
});

router.post("/upload", upload.single("image"), async function (req, res) {
  try {
    console.log("📤 File nhận được:", req.file); 

    if (!req.file) {
      return res.status(400).json({ error: "⚠️ Không có file nào được tải lên!" });
    }

    const fileUrl = "http://localhost:3002/images/" + req.file.filename;
    console.log("✅ Ảnh lưu tại:", fileUrl);

    res.status(200).json({ file: fileUrl });
  } catch (error) {
    console.error("❌ Lỗi khi upload ảnh:", error);
    res.status(500).json({ error: "Lỗi server khi tải ảnh lên!" });
  }
});

/* GET home page. */
router.get('/', async function(req, res, next) {
    let data = await productModel.find({});

    res.json(data);
});

router.get('/name/:name/:price', async function(req, res, next) {
  try {
    const {name, price} = req.params;
    let data = await productModel.find({$or :[{"name": {$regex: name}}, {"price": {$regex: price}}]});
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const {id} = req.params;
    let data = await productModel.findOne({"_id": id});
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/cate/:categoryId', async function(req, res, next) {
  try {
    const { categoryId } = req.params;
    let data = await productModel.find({ category: categoryId });
    res.json(data);
  } catch (error) {
    console.error("❌ Lỗi khi lấy sản phẩm theo danh mục:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
});

router.post('/', async function(req, res) {
  try {
      const { name, price, image, category } = req.body; // 🔥 Đổi `Category` thành `category`

      // Kiểm tra dữ liệu đầu vào
      if (!name || !price || !image || !category) {
          return res.status(400).json({ error: "Thiếu dữ liệu đầu vào!" });
      }

      // Lưu vào database
      let data = await productModel.create({ name, price, image, category });

      res.status(201).json(data);
  } catch (error) {
      console.error("❌ Lỗi khi thêm sản phẩm:", error);
      res.status(500).json({ error: "Lỗi server!" });
  }
});

router.put('/:id', async function(req, res, next) {
    try {
      let {id} = req.params;
      const {name, price, image, category} = req.body;
      let data = await productModel.findByIdAndUpdate(id, {name, price, image, category});
      res.status(200).json({"message": "Update successfully"});
    } catch (error) {
      res.status(500).send(error); 
    }
});

router.delete('/:id', async function(req, res, next){
    try {
        let {id} = req.params;
        let data = await productModel.findByIdAndDelete(id);
        res.status(200).json({"message": "Delete successfully"});
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
