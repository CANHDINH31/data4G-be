import Service from "../models/Service.js";
import Category from "../models/Category.js";

export const addToCategory = async (req, res, next) => {
  try {
    const { idCategory, idService } = req.body;
    const category = await Category.findById(idCategory);
    const newIdService = idService.filter(
      i => !category?.listService.includes(i)
    );

    let result = await Category.findByIdAndUpdate(
      { _id: idCategory },
      { $push: { listService: { $each: newIdService } } }
    );
    return res
      .status(200)
      .json({ message: "Thêm vào danh mục thành công", data: result });
  } catch (error) {
    next(error);
  }
};

export const searchService = async (req, res, next) => {
  try {
    const services = await Service.find({
      title: { $regex: `${req.query.title}`, $options: "i" },
    });
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

export const getListService = async (req, res, next) => {
  try {
    const services = await Service.find({}).sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

export const createService = async (req, res, next) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(200).json({
      message: "Tạo dịch vụ thành công",
      status: 200,
      data: newService,
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Cập nhật dịch vụ thành công", data: updatedService });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  const { listId } = req.body;

  try {
    await Service.deleteMany({
      _id: { $in: listId },
    });

    const categories = await Category.find({ listService: { $in: listId } });

    await Promise.all(
      categories.map(async category => {
        category.listService = category.listService.filter(
          item => !listId.includes(item.toString())
        );

        await category.save();
      })
    );

    res.status(200).json({ message: "Xóa dịch vụ thành công" });
  } catch (error) {
    next(error);
  }
};
