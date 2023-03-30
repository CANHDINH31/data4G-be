import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("listService");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const searchUser = async (req, res, next) => {
  const { query } = req.query;
  try {
    const users = await User.find({
      $or: [
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
      ],
    })
      .select("-password")
      .populate("listService");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const updateInfo = async (req, res, next) => {
  const { password, ...newData } = req.body;
  let hash;

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(req.body.password, salt);
  }

  const newPayLoads = {
    ...newData,
    ...(hash && { password: hash }),
  };

  const isExistPhone = await User.findOne({
    phone: req.body?.phone,
    _id: { $ne: req.params.id },
  });

  if (isExistPhone)
    return res.status(200).json({
      message: "Số điện thoại đã tồn tại, vui lòng chọn số điện thoại khác",
      status: 404,
    });

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: newPayLoads,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Cập nhật thành công",
      status: 200,
      ...updatedUser._doc,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleFavourite = async (req, res, next) => {
  try {
    const { idUser, idService } = req.body;

    const user = await User.findOne({
      _id: idUser,
      listService: { $in: [idService] },
    });
    if (user) {
      let result = await User.findByIdAndUpdate(
        { _id: idUser },
        { $pull: { listService: idService } },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Service removed from favourites", data: result });
    } else {
      let result = await User.findByIdAndUpdate(
        { _id: idUser },
        { $push: { listService: idService } },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Service added to favourites", data: result });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { listId } = req.body;

  try {
    await User.deleteMany({
      _id: { $in: listId },
    });
    res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    next(error);
  }
};
