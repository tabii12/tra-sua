var express = require('express');
var router = express.Router();
var cartModel = require('../models/Cart');

// Lấy tất cả sản phẩm trong giỏ hàng
router.get('/', async (req, res) => {
  try {
    let data = await cartModel.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy sản phẩm theo ID
router.get('/:id', async (req, res) => {
  try {
    let { id } = req.params;
    let data = await cartModel.findById(id);
    if (!data) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm sản phẩm mới vào giỏ hàng
router.post('/', async (req, res) => {
  try {
    let { idProduct, name, price, image, category, quantity } = req.body;

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ chưa (dựa trên idProduct)
    let cartItem = await cartModel.findOne({ idProduct });
    
    if (cartItem) {
      // Nếu đã tồn tại, cập nhật số lượng
      cartItem = await cartModel.findOneAndUpdate(
        { idProduct },
        { quantity: cartItem.quantity + (quantity || 1) },
        { new: true }
      );
      return res.json(cartItem);
    }

    // Nếu chưa tồn tại, tạo mới
    let newCartItem = new cartModel({ idProduct, name, price, image, category, quantity: quantity || 1 });
    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/:id', async (req, res) => {
  try {
    let { quantity } = req.body;
    let cartItem = await cartModel.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );
    if (!cartItem) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(cartItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/:id', async (req, res) => {
  try {
    let cartItem = await cartModel.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json({ message: 'Xóa sản phẩm thành công' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;