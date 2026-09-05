import DevocionalService from "../Services/DevocionalServices.js";

const listDevocionais = async (req, res, next) => {
  try {
    const devocionais = await DevocionalService.listDevocionais();
    res.status(200).json(devocionais);
  } catch (error) {
    next(error);
  }
};

const createDevocional = async (req, res, next) => {
  try {
    const devocional = await DevocionalService.createDevocional(req.body);
    res.status(201).json({
      message: "Devocional criado com sucesso",
      data: devocional,
    });
  } catch (error) {
    next(error);
  }
};

const updateDevocional = async (req, res, next) => {
  try {
    const updated = await DevocionalService.updateDevocional(req.params.id, req.body);
    res.status(200).json({
      message: "Devocional atualizado com sucesso",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDevocional = async (req, res, next) => {
  try {
    await DevocionalService.deleteDevocional(req.params.id);
    res.status(200).json({ message: "Devocional deletado com sucesso" });
  } catch (error) {
    next(error);
  }
};

export default {
  listDevocionais,
  createDevocional,
  updateDevocional,
  deleteDevocional,
};
