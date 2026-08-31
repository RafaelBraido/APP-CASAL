import mongoose from "mongoose";

const ResultadoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tipoTeste: {
      type: String,
      required: true,
      enum: ["casal", "linguagens", "temperamento", "grafico"],
    },
    titulo: {
      type: String,
      required: true,
    },
    resumo: {
      type: String,
      default: "",
    },
    detalhes: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    collection: "resultados",
    timestamps: true,
  }
);

export default mongoose.model("Resultado", ResultadoSchema);
