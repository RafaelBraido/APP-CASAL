import ResultadoService from "../Services/ResultadoServices.js";

const salvarResultado = async (req, res, next) => {
  try {
    const resultado = await ResultadoService.salvarResultado(req.user.id, req.body);
    res.status(201).json({ message: "Resultado salvo", data: resultado });
  } catch (error) {
    next(error);
  }
};

const meusResultados = async (req, res, next) => {
  try {
    const resultados = await ResultadoService.meusResultados(req.user.id);
    res.status(200).json(resultados);
  } catch (error) {
    next(error);
  }
};

const estatisticas = async (req, res, next) => {
  try {
    const stats = await ResultadoService.estatisticas();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

export default { salvarResultado, meusResultados, estatisticas };
