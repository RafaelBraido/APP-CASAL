import mongoose from "mongoose";

const DevocionalSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    conteudo: {
      type: String,
      required: true,
    },
    versiculo: {
      type: String,
      trim: true,
      default: "",
    },
    autor: {
      type: String,
      trim: true,
      default: "Pastores Rodrigo & Suelen Labiato",
    },
    periodo: {
      type: String,
      trim: true,
      default: "hoje",
    },
  },
  {
    collection: "devocionais",
    timestamps: true,
  }
);

export default mongoose.model("Devocional", DevocionalSchema);
