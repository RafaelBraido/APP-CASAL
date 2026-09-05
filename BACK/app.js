// ===== Menu (funcionalidade original, sem alteração) =====
function toggleMenu() {
    var menu = document.getElementById("menuItem");
    menu.classList.toggle("aberto");
}

// ===== Autenticação =====
const CHAVE_TOKEN = "facilitatech_token";
const CHAVE_NOME = "facilitatech_nome";

function getToken() {
    return localStorage.getItem(CHAVE_TOKEN);
}

function estaLogado() {
    return !!getToken();
}

function salvarSessao(token, nome) {
    localStorage.setItem(CHAVE_TOKEN, token);
    localStorage.setItem(CHAVE_NOME, nome);
}

function logout() {
    localStorage.removeItem(CHAVE_TOKEN);
    localStorage.removeItem(CHAVE_NOME);
    atualizarEstadoLogin();
    mostrarSecao("login");
}

function atualizarEstadoLogin() {
    const botaoLoginMenu = document.getElementById("botaoLoginMenu");
    const areaLogado = document.getElementById("areaLogado");
    const areaFormularios = document.getElementById("areaFormularios");
    const nomeUsuarioLogado = document.getElementById("nomeUsuarioLogado");

    if (estaLogado()) {
        botaoLoginMenu.textContent = "Minha conta";
        areaLogado.hidden = false;
        areaFormularios.hidden = true;
        nomeUsuarioLogado.textContent = localStorage.getItem(CHAVE_NOME) || "";
    } else {
        botaoLoginMenu.textContent = "Entrar";
        areaLogado.hidden = true;
        areaFormularios.hidden = false;
    }
}

// Wrapper de fetch que já manda o token e trata sessão expirada
async function apiFetch(url, opcoes = {}) {
    const cabecalhos = opcoes.headers ? { ...opcoes.headers } : {};

    if (estaLogado()) {
        cabecalhos["Authorization"] = `Bearer ${getToken()}`;
    }

    const resposta = await fetch(url, { ...opcoes, headers: cabecalhos });

    if (resposta.status === 401) {
        // Token inválido ou expirado
        logout();
        throw new Error("Sessão expirada. Faça login novamente.");
    }

    const dados = await resposta.json().catch(() => ({}));

    if (!resposta.ok) {
        throw new Error(dados.message || dados.error || "Erro na requisição");
    }

    return dados;
}

async function aoSubmeterLogin(evento) {
    evento.preventDefault();
    const nome = document.getElementById("loginNome").value.trim();
    const senha = document.getElementById("loginSenha").value;
    const erro = document.getElementById("erroLogin");
    erro.textContent = "";

    try {
        const resultado = await apiFetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, password: senha }),
        });

        salvarSessao(resultado.data.token, resultado.data.user.nome);
        atualizarEstadoLogin();
        document.getElementById("formLogin").reset();
    } catch (e) {
        erro.textContent = e.message;
    }

    return false;
}

async function aoSubmeterCadastro(evento) {
    evento.preventDefault();
    const nome = document.getElementById("cadastroNome").value.trim();
    const senha = document.getElementById("cadastroSenha").value;
    const erro = document.getElementById("erroCadastro");
    erro.textContent = "";

    try {
        const resultado = await apiFetch("/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, password: senha }),
        });

        salvarSessao(resultado.data.token, resultado.data.user.nome);
        atualizarEstadoLogin();
        document.getElementById("formCadastro").reset();
    } catch (e) {
        erro.textContent = e.message;
    }

    return false;
}

// ===== Navegação entre seções =====
function mostrarSecao(nome) {
    const secoes = ["login", "diario", "semanal", "pregacoes"];

    secoes.forEach((s) => {
        const el = document.getElementById(`secao-${s}`);
        if (el) el.hidden = s !== nome;
    });

    // Fecha o menu ao escolher uma seção (mobile-friendly)
    document.getElementById("menuItem").classList.remove("aberto");

    if (!estaLogado() && nome !== "login") {
        mostrarSecao("login");
        return;
    }

    if (nome === "diario") carregarDevocionalDiario();
    if (nome === "semanal") carregarDevocionalSemanal();
    if (nome === "pregacoes") carregarPregacoes();
}

function formatarData(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("pt-BR");
}

// ===== Devocional do Dia =====
async function carregarDevocionalDiario() {
    const container = document.getElementById("conteudoDiario");
    container.textContent = "Carregando...";

    try {
        const devocional = await apiFetch("/devocional-diario/hoje");
        container.innerHTML = `
            <div class="data-devocional">${formatarData(devocional.data)}</div>
            <h3>${devocional.titulo}</h3>
            <p>${devocional.conteudo}</p>
            ${devocional.versiculo ? `<p class="versiculo">${devocional.versiculo}</p>` : ""}
        `;
    } catch (e) {
        container.textContent = e.message.includes("Nenhum")
            ? "Ainda não há devocional publicado hoje."
            : `Erro ao carregar: ${e.message}`;
    }
}

// ===== Devocional da Semana =====
async function carregarDevocionalSemanal() {
    const container = document.getElementById("conteudoSemanal");
    container.textContent = "Carregando...";

    try {
        const devocional = await apiFetch("/devocional-semanal/atual");
        container.innerHTML = `
            <div class="data-devocional">${formatarData(devocional.semanaInicio)} — ${formatarData(devocional.semanaFim)}</div>
            <h3>${devocional.titulo}</h3>
            <p>${devocional.conteudo}</p>
            ${devocional.versiculo ? `<p class="versiculo">${devocional.versiculo}</p>` : ""}
        `;
    } catch (e) {
        container.textContent = e.message.includes("Nenhum")
            ? "Ainda não há devocional para essa semana."
            : `Erro ao carregar: ${e.message}`;
    }
}

// ===== Pregações =====
async function carregarPregacoes() {
    const container = document.getElementById("listaPregacoes");
    container.textContent = "Carregando...";

    try {
        const pregacoes = await apiFetch("/pregacao");

        if (!pregacoes.length) {
            container.textContent = "Nenhuma pregação publicada ainda.";
            return;
        }

        container.innerHTML = pregacoes
            .map((p) => {
                const midia =
                    p.tipo === "youtube"
                        ? `<iframe src="https://www.youtube.com/embed/${p.youtubeId}" allowfullscreen></iframe>`
                        : `<video src="${p.videoUrl}" controls></video>`;

                return `
                    <div class="item-pregacao">
                        <h3>${p.titulo}</h3>
                        ${p.descricao ? `<p>${p.descricao}</p>` : ""}
                        ${midia}
                    </div>
                `;
            })
            .join("");
    } catch (e) {
        container.textContent = `Erro ao carregar: ${e.message}`;
    }
}

// ===== Inicialização =====
document.addEventListener("DOMContentLoaded", () => {
    atualizarEstadoLogin();
});