import TutorialService from "../Services/DevocionalServices.js";

const createDevocional = async (req, res, next) => {
  try {
    const devocional = await TutorialService.createDevocional(req.body);

    res.status(201).json({
      message: "Devocional criado com sucesso",
      data: devocional,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDevocional = async (req, res, next) => {
  try {
    const DevocionalId = req.params.id;
    await TutorialService.deleteDevocional(DevocionalId);

    res.status(200).json({
      message: "Devocional deletado com sucesso",
    });
  } catch (error) {
    next(error);
  }
};

const updateDevocional = async (req, res, next) => {
  try {
    const DevocionalId = req.params.id;
    const updatedDevocional = await TutorialService.updateDevocional(DevocionalId, req.body);

    res.status(200).json({
      message: "Devocional atualizado com sucesso",
      data: updatedDevocional,
    });
  } catch (error) {
    next(error);
  }
};



export default {
  createDevocional,
  deleteDevocional,
  updateDevocional,
};