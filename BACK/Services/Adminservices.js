import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Tutorial from "../Models/Devocional.js";
import Resultado from "../Models/Resultado.js";

const NOME_ADMIN_CODIGO = "Administrador";

function gerarToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

const AdminService = {
  async entrarComCodigo(codigo) {
    const codigoCorreto = process.env.ADMIN_CODE || "1234";

    if (String(codigo || "").trim() !== codigoCorreto) {
      const error = new Error("Código incorreto.");
      error.statusCode = 401;
      throw error;
    }

    let adminUser = await User.findOne({ nome: NOME_ADMIN_CODIGO });

    if (!adminUser) {
      const senhaAleatoria = crypto.randomBytes(24).toString("hex");
      adminUser = await User.create({
        nome: NOME_ADMIN_CODIGO,
        email: `admin.codigo.${Date.now()}@sememail.facilitatech`,
        password: await bcrypt.hash(senhaAleatoria, 10),
        role: "admin",
        active: true,
      });
    } else if (adminUser.role !== "admin" || !adminUser.active) {
      adminUser.role = "admin";
      adminUser.active = true;
      await adminUser.save();
    }

    return {
      token: gerarToken(adminUser),
      user: { nome: adminUser.nome, role: adminUser.role },
    };
  },

  async listarUsuarios() {
    return User.find({}, "nome telefone email role createdAt").sort({ createdAt: -1 });
  },

  async listarResultados() {
    return Resultado.find()
      .populate("usuario", "nome email")
      .sort({ createdAt: -1 })
      .limit(100);
  },

  async promoverParaAdmin(nome) {
    const usuario = await User.findOneAndUpdate(
      { nome: String(nome || "").trim() },
      { role: "admin" },
      { new: true }
    ).select("-password");
    if (!usuario) throw new Error("Usuário não encontrado.");
    return usuario;
  },

  async rebaixarAdmin(nome) {
    const usuario = await User.findOneAndUpdate(
      { nome: String(nome || "").trim() },
      { role: "user" },
      { new: true }
    ).select("-password");
    if (!usuario) throw new Error("Usuário não encontrado.");
    return usuario;
  },

  async estatisticas() {
    const [totalUsuarios, totalAdmins, totalTutoriais, totalResultados, resultadosPorTipo] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ role: "admin" }),
      Tutorial.countDocuments({}),
      Resultado.countDocuments({}),
      Resultado.aggregate([{ $group: { _id: "$tipoTeste", total: { $sum: 1 } } }]),
    ]);

    const testesPorTipo = { casal: 0, linguagens: 0, temperamento: 0, grafico: 0 };
    resultadosPorTipo.forEach((r) => (testesPorTipo[r._id] = r.total));

    return { totalUsuarios, totalAdmins, totalTutoriais, totalResultados, testesPorTipo };
  },
};

export default AdminService;
