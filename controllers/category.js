import Category from "../models/Category.js";

export const getListCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({})
      .populate("listService")
      .sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getInfoCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ _id: req.params.id }).populate(
      "listService"
    );
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const searchCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({
      title: { $regex: `${req.query.title}`, $options: "i" },
    }).populate("listService");
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json({
      message: "Tạo danh mục thành công",
      status: 200,
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    ).populate("listService");

    res
      .status(200)
      .json({ message: "Cập nhật thành công", data: updatedCategory });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  const { listId } = req.body;

  try {
    await Category.deleteMany({
      _id: { $in: listId },
    });

    res.status(200).json({ message: "Xóa danh mục thành công" });
  } catch (error) {
    next(error);
  }
};
