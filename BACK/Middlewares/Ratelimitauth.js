const LIMITE_TENTATIVAS = 10;
const JANELA_MS = 15 * 60 * 1000; // 15 minutos

const tentativasPorIp = new Map();

function limparAntigos() {
  const agora = Date.now();
  for (const [ip, registro] of tentativasPorIp.entries()) {
    if (agora - registro.inicio > JANELA_MS) tentativasPorIp.delete(ip);
  }
}

export default function rateLimitAuth(req, res, next) {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip || req.connection?.remoteAddress || "desconhecido";
  const agora = Date.now();

  limparAntigos();

  const registro = tentativasPorIp.get(ip) || { contagem: 0, inicio: agora };

  if (agora - registro.inicio > JANELA_MS) {
    registro.contagem = 0;
    registro.inicio = agora;
  }

  registro.contagem += 1;
  tentativasPorIp.set(ip, registro);

  if (registro.contagem > LIMITE_TENTATIVAS) {
    return res.status(429).json({
      message: "Muitas tentativas. Espere alguns minutos e tente de novo.",
    });
  }

  next();
}