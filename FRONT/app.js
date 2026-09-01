// ===== Rodrigo & Suelen Labiato — app =====
const USER_TOKEN_KEY = "labiato_user_token";
const USER_NAME_KEY = "labiato_user_nome";
const ADMIN_TOKEN_KEY = "labiato_admin_token";

const getUserToken = () => localStorage.getItem(USER_TOKEN_KEY);
const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);

const PERIODO_LABEL = {
  semana: "Semana inteira",
  hoje: "Hoje",
  dom: "Domingo", seg: "Segunda", ter: "Terça", qua: "Quarta", qui: "Quinta", sex: "Sexta", sab: "Sábado",
};
const DIAS_SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];

// ===== Helpers =====
function formatarData(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

function mesmoDia(iso) {
  if (!iso) return false;
  const d = new Date(iso);
  const hoje = new Date();
  return d.getFullYear() === hoje.getFullYear() && d.getMonth() === hoje.getMonth() && d.getDate() === hoje.getDate();
}

async function apiFetch(url, opcoes = {}) {
  const cabecalhos = opcoes.headers ? { ...opcoes.headers } : {};
  const token = getAdminToken() || getUserToken();
  if (token) cabecalhos["Authorization"] = `Bearer ${token}`;
  const resposta = await fetch(url, { ...opcoes, headers: cabecalhos });
  if (resposta.status === 401 && getUserToken()) logoutUsuario(true);
  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(dados.message || dados.error || "Erro na requisição");
  return dados;
}

function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove("show"), 2600);
}

function escapar(str) {
  const d = document.createElement("div");
  d.textContent = str || "";
  return d.innerHTML;
}

function badgePeriodo(periodo) {
  const p = periodo || "hoje";
  const cls = p === "semana" ? " badge-periodo--semana" : "";
  return `<span class="badge-periodo${cls}">${PERIODO_LABEL[p] || "Hoje"}</span>`;
}

// ===== Navegação =====
document.getElementById("navToggle").addEventListener("click", () => {
  document.querySelector(".nav__inner").classList.toggle("open");
});
document.querySelectorAll("[data-nav]").forEach((a) =>
  a.addEventListener("click", () => document.querySelector(".nav__inner").classList.remove("open"))
);
window.addEventListener("scroll", () => {
  document.getElementById("nav").classList.toggle("scrolled", window.scrollY > 10);
});

// ===== Estado de login do usuário =====
function atualizarNavUsuario() {
  const logado = !!getUserToken();
  document.getElementById("navUser").hidden = !logado;
  document.getElementById("btnEntrar").hidden = logado;
  if (logado) document.getElementById("navUserName").textContent = localStorage.getItem(USER_NAME_KEY) || "";
}

function logoutUsuario(silencioso) {
  localStorage.removeItem(USER_TOKEN_KEY);
  localStorage.removeItem(USER_NAME_KEY);
  atualizarNavUsuario();
  if (!silencioso) toast("Você saiu da sua conta.");
}
document.getElementById("btnSair").addEventListener("click", () => logoutUsuario(false));

// ===== Modal do usuário =====
const userModal = document.getElementById("userModal");
function abrirUser(tab) {
  userModal.hidden = false;
  document.querySelectorAll("#userTabs .tab").forEach((t) => t.classList.toggle("tab--active", t.dataset.utab === tab));
  document.getElementById("formLogin").hidden = tab !== "entrar";
  document.getElementById("formCadastro").hidden = tab !== "cadastrar";
}
function fecharUser() { userModal.hidden = true; }
document.getElementById("btnEntrar").addEventListener("click", () => abrirUser("entrar"));
document.querySelectorAll("[data-close-user]").forEach((el) => el.addEventListener("click", fecharUser));
document.querySelectorAll("#userTabs .tab").forEach((t) =>
  t.addEventListener("click", () => abrirUser(t.dataset.utab))
);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { fecharUser(); fecharAdmin(); } });

document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  const erro = document.getElementById("erroLogin");
  erro.textContent = "";
  try {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: document.getElementById("loginNome").value.trim(), password: document.getElementById("loginSenha").value }),
    });
    localStorage.setItem(USER_TOKEN_KEY, res.data.token);
    localStorage.setItem(USER_NAME_KEY, res.data.user.nome);
    document.getElementById("formLogin").reset();
    fecharUser();
    atualizarNavUsuario();
    toast(`Bem-vindo(a), ${res.data.user.nome}!`);
  } catch (err) { erro.textContent = err.message; }
});

document.getElementById("formCadastro").addEventListener("submit", async (e) => {
  e.preventDefault();
  const erro = document.getElementById("erroCadastro");
  erro.textContent = "";
  try {
    const res = await apiFetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: document.getElementById("cadastroNome").value.trim(),
        telefone: document.getElementById("cadastroTelefone").value.trim(),
        password: document.getElementById("cadastroSenha").value,
      }),
    });
    localStorage.setItem(USER_TOKEN_KEY, res.data.token);
    localStorage.setItem(USER_NAME_KEY, res.data.user.nome);
    document.getElementById("formCadastro").reset();
    fecharUser();
    atualizarNavUsuario();
    toast(`Conta criada! Bem-vindo(a), ${res.data.user.nome}!`);
  } catch (err) { erro.textContent = err.message; }
});

// ===== Devocionais =====
let todosDevocionais = [];
let filtroAtual = "hoje";

function filtrarDevocionais() {
  const hojeKey = DIAS_SEMANA[new Date().getDay()];
  if (filtroAtual === "todos") return todosDevocionais;
  if (filtroAtual === "semana") return todosDevocionais.filter((d) => (d.periodo || "hoje") === "semana");
  // hoje: semana inteira + dia da semana de hoje + marcados "hoje" criados hoje
  return todosDevocionais.filter((d) => {
    const p = d.periodo || "hoje";
    return p === "semana" || p === hojeKey || (p === "hoje" && mesmoDia(d.createdAt));
  });
}

function renderDevocionais() {
  const container = document.getElementById("listaDevocionais");
  const lista = filtrarDevocionais();
  if (!lista.length) { container.innerHTML = `<p class="cards__empty">Nenhum devocional para esta seleção.</p>`; return; }
  container.innerHTML = lista.map((d) => `
    <article class="card"><div class="card__body">
      <div class="card__top">
        <span class="card__date">${formatarData(d.createdAt)}</span>
        ${badgePeriodo(d.periodo)}
      </div>
      <h3 class="card__title">${escapar(d.titulo)}</h3>
      ${d.versiculo ? `<p class="card__verse">${escapar(d.versiculo)}</p>` : ""}
      <p class="card__text">${escapar(d.conteudo)}</p>
      <span class="card__author">${escapar(d.autor || "Pastores Rodrigo & Suelen Labiato")}</span>
    </div></article>`).join("");
}

async function carregarDevocionais() {
  const container = document.getElementById("listaDevocionais");
  container.innerHTML = `<p class="cards__empty">Carregando devocionais…</p>`;
  try {
    todosDevocionais = await apiFetch("/devocional");
    renderDevocionais();
  } catch (e) {
    container.innerHTML = `<p class="cards__empty">Erro ao carregar: ${escapar(e.message)}</p>`;
  }
}

document.querySelectorAll("#devFiltros .filter-tab").forEach((t) =>
  t.addEventListener("click", () => {
    document.querySelectorAll("#devFiltros .filter-tab").forEach((x) => x.classList.remove("filter-tab--active"));
    t.classList.add("filter-tab--active");
    filtroAtual = t.dataset.filtro;
    renderDevocionais();
  })
);

// ===== Pregações =====
async function carregarPregacoes() {
  const container = document.getElementById("listaPregacoes");
  container.innerHTML = `<p class="cards__empty">Carregando pregações…</p>`;
  try {
    const lista = await apiFetch("/pregacao");
    if (!lista.length) { container.innerHTML = `<p class="cards__empty">Ainda não há pregações publicadas.</p>`; return; }
    container.innerHTML = lista.map((p) => `
      <article class="card">
        <div class="card__media">
          <span class="card__tag">Pregação</span>
          <iframe src="https://www.youtube.com/embed/${escapar(p.youtubeId)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
        </div>
        <div class="card__body">
          <h3 class="card__title">${escapar(p.titulo)}</h3>
          ${p.descricao ? `<p class="card__text">${escapar(p.descricao)}</p>` : ""}
        </div>
      </article>`).join("");
  } catch (e) {
    container.innerHTML = `<p class="cards__empty">Erro ao carregar: ${escapar(e.message)}</p>`;
  }
}

// ===== Admin =====
const adminModal = document.getElementById("adminModal");
let chartTestesInstance = null;

function abrirAdmin() {
  adminModal.hidden = false;
  if (getAdminToken()) mostrarPainel(); else mostrarLoginAdmin();
}
function fecharAdmin() { adminModal.hidden = true; }
function mostrarLoginAdmin() {
  document.getElementById("adminLogin").hidden = false;
  document.getElementById("adminPanel").hidden = true;
}
function mostrarPainel() {
  document.getElementById("adminLogin").hidden = true;
  document.getElementById("adminPanel").hidden = false;
  carregarAdminDevocionais();
  carregarAdminPregacoes();
  carregarAdminUsers();
}
document.getElementById("btnAdmin").addEventListener("click", abrirAdmin);
document.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", fecharAdmin));
document.getElementById("btnAdminSair").addEventListener("click", () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  mostrarLoginAdmin();
  toast("Sessão admin encerrada.");
});

document.getElementById("formAdminLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  const erro = document.getElementById("erroAdmin");
  erro.textContent = "";
  try {
    const res = await apiFetch("/Admin/codigo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo: document.getElementById("adminCodigo").value }),
    });
    localStorage.setItem(ADMIN_TOKEN_KEY, res.token);
    document.getElementById("adminCodigo").value = "";
    mostrarPainel();
    toast("Bem-vindo, pastor(a)!");
  } catch (err) { erro.textContent = err.message; }
});

document.querySelectorAll("#adminTabs .tab").forEach((t) =>
  t.addEventListener("click", () => {
    document.querySelectorAll("#adminTabs .tab").forEach((x) => x.classList.remove("tab--active"));
    t.classList.add("tab--active");
    document.querySelectorAll(".tabpane").forEach((p) => p.classList.remove("tabpane--active"));
    const id = t.dataset.tab === "dev" ? "paneDev" : t.dataset.tab === "preg" ? "panePreg" : "paneUsers";
    document.getElementById(id).classList.add("tabpane--active");
    if (t.dataset.tab === "users") carregarAdminUsers();
  })
);

document.getElementById("formDevocional").addEventListener("submit", async (e) => {
  e.preventDefault();
  const erro = document.getElementById("erroDev");
  erro.textContent = "";
  try {
    await apiFetch("/devocional", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: document.getElementById("devTitulo").value.trim(),
        versiculo: document.getElementById("devVersiculo").value.trim(),
        conteudo: document.getElementById("devConteudo").value.trim(),
        periodo: document.getElementById("devPeriodo").value,
      }),
    });
    document.getElementById("formDevocional").reset();
    toast("Devocional publicado!");
    carregarAdminDevocionais();
    carregarDevocionais();
  } catch (err) { erro.textContent = err.message; }
});

document.getElementById("formPregacao").addEventListener("submit", async (e) => {
  e.preventDefault();
  const erro = document.getElementById("erroPreg");
  erro.textContent = "";
  try {
    await apiFetch("/pregacao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: document.getElementById("pregTitulo").value.trim(),
        youtubeUrl: document.getElementById("pregUrl").value.trim(),
        descricao: document.getElementById("pregDescricao").value.trim(),
      }),
    });
    document.getElementById("formPregacao").reset();
    toast("Pregação adicionada!");
    carregarAdminPregacoes();
    carregarPregacoes();
  } catch (err) { erro.textContent = err.message; }
});

async function carregarAdminDevocionais() {
  const c = document.getElementById("adminListaDev");
  try {
    const lista = await apiFetch("/devocional");
    if (!lista.length) { c.innerHTML = `<div class="admin__item"><div class="admin__item-info"><span>Nenhum devocional ainda.</span></div></div>`; return; }
    c.innerHTML = lista.map((d) => `
      <div class="admin__item"><div class="admin__item-info"><strong>${escapar(d.titulo)}</strong><span>${formatarData(d.createdAt)} &middot; ${PERIODO_LABEL[d.periodo || "hoje"] || "Hoje"}</span></div>
      <button class="admin__del" data-id="${d._id}" data-tipo="dev">Excluir</button></div>`).join("");
  } catch (e) { c.innerHTML = `<div class="admin__item"><div class="admin__item-info"><span>Erro: ${escapar(e.message)}</span></div></div>`; }
}

async function carregarAdminPregacoes() {
  const c = document.getElementById("adminListaPreg");
  try {
    const lista = await apiFetch("/pregacao");
    if (!lista.length) { c.innerHTML = `<div class="admin__item"><div class="admin__item-info"><span>Nenhuma pregação ainda.</span></div></div>`; return; }
    c.innerHTML = lista.map((p) => `
      <div class="admin__item"><div class="admin__item-info"><strong>${escapar(p.titulo)}</strong><span>${formatarData(p.createdAt)}</span></div>
      <button class="admin__del" data-id="${p._id}" data-tipo="preg">Excluir</button></div>`).join("");
  } catch (e) { c.innerHTML = `<div class="admin__item"><div class="admin__item-info"><span>Erro: ${escapar(e.message)}</span></div></div>`; }
}

async function carregarAdminUsers() {
  try {
    const [stats, usuarios] = await Promise.all([apiFetch("/Admin/estatisticas"), apiFetch("/Admin/usuarios")]);
    document.getElementById("statRow").innerHTML = `
      <div class="stat-card"><strong>${stats.totalUsuarios}</strong><span>Usuários</span></div>
      <div class="stat-card"><strong>${stats.totalAdmins}</strong><span>Admins</span></div>
      <div class="stat-card"><strong>${stats.totalTutoriais}</strong><span>Devocionais</span></div>
      <div class="stat-card"><strong>${stats.totalResultados}</strong><span>Testes</span></div>`;
    if (chartTestesInstance) chartTestesInstance.destroy();
    const nomes = { casal: "Casal", linguagens: "Linguagens", temperamento: "Temperamento", grafico: "Gráfico do Amor" };
    chartTestesInstance = new Chart(document.getElementById("chartTestes"), {
      type: "bar",
      data: { labels: Object.keys(stats.testesPorTipo).map((k) => nomes[k]), datasets: [{ label: "Testes realizados", data: Object.values(stats.testesPorTipo), backgroundColor: ["#4a1942", "#c9a96e", "#6d2b5f", "#8a4f7d"], borderRadius: 8 }] },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } },
    });
    document.getElementById("usersTable").innerHTML = `
      <thead><tr><th>Nome</th><th>Telefone</th><th>Tipo</th><th>Desde</th></tr></thead>
      <tbody>${usuarios.map((u) => `
        <tr><td>${escapar(u.nome)}</td><td>${escapar(u.telefone || "—")}</td>
        <td><span class="badge ${u.role === "admin" ? "badge--admin" : "badge--user"}">${u.role === "admin" ? "Admin" : "Usuário"}</span></td>
        <td>${formatarData(u.createdAt)}</td></tr>`).join("")}</tbody>`;
  } catch (e) { toast("Erro ao carregar usuários: " + e.message); }
}

document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".admin__del");
  if (!btn) return;
  const { id, tipo } = btn.dataset;
  const url = tipo === "dev" ? `/devocional/${id}` : `/pregacao/${id}`;
  try {
    await apiFetch(url, { method: "DELETE" });
    toast(tipo === "dev" ? "Devocional excluído." : "Pregação removida.");
    if (tipo === "dev") { carregarAdminDevocionais(); carregarDevocionais(); }
    else { carregarAdminPregacoes(); carregarPregacoes(); }
  } catch (err) { toast(err.message); }
});

// ===== Init =====
atualizarNavUsuario();
carregarDevocionais();
carregarPregacoes();
window.LabiatoTests.renderGrid(document.getElementById("testesArea"));
