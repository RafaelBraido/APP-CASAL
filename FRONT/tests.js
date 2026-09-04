// ===== Testes interativos — baseados nos testes reais =====
// Linguagens do Amor: pares de afirmações (estilo Chapman, 15 pares)
// Temperamentos: 4 opções por pergunta (sanguíneo, colérico, melancólico, fleumático)

const LINGUAGENS = {
  afirmacao: {
    nome: "Palavras de Afirmação", icon: "💬", cor: "#c9a96e",
    desc: "Você se sente amado(a) através de elogios, incentivo e declarações sinceras. Palavras edificam você e enchem o seu tanque de amor.",
    dica: "Peça ao seu cônjuge palavras de encorajamento — e ofereça-as de volta.",
  },
  qualidade: {
    nome: "Tempo de Qualidade", icon: "⏳", cor: "#4a1942",
    desc: "A atenção plena e o tempo a sós são o seu combustível. Momentos sem distrações fazem você se sentir verdadeiramente amado(a).",
    dica: "Reserve momentos sem celular para se reconectar com quem você ama.",
  },
  presentes: {
    nome: "Receber Presentes", icon: "🎁", cor: "#8a4f7d",
    desc: "Um presente pensado é símbolo concreto de amor. Não é o valor, mas a atenção de quem lembrou de você.",
    dica: "Valorize também os gestos pequenos: um bilhete já é um presente.",
  },
  servico: {
    nome: "Atos de Serviço", icon: "🤝", cor: "#6d2b5f",
    desc: "Você se sente amado(a) quando o outro alivia o seu fardo. Ajudar nas tarefas é a sua linguagem do amor.",
    dica: "Diga ao seu cônjuge o que mais ajudaria você no dia a dia.",
  },
  toque: {
    nome: "Toque Físico", icon: "🤗", cor: "#b86b5a",
    desc: "Abraços, mãos dadas e a proximidade física comunicam amor para você de forma profunda e imediata.",
    dica: "Um abraço apertado por dia mantém a conexão viva.",
  },
};

function calcularPerfil(respostas, mapa) {
  const pontos = {};
  respostas.forEach((k) => (pontos[k] = (pontos[k] || 0) + 1));
  const chaves = Object.keys(mapa).sort((a, b) => (pontos[b] || 0) - (pontos[a] || 0));
  const top = mapa[chaves[0]];
  const ranking = chaves.map((k) => ({
    nome: mapa[k].nome, icon: mapa[k].icon, cor: mapa[k].cor,
    valor: pontos[k] || 0,
    pct: Math.round(((pontos[k] || 0) / respostas.length) * 100),
  }));
  return {
    titulo: top.nome, resumo: top.desc, dica: top.dica, icon: top.icon,
    nota: chaves[1] ? `Sua segunda tendência é ${mapa[chaves[1]].nome}.` : "",
    detalhes: { perfil: chaves[0], pontos },
    ranking,
  };
}

const TESTES = [
  {
    id: "linguagens",
    nome: "Linguagens do Amor",
    descricao: "Baseado no teste de Gary Chapman: escolha entre pares de afirmações.",
    cor: "#c9a96e",
    icon: "❤️",
    tempo: "3 min",
    perguntas: [
      { par: [
        { t: "Gosto de receber notas e mensagens de incentivo.", k: "afirmacao" },
        { t: "Gosto de receber abraços e carinhos.", k: "toque" } ] },
      { par: [
        { t: "Prefiro um tempo a sós com quem amo, sem distrações.", k: "qualidade" },
        { t: "Prefiro receber ajuda prática nas minhas tarefas.", k: "servico" } ] },
      { par: [
        { t: "Sinto-me amado(a) quando me elogiam.", k: "afirmacao" },
        { t: "Sinto-me amado(a) quando ganho um presente pensado.", k: "presentes" } ] },
      { par: [
        { t: "Um passeio a dois, só nós, me faz bem.", k: "qualidade" },
        { t: "Uma declaração sincera de amor me faz bem.", k: "afirmacao" } ] },
      { par: [
        { t: "Gosto quando alguém cuida das coisas por mim.", k: "servico" },
        { t: "Gosto quando alguém me abraça com força.", k: "toque" } ] },
      { par: [
        { t: "Um presente inesperado me faz sentir especial.", k: "presentes" },
        { t: "Uma noite de conversa olho no olho me faz sentir especial.", k: "qualidade" } ] },
      { par: [
        { t: "Palavras de encorajamento me motivam.", k: "afirmacao" },
        { t: "Atos de gentileza me tocam.", k: "servico" } ] },
      { par: [
        { t: "Prefiro demonstrar amor com toques e carinho.", k: "toque" },
        { t: "Prefiro demonstrar amor com presentes e mimos.", k: "presentes" } ] },
      { par: [
        { t: "O que mais me emociona é ouvir 'eu me importo com você'.", k: "afirmacao" },
        { t: "O que mais me emociona é um jantar preparado para mim.", k: "servico" } ] },
      { par: [
        { t: "Vivenciar momentos juntos me aproxima.", k: "qualidade" },
        { t: "Segurar as mãos e caminhar juntos me aproxima.", k: "toque" } ] },
      { par: [
        { t: "Uma carta escrita à mão vale ouro para mim.", k: "afirmacao" },
        { t: "Um mimo que eu mencionei querer vale ouro para mim.", k: "presentes" } ] },
      { par: [
        { t: "Gosto que me escutem com atenção total.", k: "qualidade" },
        { t: "Gosto que me ajudem sem que eu precise pedir.", k: "servico" } ] },
      { par: [
        { t: "Um abraço no fim de um dia difícil me acalma.", k: "toque" },
        { t: "Uma mensagem carinhosa no fim de um dia difícil me acalma.", k: "afirmacao" } ] },
      { par: [
        { t: "Lembrar datas com um presente mostra amor para mim.", k: "presentes" },
        { t: "Desligar o celular e estar presente mostra amor para mim.", k: "qualidade" } ] },
      { par: [
        { t: "Sinto-me cuidado(a) quando fazem algo útil por mim.", k: "servico" },
        { t: "Sinto-me cuidado(a) com um gesto físico de carinho.", k: "toque" } ] },
    ],
    calcular: (respostas) => calcularPerfil(respostas, LINGUAGENS),
  },

  {
    id: "temperamento",
    nome: "Temperamento",
    descricao: "Descubra seu temperamento dominante entre os quatro clássicos.",
    cor: "#6d2b5f",
    icon: "🌟",
    tempo: "2 min",
    perguntas: [
      { pergunta: "Em uma festa, você costuma…", opcoes: [
        { t: "Conversar com todo mundo, animado(a)", k: "sanguineo" },
        { t: "Liderar e organizar as coisas", k: "colerico" },
        { t: "Observar e analisar as pessoas", k: "melancolico" },
        { t: "Ficar à vontade, sem agitação", k: "fleumatico" } ] },
      { pergunta: "Diante de uma decisão importante, você…", opcoes: [
        { t: "Decide rápido e segue o coração", k: "sanguineo" },
        { t: "Decide com firmeza e objetividade", k: "colerico" },
        { t: "Pesa prós e contras com cuidado", k: "melancolico" },
        { t: "Prefere esperar e evitar conflito", k: "fleumatico" } ] },
      { pergunta: "Sob pressão, você tende a…", opcoes: [
        { t: "Desabafar e buscar apoio", k: "sanguineo" },
        { t: "Assumir o controle da situação", k: "colerico" },
        { t: "Se preocupar e planejar detalhes", k: "melancolico" },
        { t: "Manter a calma e seguir estável", k: "fleumatico" } ] },
      { pergunta: "Seu maior ponto forte é…", opcoes: [
        { t: "Alegria contagiante", k: "sanguineo" },
        { t: "Determinação e liderança", k: "colerico" },
        { t: "Profundidade e lealdade", k: "melancolico" },
        { t: "Paciência e equilíbrio", k: "fleumatico" } ] },
      { pergunta: "Como você reage a mudanças?", opcoes: [
        { t: "Animo-me com as novidades", k: "sanguineo" },
        { t: "Ajo rápido para resolver", k: "colerico" },
        { t: "Analiso os riscos antes", k: "melancolico" },
        { t: "Adapto-me com tranquilidade", k: "fleumatico" } ] },
      { pergunta: "No trabalho ou nos estudos, você…", opcoes: [
        { t: "Rendo bem com diversão e gente", k: "sanguineo" },
        { t: "Quero resultados e liderança", k: "colerico" },
        { t: "Quero tudo perfeito e bem feito", k: "melancolico" },
        { t: "Mantenho um ritmo constante", k: "fleumatico" } ] },
      { pergunta: "Quando contrariado, você…", opcoes: [
        { t: "Esquece rápido e volta ao bom humor", k: "sanguineo" },
        { t: "Enfrenta e resolve logo", k: "colerico" },
        { t: "Guarda e repensa o que houve", k: "melancolico" },
        { t: "Evita o confronto e cede", k: "fleumatico" } ] },
      { pergunta: "Com os amigos, você é…", opcoes: [
        { t: "A alma da roda", k: "sanguineo" },
        { t: "Quem organiza tudo", k: "colerico" },
        { t: "O conselheiro fiel", k: "melancolico" },
        { t: "Quem ouve com calma", k: "fleumatico" } ] },
      { pergunta: "Seu ambiente ideal é…", opcoes: [
        { t: "Cheio de gente e risadas", k: "sanguineo" },
        { t: "Eficiente, com tudo no lugar", k: "colerico" },
        { t: "Organizado e bonito nos detalhes", k: "melancolico" },
        { t: "Confortável e tranquilo", k: "fleumatico" } ] },
      { pergunta: "Numa discussão, você…", opcoes: [
        { t: "Desarma com bom humor", k: "sanguineo" },
        { t: "Quer vencer o argumento", k: "colerico" },
        { t: "Precisa de justiça e lógica", k: "melancolico" },
        { t: "Procura apaziguar", k: "fleumatico" } ] },
      { pergunta: "Sua energia no dia a dia é…", opcoes: [
        { t: "Em picos, muito entusiasmo", k: "sanguineo" },
        { t: "Dirigida a metas", k: "colerico" },
        { t: "Focada em qualidade", k: "melancolico" },
        { t: "Estável e leve", k: "fleumatico" } ] },
      { pergunta: "Um elogio que combina com você…", opcoes: [
        { t: "“Você ilumina o ambiente”", k: "sanguineo" },
        { t: "“Você realiza o que fala”", k: "colerico" },
        { t: "“Você tem um coração profundo”", k: "melancolico" },
        { t: "“Você é paz em pessoa”", k: "fleumatico" } ] },
    ],
    perfis: {
      sanguineo: { nome: "Sanguíneo", icon: "🌞", cor: "#e0a458", desc: "Comunicativo, alegre e sociável. Você aquece os ambientes e encanta pelas relações, com energia contagiante.", dica: "Cuide da dispersão: anime-se, mas também conclua o que começar." },
      colerico: { nome: "Colérico", icon: "🔥", cor: "#c0392b", desc: "Determinado, prático e líder. Você conduz e realiza com objetividade e coragem.", dica: "Lembre-se de ouvir e incluir o outro nas decisões." },
      melancolico: { nome: "Melancólico", icon: "🌧️", cor: "#4a1942", desc: "Profundo, leal e detalhista. Você sente e analisa com cuidado, buscando o melhor em tudo.", dica: "Cuide para não guardar mágoas: converse sobre o que sente." },
      fleumatico: { nome: "Fleumático", icon: "🍃", cor: "#7da58c", desc: "Calmo, paciente e estável. Você é o equilíbrio do ambiente, com uma paz que contagia.", dica: "Evite adiar conversas necessárias: a sua voz importa." },
    },
    calcular(respostas) { return calcularPerfil(respostas, this.perfis); },
  },

  {
    id: "casal",
    nome: "Teste do Casal",
    descricao: "Descubram o perfil que descreve a relação de vocês.",
    cor: "#4a1942",
    icon: "💞",
    tempo: "2 min",
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
      conexo: { nome: "Casal Conexo", icon: "💞", cor: "#4a1942", desc: "Vocês encontram a essência um no outro. A intimidade, a conversa sincera e o tempo de qualidade são a base de tudo.", dica: "Protejam os momentos a dois: são o coração do casal." },
      aventureiro: { nome: "Casal Aventureiro", icon: "🚀", cor: "#c9a96e", desc: "A relação de vocês é movida por novidade e descobertas. Reserve tempo para se surpreender — pequenas aventuras mantêm a chama acesa.", dica: "Planejem uma novidade por mês, juntos." },
      sonhador: { nome: "Casal Sonhador", icon: "✨", cor: "#8a4f7d", desc: "Vocês enxergam longe e sonham juntos. O futuro é construído a quatro mãos, com esperança e propósito.", dica: "Escrevam os sonhos e revisitem-nos sempre." },
      firme: { nome: "Casal Firme", icon: "🛡️", cor: "#6d2b5f", desc: "Vocês são o porto seguro um do outro. A confiança e o cuidado prático sustentam tudo. O amor se prova nos detalhes do cotidiano.", dica: "Não esqueçam a leveza: também é preciso namorar." },
    },
    calcular(respostas) {
      return calcularPerfil(respostas, this.perfis);
    },
  },

  {
    id: "grafico",
    nome: "Gráfico do Amor",
    descricao: "Veja um gráfico das áreas do seu relacionamento.",
    cor: "#8a4f7d",
    icon: "📊",
    tempo: "2 min",
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
      const labels = ["Comunicação", "Confiança", "Intimidade", "Diversão", "Propósitos"];
      const cores = ["#4a1942", "#c9a96e", "#6d2b5f", "#8a4f7d", "#b86b5a"];
      const dims = {};
      respostas.forEach((r) => { dims[r.dim] = (dims[r.dim] || 0) + r.v; });
      const valores = labels.map((l) => dims[l] || 0);
      const media = valores.reduce((a, b) => a + b, 0) / valores.length;
      let titulo = "Relação Forte e Saudável";
      let resumo = "Vocês cultivam um relacionamento equilibrado nas principais áreas. Continuem investindo juntos.";
      let dica = "Celebrem o que já construíram e cuidem do que é bom.";
      if (media < 2.5) { titulo = "Relação que merece cuidado"; resumo = "Há áreas pedindo atenção. Conversem abertamente sobre onde podem crescer juntos."; dica = "Escolham a área mais baixa do gráfico e comecem por ela."; }
      else if (media < 3.5) { titulo = "Relação em crescimento"; resumo = "Vocês têm uma base boa com espaço para amadurecer. Foquem nos pontos mais baixos do gráfico."; dica = "Um passo por semana já muda o quadro."; }
      const ranking = labels.map((l, i) => ({ nome: l, icon: "", cor: cores[i], valor: dims[l] || 0, pct: Math.round(((dims[l] || 0) / 4) * 100) }));
      return { titulo, resumo, dica, icon: "📊", detalhes: { dims, media: media.toFixed(1) }, ranking, grafico: { labels, valores } };
    },
  },
];

// ===== Renderização =====
let testeAtivo = null;
const PASTORES_FOTO = "https://media.base44.com/images/public/6a95e99d10e64c944d7a3b70/ec49256db_Foto-Rodrigo-e-Suelen-1.jpg";

// Portão: visitante sem conta na página de testes
function renderDemo(container) {
  testeAtivo = null;
  container.innerHTML = `
    <div class="gate">
      <span class="gate__lock">🔒</span>
      <h3>Os testes são exclusivos para membros</h3>
      <p>Crie sua conta gratuita para responder, ver o resultado na hora e salvá-lo na sua conta — ou conheça primeiro como tudo funciona.</p>
      <div class="hero__actions">
        <button class="btn btn--gold" id="demoConta">Criar conta</button>
        <a class="btn btn--ghost" href="#/demonstracao">Ver demonstração</a>
      </div>
    </div>`;
  document.getElementById("demoConta").addEventListener("click", () => abrirUser("cadastrar"));
}

// Página de demonstração (resumo do app + pastores)
function renderDemoPage(container) {
  const logado = typeof getUserToken === "function" && getUserToken();
  const amostra = [
    { icon: "💬", nome: "Palavras de Afirmação", pct: 40, cor: "#c9a96e" },
    { icon: "🤗", nome: "Toque Físico", pct: 27, cor: "#b86b5a" },
    { icon: "🤝", nome: "Atos de Serviço", pct: 20, cor: "#6d2b5f" },
    { icon: "⏳", nome: "Tempo de Qualidade", pct: 13, cor: "#4a1942" },
  ];
  container.innerHTML = `
    <div class="demo">
      <div class="demo__hero">
        <img class="demo__photo" src="${PASTORES_FOTO}" alt="Pastores Rodrigo e Suelen Labiak" />
        <div class="demo__hero-text">
          <p class="demo__kicker">Demonstração</p>
          <h3>Um app feito com fé para abençoar o seu casal</h3>
          <p>Os pastores Rodrigo &amp; Suelen Labiak reuniram, em um só lugar, devocionais diários, pregações e testes para casais. Crie sua conta gratuita e faça parte dessa comunidade.</p>
          <div class="hero__actions">
            ${logado
              ? `<a class="btn btn--gold" href="#/testes">Comece sua transformação como casal</a>`
              : `<button class="btn btn--gold" id="demoConta">Comece sua transformação como casal</button>`}
            <a class="btn btn--ghost" href="#/devocionais">Ver devocionais</a>
          </div>
        </div>
      </div>
      <div class="demo__grid">
        <div class="demo__card">
          <span class="demo__card-icon" style="background:#4a1942">📖</span>
          <strong>Devocionais diários</strong>
          <span>Palavra programada para cada dia da semana, para nutrir a vida a dois.</span>
        </div>
        <div class="demo__card">
          <span class="demo__card-icon" style="background:#6d2b5f">🎬</span>
          <strong>Pregações</strong>
          <span>Mensagens dos pastores direto do canal no YouTube, sempre atualizadas.</span>
        </div>
        <div class="demo__card">
          <span class="demo__card-icon" style="background:#c9a96e">💞</span>
          <strong>Testes para o casal</strong>
          <span>Linguagens do amor e mais — resultados na hora, simples e visuais, salvos na sua conta.</span>
        </div>
      </div>
      <div class="demo__sample">
        <p class="demo__kicker">Assim fica o resultado de um teste</p>
        <div class="ranking">
          ${amostra.map((x) => `
          <div class="rank-row">
            <span class="rank-label">${x.icon} ${x.nome}</span>
            <div class="rank-bar"><div class="rank-bar-fill" style="width:${x.pct}%;background:${x.cor}"></div></div>
            <span class="rank-pct">${x.pct}%</span>
          </div>`).join("")}
        </div>
        <p class="result__note">Resultado de exemplo do teste de Linguagens do Amor, baseado no método de Gary Chapman.</p>
      </div>
    </div>`;
  const btn = document.getElementById("demoConta");
  if (btn) btn.addEventListener("click", () => abrirUser("cadastrar"));
}

function renderGrid(container) {
  testeAtivo = null;
  if (typeof getUserToken !== "function" || !getUserToken()) return renderDemo(container);
  container.innerHTML = `
    <div class="quiz__intro" style="margin-bottom:24px">
      <p>Escolha um teste e veja o resultado na hora. Sem respostas certas — apenas a verdade de quem vocês são.</p>
    </div>
    <div class="tests-grid">
      ${TESTES.map((t) => `
        <button class="test-card" data-teste="${t.id}">
          <span class="test-card__icon" style="background:${t.cor}">${t.icon}</span>
          <span class="test-card__title">${t.nome}</span>
          <span class="test-card__desc">${t.descricao}</span>
          <span class="test-card__meta">${t.perguntas.length} perguntas &middot; ${t.tempo}</span>
        </button>`).join("")}
    </div>`;
  container.querySelectorAll("[data-teste]").forEach((b) =>
    b.addEventListener("click", () => { location.hash = "#/teste/" + b.dataset.teste; })
  );
}

function start(id, container) {
  if (typeof getUserToken !== "function" || !getUserToken()) return renderDemo(container);
  const teste = TESTES.find((t) => t.id === id);
  if (!teste) {
    container.innerHTML = `<div class="quiz__box"><h3 class="quiz__question">Teste não encontrado</h3><a class="btn btn--gold" href="#/testes">Voltar aos testes</a></div>`;
    return;
  }
  testeAtivo = { teste, index: 0, respostas: [] };
  renderPergunta(container);
}

function renderPergunta(container) {
  const { teste, index } = testeAtivo;
  const q = teste.perguntas[index];
  const enunciado = q.pergunta || "Escolha a afirmação que mais combina com você:";
  let opcoesHtml;
  if (q.par) {
    opcoesHtml = `<div class="quiz__pair">${q.par
      .map((o, i) => `<button class="quiz__opt quiz__opt--pair" data-i="${i}"><span class="quiz__opt-letter">${i === 0 ? "A" : "B"}</span>${o.t}</button>`)
      .join("")}</div>`;
  } else {
    opcoesHtml = `<div class="quiz__options">${q.opcoes
      .map((o, i) => `<button class="quiz__opt" data-i="${i}">${o.t}</button>`)
      .join("")}</div>`;
  }
  container.innerHTML = `
    <div class="quiz">
      <a class="quiz__back" href="#/testes">← Voltar aos testes</a>
      <div class="quiz__box">
        <div class="quiz__progress">
          <span>${index + 1}</span> / ${teste.perguntas.length} &middot; ${teste.nome}
          <div class="quiz__bar"><div class="quiz__bar-fill" style="width:${(index / teste.perguntas.length) * 100}%"></div></div>
        </div>
        <h3 class="quiz__question">${enunciado}</h3>
        ${opcoesHtml}
      </div>
    </div>`;
  container.querySelectorAll(".quiz__opt").forEach((b) =>
    b.addEventListener("click", () => responder(b, container))
  );
}

function responder(btn, container) {
  const q = testeAtivo.teste.perguntas[testeAtivo.index];
  const lista = q.par || q.opcoes;
  const opt = lista[Number(btn.dataset.i)];
  if (!opt) return;
  if (opt.k) testeAtivo.respostas.push(opt.k);
  else testeAtivo.respostas.push({ dim: opt.dim || q.dim, v: opt.v });
  testeAtivo.index++;
  if (testeAtivo.index < testeAtivo.teste.perguntas.length) renderPergunta(container);
  else finalizar(container);
}

function finalizar(container) {
  const { teste, respostas } = testeAtivo;
  const r = teste.calcular(respostas);
  const logado = typeof getUserToken === "function" && getUserToken();

  const rankingHtml = r.ranking
    ? `<div class="ranking">${r.ranking.map((x) => `
        <div class="rank-row">
          <span class="rank-label">${x.icon ? x.icon + " " : ""}${x.nome}</span>
          <div class="rank-bar"><div class="rank-bar-fill" data-w="${x.pct}" style="width:0;background:${x.cor}"></div></div>
          <span class="rank-pct">${x.pct}%</span>
        </div>`).join("")}</div>`
    : "";
  const chartHtml = (r.grafico || r.ranking) ? `<div class="result__chart"><canvas id="resultCanvas"></canvas></div>` : "";

  container.innerHTML = `
    <div class="quiz">
      <a class="quiz__back" href="#/testes">← Voltar aos testes</a>
      <div class="quiz__result">
        <p class="result__type">${teste.nome}</p>
        <div class="result__hero">
          <span class="result__icon">${r.icon || teste.icon}</span>
          <h3>${r.titulo}</h3>
        </div>
        <p>${r.resumo}</p>
        ${r.dica ? `<div class="result__tip"><span class="result__tip-icon">💡</span><div><strong>Dica para o casal</strong>${r.dica}</div></div>` : ""}
        ${rankingHtml}
        ${r.nota ? `<p class="result__note">${r.nota}</p>` : ""}
        ${logado ? `<p class="result__saved" id="resultSaved" hidden>✓ Resultado salvo na sua conta</p>` : ""}
        ${chartHtml}
        ${logado ? "" : `<p class="result__note">Crie sua conta para salvar este resultado e acompanhar seu progresso.</p>`}
        <div class="result__actions">
          <button class="btn btn--gold" id="quizRetry">Refazer</button>
          ${logado ? "" : `<button class="btn btn--ghost" id="quizConta">Criar conta</button>`}
          <a class="btn btn--ghost" href="#/testes">Outros testes</a>
        </div>
      </div>
    </div>`;

  // Animar as barras do ranking
  requestAnimationFrame(() =>
    setTimeout(() => {
      container.querySelectorAll(".rank-bar-fill").forEach((b) => (b.style.width = b.dataset.w + "%"));
    }, 80)
  );

  // Gráfico do resultado
  const ctx = document.getElementById("resultCanvas");
  if (ctx && window.Chart) {
    if (r.grafico) {
      new Chart(ctx, {
        type: "radar",
        data: {
          labels: r.grafico.labels,
          datasets: [{ label: "Seu relacionamento", data: r.grafico.valores, fill: true, backgroundColor: "rgba(201,169,110,.25)", borderColor: "#c9a96e", pointBackgroundColor: "#4a1942", borderWidth: 2 }],
        },
        options: { scales: { r: { min: 0, max: 4, ticks: { stepSize: 1 } } }, plugins: { legend: { display: false } } },
      });
    } else if (r.ranking) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: r.ranking.map((x) => x.nome),
          datasets: [{ data: r.ranking.map((x) => x.valor), backgroundColor: r.ranking.map((x) => x.cor), borderRadius: 8 }],
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } },
      });
    }
  }

  // Salvar resultado (apenas para usuários logados)
  if (logado) {
    apiFetch("/resultado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipoTeste: teste.id, titulo: r.titulo, resumo: r.resumo, detalhes: r.detalhes }),
    }).then(() => {
      const saved = document.getElementById("resultSaved");
      if (saved) saved.hidden = false;
      toast("Resultado salvo!");
    }).catch(() => {});
  }

  document.getElementById("quizRetry").addEventListener("click", () => start(teste.id, container));
  const btnConta = document.getElementById("quizConta");
  if (btnConta) btnConta.addEventListener("click", () => abrirUser("cadastrar"));
}

window.LabiakTests = { renderGrid, start, renderDemoPage };
