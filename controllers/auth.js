import User from "../models/User.js";

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(200).json({ ...user._doc, message: "Đăng nhập thành công" });
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      res
        .status(200)
        .json({ ...savedUser._doc, message: "Đăng nhập thành công" });
    }
  } catch (err) {
    next(err);
  }
};
