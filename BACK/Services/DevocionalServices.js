import Tutorial from "../Models/Devocional.js";

const createDevocional = async (data) => {
  const { Title, Description } = data;

  if (!Title || !Description) {
    const error = new Error("Título e descrição são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  return Devocional.create({
    Title: Title,
    Description: Description,
  });
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

const updateDevocional = async (devocionalId, data) => {
  const { Title, Description } = data;

  if (!Title || !Description) {
    const error = new Error("Título e descrição são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const devocional = await Devocional.findByIdAndUpdate(
    devocionalId,
    { Title, Description },
    { new: true, runValidators: true }
  );

  if (!devocional) {
    const error = new Error("Devocional não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return devocional  ;
};

const getAllDevocionais = async () => {
  const devocionais = await Devocional.find();
  return devocionais;
};

export default {
  createDevocional,
  deleteDevocional,
  updateDevocional,
  getAllDevocionais,
};
