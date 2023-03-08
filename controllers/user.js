import { createError } from "../error.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};

export const addTocart = async (req, res, next) => {
  const { userId, products } = req.body;
  try {
    const user = await User.findById(userId).populate("cart.product");
    const productIds = products.map(p => p.productId);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    const invalidProducts = products.filter(p => {
      const dbProduct = dbProducts.find(dp => dp.id === p.productId);
      return !dbProduct || dbProduct.quantity < p.quantity;
    });

    if (invalidProducts.length > 0) {
      return res.status(200).json({
        message: "Sản phẩm tạm thời hết hàng, vui lòng đặt lại sau",
        invalidProducts,
        status: 201,
      });
    }

    products.forEach(p => {
      const cartItem = user.cart.find(item => item.product.id === p.productId);
      if (cartItem) {
        cartItem.quantity += p.quantity;
      } else {
        user.cart.push({ product: p.productId, quantity: p.quantity });
      }

      const dbProduct = dbProducts.find(dp => dp.id === p.productId);
      dbProduct.quantity -= p.quantity;
    });

    await user.save();
    await Product.bulkWrite(
      dbProducts.map(p => ({
        updateOne: {
          filter: { _id: p.id },
          update: { quantity: p.quantity },
        },
      }))
    );
    res.status(200).json({
      message: "Sản phẩm được thêm vào giỏ hàng thành công",
      user,
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const searchUser = async (req, res, next) => {
  try {
    const users = await User.find({
      email: { $regex: `${req.query.email}`, $options: "i" },
    }).populate("cart.product");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteToCart = async (req, res, next) => {
  try {
    // const user = await User.findOne({ _id: req.body.idUser });
    // const quantity = user.cart.find(
    //   i => i.product._id == req.body.idProduct
    // ).quantity;
    // console.log(quantity);
  } catch (error) {
    console.log(error);
    next(error);
  }
  try {
    const data = await User.updateOne(
      { _id: req.body.idUser },
      { $pull: { cart: req.body.idProducts } }
    );
    res.json(200).json({ message: "Xóa thành công" });
  } catch (error) {
    next(error);
  }
};

export const updateToCart = async (req, res, next) => {
  let error;
  const { userId, products } = req.body;
  try {
    const user = await User.findById(userId).populate("cart.product");
    const cart = user.cart;

    for (const product of products) {
      const { productId, quantity } = product;

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
      const cartItem = cart.find(item => item.product.id === productId);
      const infoProduct = await Product.findById(productId);

      if (!cartItem) {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào
        if (quantity < infoProduct.quantity) {
          cart.push({ product: productId, quantity });
          infoProduct.quantity -= quantity;
          await infoProduct.save();
        }
      } else {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật lại quantity
        if (quantity <= infoProduct.quantity) {
          cartItem.quantity += quantity;
          infoProduct.quantity -= quantity;
          await infoProduct.save();
        } else {
          error = `${infoProduct.title} hiện còn ${infoProduct.quantity} sản phẩm trong kho. Vui lòng đặt lại sản phẩm này.`;
        }
      }
    }

    // Những product bị xóa khỏi cart
    const listIdProduct = products?.map(i => i.productId);
    const listIdCart = cart.map(i => i.product._id.toString());

    const idRemoveFromCart = listIdCart?.filter(
      i => !listIdProduct.includes(i)
    );

    if (idRemoveFromCart?.length > 0) {
      const removedItems = user.cart.filter(item =>
        idRemoveFromCart.includes(item.product._id.toString())
      );

      user.cart = user.cart.filter(
        item => !idRemoveFromCart.includes(item.product._id.toString())
      );

      const updateProduct = removedItems.map(item => ({
        quantity: item.quantity,
        id: item.product._id,
      }));

      const updatePromises = updateProduct.map(item => {
        return Product.findByIdAndUpdate(
          item.id,
          { $inc: { quantity: item.quantity } },
          { new: true }
        );
      });
      await Promise.all(updatePromises);
    }
    await user.save();

    res
      .status(200)
      .json({ user: user, message: "Cập nhật giỏ hàng thành công", error });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("cart.product");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
