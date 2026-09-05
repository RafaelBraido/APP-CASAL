import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Tutorial from "../Models/Tutorial.js";

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
    return User.find({}, "nome role createdAt").sort({ createdAt: -1 });
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
    const [totalUsuarios, totalAdmins, totalTutoriais] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ role: "admin" }),
      Tutorial.countDocuments({}),
    ]);
    return { totalUsuarios, totalAdmins, totalTutoriais };
  },
};

export default AdminService;