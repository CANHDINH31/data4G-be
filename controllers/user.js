import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
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
