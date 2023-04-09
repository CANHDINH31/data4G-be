import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      unique: true,
      default: 1,
    },
    display: {
      type: Boolean,
      default: false,
    },
    slug: {
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

CategorySchema.pre("save", async function (next) {
  try {
    const count = await this.constructor.countDocuments({
      position: this.position,
    });
    if (count > 0) {
      const err = new Error("Duplicate position value found");
      return next(err);
    }
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model("Category", CategorySchema);
