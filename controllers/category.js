const categoryModel = require("../models/Category");

// Lấy tất cả danh mục
const getAllCategories = async () => {
    try {
        let data = await categoryModel.find({});
        return data; //  Trả về dữ liệu thay vì dùng res.json()
    } catch (error) {
        console.error(" Lỗi lấy danh mục:", error);
        return null;
    }
};

// Lấy danh mục theo ID
const getCategoryById = async (id) => {
    try {
        let data = await categoryModel.findById(id);
        return data;
    } catch (error) {
        console.error(" Lỗi lấy danh mục theo ID:", error);
        return null;
    }
};

// Thêm danh mục mới
const insertCategory = async (req, res) => {
    try {
        let { name } = req.body;  //  Lấy name từ req.body
        let c = new categoryModel({ name });
        let data = await c.save();
        
        res.status(201).json({ message: "Thêm danh mục thành công", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi thêm danh mục" });
    }
};

// Cập nhật danh mục theo ID
const updateCategory = async (req, res) => {
    try {
        let { id } = req.params;
        let { name } = req.body;
        let data = await categoryModel.findByIdAndUpdate(id, { name }, { new: true });

        if (!data) {
            return res.status(404).json({ error: "Không tìm thấy danh mục để cập nhật" });
        }

        res.status(200).json({ message: "Cập nhật thành công", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi khi cập nhật danh mục" });
    }
};

// Xuất các hàm để sử dụng trong routes
module.exports = {
    getAllCategories,
    getCategoryById,
    insertCategory,
    updateCategory
};