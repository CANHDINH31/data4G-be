import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "listService"
    );
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

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const isExistPhone = await User.findOne({ phone: req.body?.phone });

    if (isExistPhone)
      res
        .status(200)
        .json({
          message: "Số điện thoại đã tồn tại, vui lòng chọn số điện thoại khác",
          status: 404,
        });

    if (user) {
      res.status(200).json({ message: "Email đã tồn tại", status: 404 });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
      await newUser.save();
      res
        .status(200)
        .json({ message: "Tạo tài khoản thành công", status: 200 });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "listService"
    );
    if (!user) {
      res.json({ status: 201, message: "Email không tồn tại" });
    } else {
      if (user?.password) {
        const isCorrect = await bcrypt.compare(
          req.body.password,
          user?.password
        );
        if (!isCorrect) {
          res.json({ status: 202, message: "Mật khẩu không đúng" });
        } else {
          const { password, ...others } = user._doc;
          res.status(200).json({
            ...others,
            status: 200,
            message: "Đăng nhập thành công",
          });
        }
      } else {
        res.json({
          status: 201,
          message: "Đăng nhập email này với tài khoản Google",
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
