import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    listService: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
