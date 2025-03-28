var express = require('express');
var router = express.Router();
var userModel = require('../models/User');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let data = await userModel.find({});
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET user by ID. */
// router.get('/:id', async function(req, res, next) {
//   try {
//     let { id } = req.params;
//     let data = await userModel.findById(id);
//     res.json(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

/* GET user by EMAIL */
router.get("/:email", async function (req, res) {
  try {
    let { email } = req.params;

    // Kiểm tra email hợp lệ
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Chuyển email về chữ thường
    email = email.toLowerCase();

    // Tìm user theo email
    let data = await userModel.findOne({ email }).lean();

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", data); // Debug log

    res.json(data);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



/* POST create new user. */
router.post('/', async function(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    let user = new userModel({ name, email, password, role });
    let data = await user.save();
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* PUT update user by ID. */
router.put('/:id', async function(req, res, next) {
  try {
    let { id } = req.params;
    const { name, email, password } = req.body;
    let data = await userModel.findByIdAndUpdate(id, { name, email, password }, { new: true });
    res.status(200).json({ "message": "Update successfully", data });
  } catch (error) {
    res.status(500).send(error);
  }
});

/* DELETE user by ID. */
router.delete('/:id', async function(req, res, next) {
  try {
    let { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).json({ "message": "Delete successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;