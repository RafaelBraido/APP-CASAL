import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

const SENHA_TAMANHO_MINIMO = 6;
const NOME_TAMANHO_MAXIMO = 60;

function gerarToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

function formatarUsuario(user) {
  return {
    _id: user._id,
    nome: user.nome,
    role: user.role,
    active: user.active,
  };
}

function gerarEmailInterno(nome) {
  const base = nome.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
  const sufixo = `${Date.now()}.${Math.floor(Math.random() * 100000)}`;
  return `${base || "conta"}.${sufixo}@sememail.facilitatech`;
}

const register = async (data) => {
  const nome = String(data.nome || "").trim();
  const password = String(data.password || "");
  const telefone = String(data.telefone || "").trim();
  const { role } = data;

  if (!nome || !password) {
    const error = new Error("Nome e senha são obrigatórios");
    error.statusCode = 400;
    throw error;
  }
  if (nome.length > NOME_TAMANHO_MAXIMO) {
    const error = new Error(`Nome muito longo (máximo ${NOME_TAMANHO_MAXIMO} letras)`);
    error.statusCode = 400;
    throw error;
  }
  if (password.length < SENHA_TAMANHO_MINIMO) {
    const error = new Error(`A senha precisa ter pelo menos ${SENHA_TAMANHO_MINIMO} letras ou números`);
    error.statusCode = 400;
    throw error;
  }

  const nomeJaExiste = await User.findOne({ nome });
  if (nomeJaExiste) {
    const error = new Error("Esse nome já está em uso. Tente outro (por exemplo, com o sobrenome).");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    nome,
    telefone,
    email: gerarEmailInterno(nome),
    password: hashedPassword,
    role: role || "user",
    active: true,
  });

  return {
    user: formatarUsuario(user),
    token: gerarToken(user),
  };
};

const login = async (data) => {
  const nome = String(data.nome || "").trim();
  const password = String(data.password || "");

  if (!nome || !password) {
    const error = new Error("Nome e senha são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ nome }).select("+password");

  if (!user) {
    const error = new Error("Nome ou senha inválidos");
    error.statusCode = 401;
    throw error;
  }

  if (!user.active) {
    const error = new Error("Usuário inativo. Entre em contato com a administração");
    error.statusCode = 403;
    throw error;
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  if (!passwordIsCorrect) {
    const error = new Error("Nome ou senha inválidos");
    error.statusCode = 401;
    throw error;
  }

  return {
    user: formatarUsuario(user),
    token: gerarToken(user),
  };
};

export default {
  register,
  login,
};