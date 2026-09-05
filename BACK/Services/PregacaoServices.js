import Pregacao from "../Models/Pregacao.js";

function extrairYoutubeId(url) {
  if (!url) return null;
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([\w-]{11})/;
  const match = String(url).match(regex);
  return match ? match[1] : null;
}

const createPregacao = async (data) => {
  const { titulo, descricao, youtubeUrl } = data;

  if (!titulo || !youtubeUrl) {
    const error = new Error("Título e URL do YouTube são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const youtubeId = extrairYoutubeId(youtubeUrl);
  if (!youtubeId) {
    const error = new Error("URL do YouTube inválida");
    error.statusCode = 400;
    throw error;
  }

  return Pregacao.create({
    titulo,
    descricao: descricao || "",
    youtubeUrl,
    youtubeId,
  });
};

const listPregacoes = async () => {
  return Pregacao.find().sort({ createdAt: -1 });
};

const deletePregacao = async (pregacaoId) => {
  if (!pregacaoId) {
    const error = new Error("Informe o id da pregação");
    error.statusCode = 400;
    throw error;
  }

  const pregacao = await Pregacao.findByIdAndDelete(pregacaoId);

  if (!pregacao) {
    const error = new Error("Pregação não encontrada");
    error.statusCode = 404;
    throw error;
  }

  return pregacao;
};

export default {
  createPregacao,
  listPregacoes,
  deletePregacao,
};
