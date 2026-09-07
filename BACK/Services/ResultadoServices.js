import Resultado from "../Models/Resultado.js";

const TIPOS = ["casal", "linguagens", "temperamento", "grafico"];

const salvarResultado = async (usuarioId, data) => {
  const { tipoTeste, titulo, resumo, detalhes } = data;

  if (!TIPOS.includes(tipoTeste)) {
    const error = new Error("Tipo de teste inválido");
    error.statusCode = 400;
    throw error;
  }
  if (!titulo) {
    const error = new Error("Título do resultado é obrigatório");
    error.statusCode = 400;
    throw error;
  }

  return Resultado.create({
    usuario: usuarioId,
    tipoTeste,
    titulo,
    resumo: resumo || "",
    detalhes: detalhes || {},
  });
};

const meusResultados = async (usuarioId) => {
  return Resultado.find({ usuario: usuarioId }).sort({ createdAt: -1 });
};

const estatisticas = async () => {
  const [total, porTipo] = await Promise.all([
    Resultado.countDocuments({}),
    Resultado.aggregate([
      { $group: { _id: "$tipoTeste", total: { $sum: 1 } } },
    ]),
  ]);

  const porTipoMap = {};
  TIPOS.forEach((t) => (porTipoMap[t] = 0));
  porTipo.forEach((p) => (porTipoMap[p._id] = p.total));

  return { totalTestes: total, porTipo: porTipoMap };
};

export default { salvarResultado, meusResultados, estatisticas };
