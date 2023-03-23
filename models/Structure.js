import mongoose from "mongoose";
const StructreSchema = new mongoose.Schema(
  {
    offerCheck: {
      type: String,
      required: true,
    },
    registerSms: {
      type: String,
      required: true,
    },
    registerLink: {
      type: String,
      required: true,
    },
    zaloLink: {
      type: String,
      required: true,
    },
    facebookLink: {
      type: String,
      required: true,
    },
    takeCareGuest: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Structre", StructreSchema);
