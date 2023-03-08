import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    isNew: {
      type: Boolean,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shipping: {
      type: String,
      required: true,
    },
    listDiffImg: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
