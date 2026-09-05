import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true, // Removido o unique: true para evitar bugs no MongoDB
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export default mongoose.model("User", UsersSchema);