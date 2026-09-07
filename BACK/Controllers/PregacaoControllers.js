import PregacaoService from "../Services/PregacaoServices.js";

const listPregacoes = async (req, res, next) => {
  try {
    const pregacoes = await PregacaoService.listPregacoes();
    res.status(200).json(pregacoes);
  } catch (error) {
    next(error);
  }
};

const createPregacao = async (req, res, next) => {
  try {
    const pregacao = await PregacaoService.createPregacao(req.body);
    res.status(201).json({
      message: "Pregação adicionada com sucesso",
      data: pregacao,
    });
  } catch (error) {
    next(error);
  }
};

const deletePregacao = async (req, res, next) => {
  try {
    await PregacaoService.deletePregacao(req.params.id);
    res.status(200).json({ message: "Pregação removida com sucesso" });
  } catch (error) {
    next(error);
  }
};

export default {
  listPregacoes,
  createPregacao,
  deletePregacao,
};
