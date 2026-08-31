import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import UserRoutes from "./Routes/UserRoutes.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
import DevocionalRoutes from "./Routes/DevocionalRoutes.js";
import PregacaoRoutes from "./Routes/PregacaoRoutes.js";
import AdminRoutes from "./Routes/AdminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Segurança
app.disable("x-powered-by");

// Middlewares globais
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "100kb" }));

// Servir arquivos estáticos da pasta FRONT (HTML, CSS, JS)
const FRONT_DIR = path.join(__dirname, "../FRONT");
app.use(express.static(FRONT_DIR));

// Rotas da API
app.use("/User", UserRoutes);
app.use("/auth", AuthRoutes);
app.use("/devocional", DevocionalRoutes);
app.use("/pregacao", PregacaoRoutes);
app.use("/Admin", AdminRoutes);

// Qualquer outra rota carrega o index.html da pasta FRONT
app.get("*all", (req, res) => {
  res.sendFile(path.join(FRONT_DIR, "index.html"));
});

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Erro interno do servidor",
  });
});

// Inicialização do servidor
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar no banco de dados:", error);
    process.exit(1);
  }
};

startServer();
