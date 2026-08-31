import Devocional from "../Models/Devocional.js";

const createDevocional = async (data) => {
  const { titulo, conteudo, versiculo } = data;

  if (!titulo || !conteudo) {
    const error = new Error("Título e conteúdo são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  return Devocional.create({
    titulo,
    conteudo,
    versiculo: versiculo || "",
  });
};

const listDevocionais = async () => {
  return Devocional.find().sort({ createdAt: -1 });
};

const updateDevocional = async (devocionalId, data) => {
  const { titulo, conteudo, versiculo } = data;

  if (!titulo || !conteudo) {
    const error = new Error("Título e conteúdo são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const devocional = await Devocional.findByIdAndUpdate(
    devocionalId,
    { titulo, conteudo, versiculo: versiculo || "" },
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
