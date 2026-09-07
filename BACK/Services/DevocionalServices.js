import Devocional from "../Models/Devocional.js";

const PERIODOS_VALIDOS = ["semana", "hoje", "seg", "ter", "qua", "qui", "sex", "sab", "dom"];

const createDevocional = async (data) => {
  const { titulo, conteudo, versiculo, periodo } = data;

  if (!titulo || !conteudo) {
    const error = new Error("Título e conteúdo são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const periodoFinal = PERIODOS_VALIDOS.includes(periodo) ? periodo : "hoje";

  return Devocional.create({
    titulo,
    conteudo,
    versiculo: versiculo || "",
    periodo: periodoFinal,
  });
};

const listDevocionais = async () => {
  return Devocional.find().sort({ createdAt: -1 });
};

const updateDevocional = async (devocionalId, data) => {
  const { titulo, conteudo, versiculo, periodo } = data;

  if (!titulo || !conteudo) {
    const error = new Error("Título e conteúdo são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const atualizacao = { titulo, conteudo, versiculo: versiculo || "" };
  if (periodo && PERIODOS_VALIDOS.includes(periodo)) {
    atualizacao.periodo = periodo;
  }

  const devocional = await Devocional.findByIdAndUpdate(
    devocionalId,
    atualizacao,
    { new: true, runValidators: true }
  );

  if (!devocional) {
    const error = new Error("Devocional não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return devocional;
};

const deleteDevocional = async (devocionalId) => {
  if (!devocionalId) {
    const error = new Error("Informe o id do devocional");
    error.statusCode = 400;
    throw error;
  }

  const devocional = await Devocional.findByIdAndDelete(devocionalId);

  if (!devocional) {
    const error = new Error("Devocional não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return devocional;
};

export default {
  createDevocional,
  listDevocionais,
  updateDevocional,
  deleteDevocional,
};
