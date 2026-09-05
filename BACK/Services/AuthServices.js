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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register = async (data) => {
  const nome = String(data.nome || "").trim();
  const password = String(data.password || "");
  const telefone = String(data.telefone || "").trim();
  const email = String(data.email || "").trim().toLowerCase();

  if (!nome || !email || !telefone || !password) {
    const error = new Error("Nome, email, telefone e senha são obrigatórios");
    error.statusCode = 400;
    throw error;
  }
  if (!EMAIL_REGEX.test(email)) {
    const error = new Error("Informe um email válido");
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

  const emailJaExiste = await User.findOne({ email });
  if (emailJaExiste) {
    const error = new Error("Esse email já está em uso. Entre na sua conta ou use outro email.");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    nome,
    telefone,
    email,
    password: hashedPassword,
    role: "user", // toda conta criada é de usuário comum
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