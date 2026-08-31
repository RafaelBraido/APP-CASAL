// ===== Testes interativos do casal =====
// Depende de apiFetch() e toast() definidos em app.js (escopo global compartilhado)

const TESTES = [
  {
    id: "casal",
    nome: "Teste do Casal",
    descricao: "Descubram o perfil que descreve a relação de vocês.",
    cor: "#4a1942",
    icon: "💞",
    perguntas: [
      { pergunta: "Como vocês gostam de passar o domingo juntos?", opcoes: [
        { t: "Em casa, aconchego, um café e conversa", k: "conexo" },
        { t: "Passeio, trilha ou alguma novidade fora", k: "aventureiro" },
        { t: "Planejando sonhos e planos para o futuro", k: "sonhador" },
        { t: "Cuidando das coisas práticas, lado a lado", k: "firme" } ] },
      { pergunta: "Qual forma de demonstrar amor mais marca vocês?", opcoes: [
        { t: "Tempo de qualidade, olho no olho", k: "conexo" },
        { t: "Surpresas e gestos inesperados", k: "aventureiro" },
        { t: "Palavras de afirmação e promessas", k: "sonhador" },
        { t: "Atos de serviço, cuidar um do outro", k: "firme" } ] },
      { pergunta: "Na viagem dos sonhos, vocês escolhem…", opcoes: [
        { t: "Uma cabana isolada, só vocês dois", k: "conexo" },
        { t: "Explorar um lugar que nunca foram", k: "aventureiro" },
        { t: "Uma lua de mel eterna, romântica", k: "sonhador" },
        { t: "Visitar família e amigos queridos", k: "firme" } ] },
      { pergunta: "Quando surge um conflito, vocês tendem a…", opcoes: [
        { t: "Conversar com calma até se entenderem", k: "conexo" },
        { t: "Quebrar o clima com algo diferente", k: "aventureiro" },
        { t: "Lembrar por que se escolheram", k: "sonhador" },
        { t: "Resolver o problema, na prática", k: "firme" } ] },
      { pergunta: "O presente perfeito para o casal é…", opcoes: [
        { t: "Uma noite só de vocês, sem distrações", k: "conexo" },
        { t: "Uma experiência inesquecível", k: "aventureiro" },
        { t: "Algo que simbolize o amor de vocês", k: "sonhador" },
        { t: "Algo útil que facilita o dia a dia", k: "firme" } ] },
      { pergunta: "A palavra que melhor descreve a relação de vocês é…", opcoes: [
        { t: "Profunda — nos conhecemos por dentro", k: "conexo" },
        { t: "Viva — sempre acontece algo novo", k: "aventureiro" },
        { t: "Sonhadora — olhamos para a frente juntos", k: "sonhador" },
        { t: "Sólida — um apoia o outro sempre", k: "firme" } ] },
    ],
    perfis: {
      conexo: { nome: "Casal Conexo", desc: "Vocês encontram a essência um no outro. A intimidade, a conversa sincera e o tempo de qualidade são a base de tudo." },
      aventureiro: { nome: "Casal Aventureiro", desc: "A relação de vocês é movida por novidade e descobertas. Reserve tempo para se surpreender — pequenas aventuras mantêm a chama acesa." },
      sonhador: { nome: "Casal Sonhador", desc: "Vocês enxergam longe e sonham juntos. O futuro é construído a quatro mãos, com esperança e propósito." },
      firme: { nome: "Casal Firme", desc: "Vocês são o porto seguro um do outro. A confiança e o cuidado prático sustentam tudo. O amor se prova nos detalhes do cotidiano." },
    },
    calcular(respostas) {
      const pontos = {};
      respostas.forEach((k) => (pontos[k] = (pontos[k] || 0) + 1));
      const vencedor = Object.keys(pontos).reduce((a, b) => (pontos[a] >= pontos[b] ? a : b));
      const p = this.perfis[vencedor];
      return { titulo: p.nome, resumo: p.desc, detalhes: { perfil: vencedor, pontos } };
    },
  },

  {
    id: "linguagens",
    nome: "Linguagens do Amor",
    descricao: "Qual é a sua forma de amar e de se sentir amado?",
    cor: "#c9a96e",
    icon: "❤️",
    perguntas: [
      { pergunta: "O que mais faz você se sentir amado(a)?", opcoes: [
        { t: "Ouvir 'eu te amo' e elogios sinceros", k: "afirmacao" },
        { t: "Passar tempo juntos, sem distrações", k: "qualidade" },
        { t: "Receber um presente pensado para você", k: "presentes" },
        { t: "Quando ajudam você nas tarefas", k: "servico" } ] },
      { pergunta: "Como você gosta de demonstrar amor?", opcoes: [
        { t: "Com palavras carinhosas e incentivo", k: "afirmacao" },
        { t: "Reservando tempo exclusivo", k: "qualidade" },
        { t: "Escolhendo um presente especial", k: "presentes" },
        { t: "Fazendo algo útil pelo outro", k: "servico" } ] },
      { pergunta: "Em um dia difícil, o que mais te ajuda?", opcoes: [
        { t: "Uma mensagem de incentivo", k: "afirmacao" },
        { t: "Alguém presente, só ouvindo", k: "qualidade" },
        { t: "Um mimo que surpreende", k: "presentes" },
        { t: "Alguém que cuida das tarefas por você", k: "servico" } ] },
      { pergunta: "Um encontro perfeito inclui…", opcoes: [
        { t: "Conversa afetuosa e declarações", k: "afirmacao" },
        { t: "Tempo a sós, sem celular", k: "qualidade" },
        { t: "Um presente inesperado", k: "presentes" },
        { t: "Um jantar preparado a quatro mãos", k: "servico" } ] },
      { pergunta: "O que mais magoa você?", opcoes: [
        { t: "Palavras duras ou críticas", k: "afirmacao" },
        { t: "Falta de atenção e presença", k: "qualidade" },
        { t: "Esquecer datas importantes", k: "presentes" },
        { t: "Não receber ajuda quando precisa", k: "servico" } ] },
      { pergunta: "Para você, amor é…", opcoes: [
        { t: "Dito e reafirmado em palavras", k: "afirmacao" },
        { t: "Vivido no tempo compartilhado", k: "qualidade" },
        { t: "Materializado em gestos e mimos", k: "presentes" },
        { t: "Provado em atos de cuidado", k: "servico" } ] },
    ],
    perfis: {
      afirmacao: { nome: "Palavras de Afirmação", desc: "Você se sente amado(a) através de elogios, incentivo e declarações sinceras. Use palavras para edificar o seu casal." },
      qualidade: { nome: "Tempo de Qualidade", desc: "A atenção plena e o tempo a sós são o seu combustível. Reservem momentos sem distrações para se reconectar." },
      presentes: { nome: "Receber Presentes", desc: "Para você, um presente pensado é símbolo concreto de amor. Não é pelo valor, mas pela atenção de quem lembrou de você." },
      servico: { nome: "Atos de Serviço", desc: "Você se sente amado(a) quando o outro alivia o seu fardo. Ajudar nas tarefas é a sua linguagem do amor." },
    },
    calcular(respostas) {
      const pontos = {};
      respostas.forEach((k) => (pontos[k] = (pontos[k] || 0) + 1));
      const vencedor = Object.keys(pontos).reduce((a, b) => (pontos[a] >= pontos[b] ? a : b));
      const p = this.perfis[vencedor];
      return { titulo: p.nome, resumo: p.desc, detalhes: { perfil: vencedor, pontos } };
    },
  },

  {
    id: "temperamento",
    nome: "Temperamento",
    descricao: "Conheça o seu temperamento dominante.",
    cor: "#6d2b5f",
    icon: "🌟",
    perguntas: [
      { pergunta: "Em uma festa, você costuma…", opcoes: [
        { t: "Conversar com todo mundo, animado(a)", k: "sanguineo" },
        { t: "Liderar e organizar as coisas", k: "colerico" },
        { t: "Observar e analisar as pessoas", k: "melancolico" },
        { t: "Ficar à vontade, sem agitação", k: "fleumatico" } ] },
      { pergunta: "Diante de uma decisão, você…", opcoes: [
        { t: "Decide rápido e segue o coração", k: "sanguineo" },
        { t: "Decide com firmeza e objetividade", k: "colerico" },
        { t: "Pesa prós e contras com cuidado", k: "melancolico" },
        { t: "Prefere esperar e evitar conflito", k: "fleumatico" } ] },
      { pergunta: "Sob pressão, você tende a…", opcoes: [
        { t: "Desabafar e buscar apoio social", k: "sanguineo" },
        { t: "Assumir o controle da situação", k: "colerico" },
        { t: "Se preocupar e planejar detalhes", k: "melancolico" },
        { t: "Manter a calma e seguir estável", k: "fleumatico" } ] },
      { pergunta: "Seu maior ponto forte é…", opcoes: [
        { t: "Alegria contagiante", k: "sanguineo" },
        { t: "Determinação e liderança", k: "colerico" },
        { t: "Perfeccionismo e profundidade", k: "melancolico" },
        { t: "Paciência e equilíbrio", k: "fleumatico" } ] },
      { pergunta: "Em um relacionamento, você valoriza…", opcoes: [
        { t: "Diversão e espontaneidade", k: "sanguineo" },
        { t: "Progresso e conquistas", k: "colerico" },
        { t: "Lealdade e detalhes", k: "melancolico" },
        { t: "Harmonia e estabilidade", k: "fleumatico" } ] },
      { pergunta: "Quando contrariado, você…", opcoes: [
        { t: "Esquece rápido e volta ao bom humor", k: "sanguineo" },
        { t: "Enfrenta e resolve logo", k: "colerico" },
        { t: "Guarda e repassa o que aconteceu", k: "melancolico" },
        { t: "Evita o confronto e cede", k: "fleumatico" } ] },
    ],
    perfis: {
      sanguineo: { nome: "Sanguíneo", desc: "Comunicativo, alegre e sociável. Você aquece os ambientes e encanta pelas relações. Cuidado com a dispersão." },
      colerico: { nome: "Colérico", desc: "Determinado, prático e líder. Você conduz e realiza. Lembre-se de ouvir e incluir o outro nas decisões." },
      melancolico: { nome: "Melancólico", desc: "Profundo, leal e detalhista. Você sente e analisa com cuidado. Cuide para não guardar mágoas." },
      fleumatico: { nome: "Fleumático", desc: "Calmo, paciente e estável. Você é o equilíbrio do casal. Cuide para não evitar conversas necessárias." },
    },
    calcular(respostas) {
      const pontos = {};
      respostas.forEach((k) => (pontos[k] = (pontos[k] || 0) + 1));
      const vencedor = Object.keys(pontos).reduce((a, b) => (pontos[a] >= pontos[b] ? a : b));
      const p = this.perfis[vencedor];
      return { titulo: p.nome, resumo: p.desc, detalhes: { perfil: vencedor, pontos } };
    },
  },

  {
    id: "grafico",
    nome: "Gráfico do Amor",
    descricao: "Veja um gráfico das áreas do seu relacionamento.",
    cor: "#8a4f7d",
    icon: "📊",
    tipo: "grafico",
    perguntas: [
      { pergunta: "Como está a comunicação entre vocês?", dim: "Comunicação", opcoes: [
        { t: "Conversamos com facilidade e clareza", v: 4 },
        { t: "Conversamos, mas às vezes há ruídos", v: 3 },
        { t: "Conversamos pouco sobre o importante", v: 2 },
        { t: "É difícil se entender", v: 1 } ] },
      { pergunta: "Como está a confiança um no outro?", dim: "Confiança", opcoes: [
        { t: "Total e incondicional", v: 4 },
        { t: "Forte, com pequenas dúvidas", v: 3 },
        { t: "Em construção", v: 2 },
        { t: "Precisa de muita atenção", v: 1 } ] },
      { pergunta: "Como está a intimidade e o afeto?", dim: "Intimidade", opcoes: [
        { t: "Forte e presente no dia a dia", v: 4 },
        { t: "Boa, mas poderia ser mais frequente", v: 3 },
        { t: "Rara entre as correrias", v: 2 },
        { t: "Quase inexistente", v: 1 } ] },
      { pergunta: "Como está a diversão entre vocês?", dim: "Diversão", opcoes: [
        { t: "Nos divertimos muito juntos", v: 4 },
        { t: "Tem momentos divertidos", v: 3 },
        { t: "Raramente nos divertimos", v: 2 },
        { t: "Falta leveza", v: 1 } ] },
      { pergunta: "Como está o sentido e propósito de vocês?", dim: "Propósitos", opcoes: [
        { t: "Caminhamos rumo a sonhos comuns", v: 4 },
        { t: "Temos alguns sonhos compartilhados", v: 3 },
        { t: "Cada um segue o seu", v: 2 },
        { t: "Falta um norte juntos", v: 1 } ] },
    ],
    calcular(respostas) {
      const dims = {};
      respostas.forEach((r) => { dims[r.dim] = (dims[r.dim] || 0) + r.v; });
      const labels = ["Comunicação", "Confiança", "Intimidade", "Diversão", "Propósitos"];
      const valores = labels.map((l) => dims[l] || 0);
      const media = (valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(1);
      let titulo = "Relação Forte e Saudável";
      let resumo = "Vocês cultivam um relacionamento equilibrado nas principais áreas. Continuem investindo juntas.";
      if (media < 2.5) { titulo = "Relação que merece cuidado"; resumo = "Há áreas pedindo atenção. Conversem abertamente sobre onde podem crescer juntos."; }
      else if (media < 3.5) { titulo = "Relação em crescimento"; resumo = "Vocês têm uma base boa com espaço para amadurecer. Foquem nos pontos mais baixos do gráfico."; }
      return { titulo, resumo, detalhes: { dims, media }, grafico: { labels, valores } };
    },
  },
];

// ===== Renderização =====
let testeAtivo = null;

function renderGrid(container) {
  testeAtivo = null;
  container.innerHTML = `
    <div class="quiz__intro" style="margin-bottom:24px">
      <p>Escolham um teste para fazer juntos. Sem respostas certas — apenas a verdade de quem vocês são.</p>
    </div>
    <div class="tests-grid">
      ${TESTES.map((t) => `
        <button class="test-card" data-teste="${t.id}">
          <span class="test-card__icon" style="background:${t.cor}">${t.icon}</span>
          <span class="test-card__title">${t.nome}</span>
          <span class="test-card__desc">${t.descricao}</span>
        </button>`).join("")}
    </div>`;
  container.querySelectorAll("[data-teste]").forEach((b) =>
    b.addEventListener("click", () => start(b.dataset.teste, container))
  );
}

function start(id, container) {
  const teste = TESTES.find((t) => t.id === id);
  if (!teste) return;
  testeAtivo = { teste, index: 0, respostas: [] };
  renderPergunta(container);
}

function renderPergunta(container) {
  const { teste, index, respostas } = testeAtivo;
  const q = teste.perguntas[index];
  container.innerHTML = `
    <div class="quiz">
      <button class="quiz__back" id="quizBack">← Voltar aos testes</button>
      <div class="quiz__box">
        <div class="quiz__progress">
          <span>${index + 1}</span> / ${teste.perguntas.length} &middot; ${teste.nome}
          <div class="quiz__bar"><div class="quiz__bar-fill" style="width:${(index / teste.perguntas.length) * 100}%"></div></div>
        </div>
        <h3 class="quiz__question">${q.pergunta}</h3>
        <div class="quiz__options">
          ${q.opcoes.map((o) => `<button class="quiz__opt" data-k="${o.k || ""}" data-v="${o.v ?? ""}" data-dim="${o.dim || ""}">${o.t}</button>`).join("")}
        </div>
      </div>
    </div>`;
  document.getElementById("quizBack").addEventListener("click", () => renderGrid(container));
  container.querySelectorAll(".quiz__opt").forEach((b) =>
    b.addEventListener("click", () => responder(b, container))
  );
}

function responder(btn, container) {
  const q = testeAtivo.teste.perguntas[testeAtivo.index];
  const opt = q.opcoes.find((o) => o.t === btn.textContent.trim());
  if (!opt) return;
  if (opt.k) testeAtivo.respostas.push(opt.k);
  else testeAtivo.respostas.push({ dim: opt.dim || q.dim, v: opt.v });
  testeAtivo.index++;
  if (testeAtivo.index < testeAtivo.teste.perguntas.length) {
    renderPergunta(container);
  } else {
    finalizar(container);
  }
}

function finalizar(container) {
  const { teste, respostas } = testeAtivo;
  const r = teste.calcular(respostas);
  let graficoHtml = "";
  if (r.grafico) graficoHtml = `<div class="result__chart"><canvas id="resultCanvas"></canvas></div>`;
  container.innerHTML = `
    <div class="quiz">
      <button class="quiz__back" id="quizBack">← Voltar aos testes</button>
      <div class="quiz__result">
        <p class="result__type">${teste.nome}</p>
        <h3>${r.titulo}</h3>
        <p>${r.resumo}</p>
        ${graficoHtml}
        <div class="result__actions">
          <button class="btn btn--gold" id="quizRetry">Refazer</button>
          <button class="btn btn--ghost" id="quizHome">Outros testes</button>
        </div>
      </div>
    </div>`;

  if (r.grafico && window.Chart) {
    new Chart(document.getElementById("resultCanvas"), {
      type: "radar",
      data: {
        labels: r.grafico.labels,
        datasets: [{ label: "Seu relacionamento", data: r.grafico.valores, fill: true, backgroundColor: "rgba(201,169,110,.25)", borderColor: "#c9a96e", pointBackgroundColor: "#4a1942", borderWidth: 2 }],
      },
      options: { scales: { r: { min: 0, max: 4, ticks: { stepSize: 1 } } }, plugins: { legend: { display: false } } },
    });
  }

  // Salvar resultado no servidor
  apiFetch("/resultado", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipoTeste: teste.id, titulo: r.titulo, resumo: r.resumo, detalhes: r.detalhes }),
  }).then(() => toast("Resultado salvo!")).catch(() => {});

  document.getElementById("quizRetry").addEventListener("click", () => start(teste.id, container));
  document.getElementById("quizHome").addEventListener("click", () => renderGrid(container));
}

window.LabiatoTests = { renderGrid, start };
