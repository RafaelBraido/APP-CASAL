// ===== Rodrigo & Suelen Labiato — app =====
const ADMIN_TOKEN_KEY = "labiato_admin_token";
const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);

// ===== Helpers =====
function formatarData(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

async function apiFetch(url, opcoes = {}) {
  const cabecalhos = opcoes.headers ? { ...opcoes.headers } : {};
  const token = getAdminToken();
  if (token) cabecalhos["Authorization"] = `Bearer ${token}`;
  const resposta = await fetch(url, { ...opcoes, headers: cabecalhos });
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

// ===== Navegação =====
document.getElementById("navToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

document.querySelectorAll("[data-nav]").forEach((a) => {
  a.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  document.getElementById("nav").classList.toggle("scrolled", window.scrollY > 10);
});

// ===== Devocionais =====
async function carregarDevocionais() {
  const container = document.getElementById("listaDevocionais");
  try {
    const lista = await apiFetch("/devocional");
    if (!lista.length) {
      container.innerHTML = `<p class="cards__empty">Ainda não há devocionais publicados.</p>`;
      return;
    }
    container.innerHTML = lista
      .map(
        (d) => `
        <article class="card">
          <div class="card__body">
            <span class="card__date">${formatarData(d.createdAt)}</span>
            <h3 class="card__title">${escapar(d.titulo)}</h3>
            ${d.versiculo ? `<p class="card__verse">${escapar(d.versiculo)}</p>` : ""}
            <p class="card__text">${escapar(d.conteudo)}</p>
            <span class="card__author">${escapar(d.autor || "Pastores Rodrigo & Suelen Labiato")}</span>
          </div>
        </article>`
      )
      .join("");
  } catch (e) {
    container.innerHTML = `<p class="cards__empty">Erro ao carregar: ${escapar(e.message)}</p>`;
  }
}

// ===== Pregações =====
async function carregarPregacoes() {
  const container = document.getElementById("listaPregacoes");
  try {
    const lista = await apiFetch("/pregacao");
    if (!lista.length) {
      container.innerHTML = `<p class="cards__empty">Ainda não há pregações publicadas.</p>`;
      return;
    }
    container.innerHTML = lista
      .map(
        (p) => `
        <article class="card">
          <div class="card__media">
            <span class="card__tag">Pregação</span>
            <iframe src="https://www.youtube.com/embed/${escapar(p.youtubeId)}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen loading="lazy"></iframe>
          </div>
          <div class="card__body">
            <h3 class="card__title">${escapar(p.titulo)}</h3>
            ${p.descricao ? `<p class="card__text">${escapar(p.descricao)}</p>` : ""}
          </div>
        </article>`
      )
      .join("");
  } catch (e) {
    container.innerHTML = `<p class="cards__empty">Erro ao carregar: ${escapar(e.message)}</p>`;
  }
}

// ===== Teste de Personalidade do Casal =====
const PERGUNTAS = [
  {
    pergunta: "Como vocês gostam de passar o domingo juntos?",
    opcoes: [
      { t: "Em casa, aconchego, um café e conversa", tipo: "conexo" },
      { t: "Passeio, trilha ou alguma novidade fora", tipo: "aventureiro" },
      { t: "Planejando sonhos e planos para o futuro", tipo: "sonhador" },
      { t: "Cuidando das coisas práticas, lado a lado", tipo: "firme" },
    ],
  },
  {
    pergunta: "Qual forma de demonstrar amor mais marca vocês?",
    opcoes: [
      { t: "Tempo de qualidade, olho no olho", tipo: "conexo" },
      { t: "Surpresas e gestos inesperados", tipo: "aventureiro" },
      { t: "Palavras de afirmação e promessas", tipo: "sonhador" },
      { t: "Atos de serviço, cuidar um do outro", tipo: "firme" },
    ],
  },
  {
    pergunta: "Na viagem dos sonhos, vocês escolhem…",
    opcoes: [
      { t: "Uma cabanha isolada, só vocês dois", tipo: "conexo" },
      { t: "Explorar um lugar que nunca foram", tipo: "aventureiro" },
      { t: "Uma lua de mel eterna, romântica", tipo: "sonhador" },
      { t: "Visitar família e amigos queridos", tipo: "firme" },
    ],
  },
  {
    pergunta: "Quando surge um conflito, vocês tendem a…",
    opcoes: [
      { t: "Conversar com calma até se entenderem", tipo: "conexo" },
      { t: "Quebrar o clima com algo diferente", tipo: "aventureiro" },
      { t: "Lembrar por que se escolheram", tipo: "sonhador" },
      { t: "Resolver o problema, na prática", tipo: "firme" },
    ],
  },
  {
    pergunta: "O presente perfeito para o casal é…",
    opcoes: [
      { t: "Uma noite só de vocês, sem distrações", tipo: "conexo" },
      { t: "Uma experiência inesquecível", tipo: "aventureiro" },
      { t: "Algo que simbolize o amor de vocês", tipo: "sonhador" },
      { t: "Algo útil que facilita o dia a dia", tipo: "firme" },
    ],
  },
  {
    pergunta: "A palavra que melhor descreve a relação de vocês é…",
    opcoes: [
      { t: "Profunda — nos conhecemos por dentro", tipo: "conexo" },
      { t: "Viva — sempre acontece algo novo", tipo: "aventureiro" },
      { t: "Sonhadora — olhamos para a frente juntos", tipo: "sonhador" },
      { t: "Sólida — um apoia o outro sempre", tipo: "firme" },
    ],
  },
];

const PERFIS = {
  conexo: {
    nome: "Casal Conexo",
    desc: "Vocês encontram a essência um no outro. A intimidade, a conversa sincera e o tempo de qualidade são a base de tudo. Continuem cultivando esses momentos a sós — é neles que o amor de vocês floresce.",
  },
  aventureiro: {
    nome: "Casal Aventureiro",
    desc: "A relação de vocês é movida por novidade e descobertas. O novo os aproxima. Reserve tempo para surpreender um ao outro — pequenas aventuras mantêm a chama sempre acesa.",
  },
  sonhador: {
    nome: "Casal Sonhador",
    desc: "Vocês enxergam longe e sonham juntos. O futuro de vocês é construído a quatro mãos, com esperança e propósito. Continuem compartilhando sonhos — eles são a bússola do casal.",
  },
  firme: {
    nome: "Casal Firme",
    desc: "Vocês são o porto seguro um do outro. A confiança, a lealdade e o cuidado prático sustentam tudo. O amor de vocês se prova nos detalhes do cotidiano — continuem se cuidando assim.",
  },
};

let quizIndex = 0;
const quizPontos = { conexo: 0, aventureiro: 0, sonhador: 0, firme: 0 };

function iniciarQuiz() {
  quizIndex = 0;
  Object.keys(quizPontos).forEach((k) => (quizPontos[k] = 0));
  document.getElementById("quizIntro").hidden = true;
  document.getElementById("quizResult").hidden = true;
  document.getElementById("quizBox").hidden = false;
  document.getElementById("quizTotal").textContent = PERGUNTAS.length;
  renderPergunta();
}

function renderPergunta() {
  const q = PERGUNTAS[quizIndex];
  document.getElementById("quizStep").textContent = quizIndex + 1;
  document.getElementById("quizBar").style.width = (quizIndex / PERGUNTAS.length) * 100 + "%";
  document.getElementById("quizQuestion").textContent = q.pergunta;
  document.getElementById("quizOptions").innerHTML = q.opcoes
    .map(
      (o, i) => `<button class="quiz__opt" data-tipo="${o.tipo}">${o.t}</button>`
    )
    .join("");
  document.querySelectorAll(".quiz__opt").forEach((b) =>
    b.addEventListener("click", () => responder(b.dataset.tipo))
  );
}

function responder(tipo) {
  quizPontos[tipo]++;
  quizIndex++;
  if (quizIndex < PERGUNTAS.length) {
    renderPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById("quizBar").style.width = "100%";
  const vencedor = Object.keys(quizPontos).reduce((a, b) =>
    quizPontos[a] >= quizPontos[b] ? a : b
  );
  const perfil = PERFIS[vencedor];
  document.getElementById("quizBox").hidden = true;
  const box = document.getElementById("quizResult");
  box.hidden = false;
  box.innerHTML = `
    <p class="result__type">O perfil de vocês é</p>
    <h3>${perfil.nome}</h3>
    <p>${perfil.desc}</p>
    <button class="btn btn--gold result__retry" id="quizRetry">Refazer o teste</button>`;
  document.getElementById("quizRetry").addEventListener("click", iniciarQuiz);
}

document.getElementById("quizStart").addEventListener("click", iniciarQuiz);

// ===== Admin =====
const adminModal = document.getElementById("adminModal");

function abrirAdmin() {
  adminModal.hidden = false;
  if (getAdminToken()) mostrarPainel();
  else mostrarLogin();
}
function fecharAdmin() {
  adminModal.hidden = true;
}
function mostrarLogin() {
  document.getElementById("adminLogin").hidden = false;
  document.getElementById("adminPanel").hidden = true;
}
function mostrarPainel() {
  document.getElementById("adminLogin").hidden = true;
  document.getElementById("adminPanel").hidden = false;
  carregarAdminDevocionais();
  carregarAdminPregacoes();
}

document.getElementById("btnAdmin").addEventListener("click", abrirAdmin);
document.querySelectorAll("[data-close]").forEach((el) =>
  el.addEventListener("click", fecharAdmin)
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharAdmin();
});

// Login admin (código)
document.getElementById("formAdminLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  const erro = document.getElementById("erroAdmin");
  erro.textContent = "";
  try {
    const codigo = document.getElementById("adminCodigo").value;
    const res = await apiFetch("/Admin/codigo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo }),
    });
    localStorage.setItem(ADMIN_TOKEN_KEY, res.token);
    document.getElementById("adminCodigo").value = "";
    mostrarPainel();
    toast("Bem-vindo, pastor(a)!");
  } catch (err) {
    erro.textContent = err.message;
  }
});

document.getElementById("btnAdminSair").addEventListener("click", () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  mostrarLogin();
  toast("Sessão admin encerrada.");
});

// Tabs
document.querySelectorAll("#adminTabs .tab").forEach((t) =>
  t.addEventListener("click", () => {
    document.querySelectorAll("#adminTabs .tab").forEach((x) => x.classList.remove("tab--active"));
    t.classList.add("tab--active");
    document.querySelectorAll(".tabpane").forEach((p) => p.classList.remove("tabpane--active"));
    document.getElementById("pane" + (t.dataset.tab === "dev" ? "Dev" : "Preg")).classList.add("tabpane--active");
  })
);

// Criar devocional
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
      }),
    });
    document.getElementById("formDevocional").reset();
    toast("Devocional publicado!");
    carregarAdminDevocionais();
    carregarDevocionais();
  } catch (err) {
    erro.textContent = err.message;
  }
});

// Criar pregação
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
  } catch (err) {
    erro.textContent = err.message;
  }
});

async function carregarAdminDevocionais() {
  const container = document.getElementById("adminListaDev");
  try {
    const lista = await apiFetch("/devocional");
    if (!lista.length) {
      container.innerHTML = `<p class="admin__item-info"><span>Nenhum devocional ainda.</span></p>`;
      return;
    }
    container.innerHTML = lista
      .map(
        (d) => `
        <div class="admin__item">
          <div class="admin__item-info">
            <strong>${escapar(d.titulo)}</strong>
            <span>${formatarData(d.createdAt)}</span>
          </div>
          <button class="admin__del" data-id="${d._id}" data-tipo="dev">Excluir</button>
        </div>`
      )
      .join("");
  } catch (e) {
    container.innerHTML = `<p class="admin__item-info"><span>Erro: ${escapar(e.message)}</span></p>`;
  }
}

async function carregarAdminPregacoes() {
  const container = document.getElementById("adminListaPreg");
  try {
    const lista = await apiFetch("/pregacao");
    if (!lista.length) {
      container.innerHTML = `<p class="admin__item-info"><span>Nenhuma pregação ainda.</span></p>`;
      return;
    }
    container.innerHTML = lista
      .map(
        (p) => `
        <div class="admin__item">
          <div class="admin__item-info">
            <strong>${escapar(p.titulo)}</strong>
            <span>${formatarData(p.createdAt)}</span>
          </div>
          <button class="admin__del" data-id="${p._id}" data-tipo="preg">Excluir</button>
        </div>`
      )
      .join("");
  } catch (e) {
    container.innerHTML = `<p class="admin__item-info"><span>Erro: ${escapar(e.message)}</span></p>`;
  }
}

// Delegação de exclusão
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
  } catch (err) {
    toast(err.message);
  }
});

// ===== Init =====
carregarDevocionais();
carregarPregacoes();
