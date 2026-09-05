import mongoose from "mongoose";

const PregacaoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descricao: {
      type: String,
      trim: true,
      default: "",
    },
    youtubeUrl: {
      type: String,
      required: true,
      trim: true,
    },
    youtubeId: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "pregacoes",
    timestamps: true,
  }
);

export default mongoose.model("Pregacao", PregacaoSchema);
