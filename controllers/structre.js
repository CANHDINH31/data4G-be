import Structre from "../models/Structure.js";

export const updateStructre = async (req, res, next) => {
  try {
    const updateStructre = await Structre.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Cập nhật thành công",
      data: updateStructre,
    });
  } catch (error) {
    next(error);
  }
};

export const getStructre = async (req, res, next) => {
  try {
    const data = await Structre.findOne();
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};
