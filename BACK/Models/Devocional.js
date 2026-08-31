import mongoose from "mongoose";

const DevocionalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: { 
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "devocionais",
    timestamps: true,
  }
);

export default mongoose.model("Devocional", DevocionalSchema);