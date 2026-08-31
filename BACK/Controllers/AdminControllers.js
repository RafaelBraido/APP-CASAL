import AdminService from "../Services/Adminservices.js";

const AdminController = {
  async entrarComCodigo(req, res, next) {
    try {
      const { codigo } = req.body;
      const resultado = await AdminService.entrarComCodigo(codigo);
      res.json(resultado);
    } catch (error) {
      res.status(error.statusCode || 401).json({ message: error.message });
    }
  },

  async listarUsuarios(req, res, next) {
    try {
      const usuarios = await AdminService.listarUsuarios();
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  },

  async promoverParaAdmin(req, res, next) {
    try {
      const { nome } = req.body;
      const usuario = await AdminService.promoverParaAdmin(nome);
      res.json({ message: `${usuario.nome} agora é admin.`, usuario });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async rebaixarAdmin(req, res, next) {
    try {
      const { nome } = req.body;
      const usuario = await AdminService.rebaixarAdmin(nome);
      res.json({ message: `${usuario.nome} não é mais admin.`, usuario });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async estatisticas(req, res, next) {
    try {
      const stats = await AdminService.estatisticas();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  },
};

export default AdminController;