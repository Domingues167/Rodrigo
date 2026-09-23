/* ==========================================================================
   TEMPLO DE KIMBANDA MALEI MARIA PADILHA DAS ALMAS E EXU TRANCA RUA
   Táta Rodrigo de Padilha | Filiado pela LEUCAB - Reg. Nº 2784
   Telefones: (11) 98355-7454 / (11) 96660-7249
   ========================================================================== */

const WHATSAPP_PRIMARY = '5511983557454';
const WHATSAPP_SECONDARY = '5511966607249';

document.addEventListener('DOMContentLoaded', () => {
  initEmberCanvas();
  initAmbientAudio();
  initNavigation();
  initRealms();
  initOracle();
  initSimulator();
  initServiceModals();
  initFaqAccordion();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. CANVAS DE BRASAS SAGRADAS (PARTÍCULAS ASCENDENTES)
   -------------------------------------------------------------------------- */
function initEmberCanvas() {
  const canvas = document.getElementById('ember-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 70;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Ember {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.8 + 1;
      this.speedY = -(Math.random() * 1.2 + 0.6);
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.7 + 0.3;
      this.decay = Math.random() * 0.004 + 0.002;
      const colors = [
        '212, 175, 55',   // Ouro
        '220, 38, 38',    // Carmesim
        '245, 158, 11',   // Âmbar
        '254, 240, 138'   // Ouro Claro
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.015) * 0.4;
      this.opacity -= this.decay;

      if (this.opacity <= 0 || this.y < -10) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${this.color}, 0.8)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Ember());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. ÁUDIO AMBIENTE PROCEDURAL (WEB AUDIO API - FOGUEIRA & BRASAS)
   -------------------------------------------------------------------------- */
function initAmbientAudio() {
  const toggleBtn = document.getElementById('ambientToggle');
  if (!toggleBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let gainNode = null;
  let noiseNode = null;
  let crackleTimer = null;

  function startFireSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 1.5);
      gainNode.connect(audioCtx.destination);

      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.04;
        b6 = white * 0.115926;
      }

      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      const lowpass = audioCtx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(320, audioCtx.currentTime);

      noiseNode.connect(lowpass);
      lowpass.connect(gainNode);
      noiseNode.start();

      function scheduleCrackle() {
        if (!isPlaying || !audioCtx) return;

        const crackleTime = Math.random() * 280 + 80;
        crackleTimer = setTimeout(() => {
          if (!isPlaying || !audioCtx) return;

          const osc = audioCtx.createOscillator();
          const crackleGain = audioCtx.createGain();
          const filter = audioCtx.createBiquadFilter();

          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(800 + Math.random() * 1200, audioCtx.currentTime);
          filter.Q.setValueAtTime(4 + Math.random() * 6, audioCtx.currentTime);

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(150 + Math.random() * 250, audioCtx.currentTime);

          const dur = 0.015 + Math.random() * 0.035;
          crackleGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
          crackleGain.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.12, audioCtx.currentTime + 0.005);
          crackleGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);

          osc.connect(filter);
          filter.connect(crackleGain);
          crackleGain.connect(gainNode);

          osc.start();
          osc.stop(audioCtx.currentTime + dur + 0.05);

          scheduleCrackle();
        }, crackleTime);
      }

      scheduleCrackle();
      isPlaying = true;
      toggleBtn.classList.add('playing');
      toggleBtn.setAttribute('title', 'Pausar som ambiente de fogueira sagrada');
    } catch (e) {
      console.warn('Web Audio API não inicializada:', e);
    }
  }

  function stopFireSound() {
    if (gainNode && audioCtx) {
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        if (noiseNode) {
          try { noiseNode.stop(); } catch(e){}
        }
        if (audioCtx) {
          audioCtx.close();
        }
        audioCtx = null;
      }, 500);
    }
    clearTimeout(crackleTimer);
    isPlaying = false;
    toggleBtn.classList.remove('playing');
    toggleBtn.setAttribute('title', 'Ouvir som ambiente ritualístico');
  }

  toggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      startFireSound();
    } else {
      stopFireSound();
    }
  });
}

/* --------------------------------------------------------------------------
   3. NAVEGAÇÃO & HEADER RESPONSIVO
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          navMenu.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. OS SETE REINOS DA KIMBANDA MALEI
   -------------------------------------------------------------------------- */
const realmsData = {
  encruzilhada: {
    title: 'Reino das Encruzilhadas',
    governor: 'Regido por Exu Tranca Rua & Pomba Gira das 7 Encruzilhadas',
    desc: 'O reino de abertura e fechamento de portas materiais e espirituais. Onde todo travamento é rompido e onde os pactos de vitória ganham passagem.',
    invocation: '"Laroyê Exu Tranca Rua! Saravá a Força da Encruzilhada Aberta!"',
    element: 'Fogo & Encruzilhada Aberta',
    action: 'Abertura de Caminhos, Negócios e Corte de Amarras'
  },
  cruzeiro: {
    title: 'Reino dos Cruzeiros',
    governor: 'Regido por Exu Rei dos Cruzeiros & Pomba Gira dos Cruzeiros',
    desc: 'O reino da autoridade, das sentenças de justiça e das grandes decisões. Ordena forças e sela acordos espirituais perpétuos.',
    invocation: '"Saravá o Senhor dos Cruzeiros! Guarda de ferro e justiça!"',
    element: 'Madeira Sagrada & Ferro de Tridente',
    action: 'Sentenças de Justiça, Autoridade e Vitória em Disputas'
  },
  matas: {
    title: 'Reino das Matas',
    governor: 'Regido por Exu Rei das Matas & Pomba Gira das Matas',
    desc: 'O segredo das ervas bravas, raízes raras e forças ocultas da terra. Reino do vigor, da caça de inimigos e da cura espiritual profunda.',
    invocation: '"Okê Caboclo Quimbandeiro! Laroyê Exu das Matas!"',
    element: 'Folhas Sagradas & Seiva da Terra',
    action: 'Cura, Vitalidade e Caçada Espiritual'
  },
  kalunga: {
    title: 'Reino da Kalunga (Cemitério)',
    governor: 'Regido por Exu Rei da Kalunga & Pomba Gira Maria Padilha das Almas',
    desc: 'O solo sagrado da grande transformação, do fim de ciclos e da cobrança severa. Onde as magias pesadas são quebradas e onde a derrota dos inimigos é selada.',
    invocation: '"Laroyê Maria Padilha das Almas! Salve o Povo da Kalunga!"',
    element: 'Terra da Kalunga & Fogo Negro',
    action: 'Destruição de Inimigos, Morte de Feitiços e Quebra Definitiva'
  },
  almas: {
    title: 'Reino das Almas',
    governor: 'Regido por Pomba Gira Maria Padilha das Almas & Exu das Almas',
    desc: 'O comando supremo sobre obsessores, encostos e espíritos perturbadores. Reino que devolve a autoridade a quem foi traído ou lesado.',
    invocation: '"Laroyê Padilha das Almas! Rainha do meu caminhar!"',
    element: 'Luz de Velas Brancas & Vento Noturno',
    action: 'Amarração Amorosa Forte, Limpeza Pesada e Domínio'
  },
  lira: {
    title: 'Reino da Lira (Reino de Lúcifer)',
    governor: 'Regido por Lúcifer Maioral & Pomba Gira Cigana da Lira',
    desc: 'O trono da alta sociedade, ouro, fortuna, contratos grandiosos e sedução de poder. Onde a Aliança de Prosperidade é assentada para riqueza inabalável.',
    invocation: '"Salve a Força do Maioral! Salve a Lira de Ouro e Poder!"',
    element: 'Ouro, Metais Nobres e Vinhos Sagrados',
    action: 'Aliança de Prosperidade com Lúcifer, Fama e Fortuna'
  },
  praia: {
    title: 'Reino da Praia (Águas Salgadas)',
    governor: 'Regido por Exu Rei da Praia & Pomba Gira da Praia',
    desc: 'A força implacável das marés que arrastam para as profundezas todo mal, inveja e feitiçaria, trazendo renovação e equilíbrio.',
    invocation: '"Saravá o Povo da Praia na Kimbanda Malei!"',
    element: 'Águas do Mar & Areia das Marés',
    action: 'Descarrego Forte e Purificação de Cargas'
  }
};

function initRealms() {
  const realmBtns = document.querySelectorAll('.realm-btn');
  const titleEl = document.getElementById('realmTitle');
  const govEl = document.getElementById('realmGovernor');
  const descEl = document.getElementById('realmDesc');
  const invoEl = document.getElementById('realmInvocation');
  const elemEl = document.getElementById('realmElement');
  const actEl = document.getElementById('realmAction');

  if (!realmBtns.length || !titleEl) return;

  realmBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      realmBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const realmKey = btn.getAttribute('data-realm');
      const data = realmsData[realmKey];
      if (!data) return;

      const container = document.getElementById('realmContentBox');
      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';
      container.style.transition = 'all 0.25s ease';

      setTimeout(() => {
        titleEl.textContent = data.title;
        govEl.textContent = data.governor;
        descEl.textContent = data.desc;
        invoEl.textContent = data.invocation;
        elemEl.textContent = data.element;
        actEl.textContent = data.action;

        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 250);
    });
  });
}

/* --------------------------------------------------------------------------
   5. ORÁCULO INTERATIVO DE EXU & MARIA PADILHA
   -------------------------------------------------------------------------- */
const oracleDeck = [
  {
    roman: 'LÂMINA I',
    name: 'Pomba Gira Maria Padilha das Almas',
    archetype: 'A Rainha Soberana das Almas & da Paixão',
    verdict: 'Quem tem Padilha por coroa não se curva nem aceita humilhação. Seus sentimentos e sua autoridade exigem firmeza. O domínio amoroso e o respeito retornam a você agora.',
    action: 'Conselho: Mantenha sua cabeça erguida, acenda sua chama e confie no feitiço que está sendo tecido a seu favor.'
  },
  {
    roman: 'LÂMINA II',
    name: 'Exu Tranca Rua',
    archetype: 'O Guardião Supremo dos Caminhos e da Ordem',
    verdict: 'Seus caminhos foram trancados para afastar quem não prestava. Agora, pela minha autoridade, as 7 encruzilhadas se abrem para os negócios, o dinheiro e a vitória sobre os falsos.',
    action: 'Conselho: Aja com decisão. Tranca Rua está à frente da sua caminhada quebrando todas as armadilhas.'
  },
  {
    roman: 'LÂMINA III',
    name: 'O Maioral Lúcifer',
    archetype: 'O Senhor da Luz Astral, da Lira e do Ouro',
    verdict: 'A mediocridade não pertence ao seu destino. A Aliança de Prosperidade exige ambição, inteligência estratégica e coragem para governar sua própria fortuna sem medo.',
    action: 'Conselho: Firme seu pacto com o progresso e não aceite migalhas quando você nasceu para ter abundância.'
  },
  {
    roman: 'LÂMINA IV',
    name: 'Exu Tiriri das Almas',
    archetype: 'A Astúcia Veloz e o Corte Cirúrgico',
    verdict: 'O tempo de hesitar acabou. Seus inimigos contavam com a sua lentidão, mas a resposta de Kimbanda vem rápida como raio na noite escura.',
    action: 'Conselho: Diga o que precisa ser dito e tome a atitude prática sem olhar para trás.'
  },
  {
    roman: 'LÂMINA V',
    name: 'Exu Caveira da Kalunga',
    archetype: 'A Morte dos Ciclos e a Justiça na Kalunga',
    verdict: 'Tudo o que lhe desejaram de mal está sendo devolvido sete vezes no solo sagrado da Kalunga. Aquele que cavou a cova para você tropeçará nos próprios pés.',
    action: 'Conselho: Entregue aos pés da terra sagrada. A justiça de Kimbanda não erra o alvo.'
  },
  {
    roman: 'LÂMINA VI',
    name: 'Pomba Gira Rainha das 7 Encruzilhadas',
    archetype: 'O Magnetismo da Sedução e Multiplicação',
    verdict: 'Onde você põe a mão, há de prosperar. Não duvide do seu magnetismo pessoal. Seus caminhos amorosos e financeiros estão sob alinhamento direto.',
    action: 'Conselho: Vista-se do seu melhor poder e celebre sua força. As portas se abrem para quem se respeita.'
  }
];

function initOracle() {
  const cardContainer = document.getElementById('oracleCardContainer');
  const cardRoman = document.getElementById('cardRoman');
  const cardTitle = document.getElementById('cardTitle');
  const cardArchetype = document.getElementById('cardArchetype');
  const cardVerdict = document.getElementById('cardVerdict');
  const resetBtn = document.getElementById('oracleResetBtn');
  const feedbackBox = document.getElementById('oracleFeedback');

  if (!cardContainer || !cardRoman) return;

  let isFlipped = false;

  cardContainer.addEventListener('click', () => {
    if (isFlipped) return;

    const randomIndex = Math.floor(Math.random() * oracleDeck.length);
    const card = oracleDeck[randomIndex];

    cardRoman.textContent = card.roman;
    cardTitle.textContent = card.name;
    cardArchetype.textContent = card.archetype;
    cardVerdict.textContent = `"${card.verdict}"`;

    cardContainer.classList.add('flipped');
    isFlipped = true;

    if (feedbackBox) {
      feedbackBox.style.display = 'block';
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      cardContainer.classList.remove('flipped');
      isFlipped = false;
      if (feedbackBox) {
        feedbackBox.style.display = 'none';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6. SIMULADOR DE ORIENTAÇÃO ESPIRITUAL
   -------------------------------------------------------------------------- */
function initSimulator() {
  const step1 = document.getElementById('quizStep1');
  const step2 = document.getElementById('quizStep2');
  const step3 = document.getElementById('quizStep3');
  const resultBox = document.getElementById('quizResult');
  const progressBar = document.getElementById('quizProgress');

  if (!step1 || !step2 || !step3 || !resultBox) return;

  const userAnswers = {
    area: '',
    urgency: '',
    format: ''
  };

  document.querySelectorAll('[data-quiz-step="1"]').forEach(btn => {
    btn.addEventListener('click', () => {
      userAnswers.area = btn.getAttribute('data-value');
      step1.classList.remove('active');
      step2.classList.add('active');
      if (progressBar) progressBar.style.width = '66.66%';
    });
  });

  document.querySelectorAll('[data-quiz-step="2"]').forEach(btn => {
    btn.addEventListener('click', () => {
      userAnswers.urgency = btn.getAttribute('data-value');
      step2.classList.remove('active');
      step3.classList.add('active');
      if (progressBar) progressBar.style.width = '100%';
    });
  });

  document.querySelectorAll('[data-quiz-step="3"]').forEach(btn => {
    btn.addEventListener('click', () => {
      userAnswers.format = btn.getAttribute('data-value');
      renderSimulatorResult(userAnswers);
      step3.classList.remove('active');
      resultBox.classList.add('active');
    });
  });
}

function renderSimulatorResult(answers) {
  const titleEl = document.getElementById('quizResultTitle');
  const textEl = document.getElementById('quizResultText');
  const btnEl = document.getElementById('quizResultBtn');

  const areaMap = {
    amarracao: 'Amarrações Amorosas com Maria Padilha das Almas',
    lucifer: 'Aliança de Prosperidade com Lúcifer',
    destruicao: 'Destruição e Morte de Inimigos',
    oraculo: 'Oráculo de Exu & Limpezas Espirituais'
  };

  const areaNome = areaMap[answers.area] || 'Consulta com Oráculo de Exu';
  const formatText = answers.format === 'presencial' ? 'Presencial no Templo' : 'Online via WhatsApp / Vídeo';
  const urgencyText = answers.urgency === 'urgente' ? 'Urgente' : 'Planejado';

  if (titleEl) {
    titleEl.textContent = `Caso Catalogado: ${areaNome}`;
  }

  if (textEl) {
    textEl.innerHTML = `Sua solicitação prioritária para <strong>${areaNome}</strong> (${urgencyText}, atendimento <strong>${formatText}</strong>) foi registrada. Clique no botão abaixo para encaminhar os dados a <strong>Táta Rodrigo de Padilha</strong> e dar início ao preceito.`;
  }

  if (btnEl) {
    const rawMsg = `Olá Táta Rodrigo de Padilha! Fiz a triagem no site do Templo de Kimbanda Malei.\n\n` +
      `🔥 *Trabalho de Interesse:* ${areaNome}\n` +
      `⚡ *Urgência:* ${urgencyText}\n` +
      `🏛️ *Formato:* ${formatText}\n\n` +
      `Gostaria de falar sobre o meu caso.`;
    const encoded = encodeURIComponent(rawMsg);
    btnEl.href = `https://wa.me/${WHATSAPP_PRIMARY}?text=${encoded}`;
  }
}

/* --------------------------------------------------------------------------
   7. MODAIS DE DETALHES DOS 7 SERVIÇOS OFICIAIS
   -------------------------------------------------------------------------- */
const serviceDetailsData = {
  oraculo: {
    title: 'Oráculo de Exu',
    category: 'Diagnóstico & Vidência de Kimbanda',
    content: `
      <p>O <strong>Oráculo de Exu</strong> é o primeiro passo para qualquer resolução séria. Conduzido por <strong>Táta Rodrigo de Padilha</strong> sob a firmeza direta de <em>Exu Tranca Rua</em> e <em>Pomba Gira Maria Padilha das Almas</em>.</p>
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(212,175,55,0.08); border-left: 3px solid var(--gold-primary); border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.5rem; font-size: 1rem;">O que é revelado nas lâminas:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Presença de feitiçarias, macumbas enviadas, invejas e amarras espirituais</li>
          <li>A situação real e os sentimentos ocultos no seu relacionamento amoroso</li>
          <li>Caminhos financeiros, negócios e contratos travados</li>
          <li>Qual trabalho específico de Kimbanda é exigido para resolver a sua causa</li>
        </ul>
      </div>
      <p style="font-size: 0.95rem; color: var(--gold-light);">* Atendimento Online ao vivo em alta definição ou Presencial no Templo. Sigilo absoluto.</p>
    `,
    ctaMessage: 'Olá Táta Rodrigo de Padilha, quero agendar minha consulta ao Oráculo de Exu.'
  },
  lucifer: {
    title: 'Aliança de Prosperidade com Lúcifer',
    category: 'Alta Magia Financeira & Soberania',
    content: `
      <p>Ritual de grande magnitude na tradição da Kimbanda Malei, assentado nos mistérios do Reino da Lira. Conduzido para empresários, comerciantes e líderes que buscam enriquecimento contínuo, vitória sobre concorrentes e expansão máxima de poder.</p>
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(251,191,36,0.1); border-left: 3px solid var(--gold-bright); border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.5rem; font-size: 1rem;">Fundamentos da Aliança:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Imantação de ouro e elementos de nobreza nos portais do Maioral</li>
          <li>Abertura violenta das 7 vias de riqueza e fluxo de dinheiro</li>
          <li>Blindagem contra falências, quedas comerciais e traições de sócios</li>
          <li>Acompanhamento exclusivo diretamente com Táta Rodrigo</li>
        </ul>
      </div>
      <p style="font-size: 0.95rem; color: var(--text-dim);">* Exige avaliação prévia no Oráculo de Exu para assentamento da firmeza.</p>
    `,
    ctaMessage: 'Olá Táta Rodrigo, gostaria de informações sobre a Aliança de Prosperidade com Lúcifer.'
  },
  abertura: {
    title: 'Abertura de Caminhos',
    category: 'Desbloqueio de Recursos & Portas Abertas',
    content: `
      <p>Trabalho forte firmado na encruzilhada de <strong>Exu Tranca Rua</strong> para romper qualquer trava que impeça o seu dinheiro de entrar e seus projetos de prosperarem.</p>
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(212,175,55,0.08); border-left: 3px solid var(--gold-primary); border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.5rem; font-size: 1rem;">Resultados do Ritual:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Desbloqueio de processos jurídicos e contratos retidos</li>
          <li>Giro de clientes e vendas no seu comércio ou empresa</li>
          <li>Fim da maré de azar e estagnação financeira</li>
        </ul>
      </div>
      <p style="font-size: 0.95rem; color: var(--gold-light);">* Trabalho com fotos, vídeos e registro do ritual realizado no templo.</p>
    `,
    ctaMessage: 'Olá Táta Rodrigo, preciso fazer uma Abertura de Caminhos com urgência.'
  },
  amarracao: {
    title: 'Amarrações Amorosas',
    category: 'Força Suprema de Pomba Gira Maria Padilha das Almas',
    content: `
      <p>Trabalho clássico e temido de Kimbanda Malei para reatar casais, dobrar o orgulho da pessoa amada, afastar rivais e amarrar os pensamentos, desejos e corpo do parceiro aos seus pés.</p>
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(220,38,38,0.12); border-left: 3px solid var(--crimson-vibrant); border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.5rem; font-size: 1rem;">Como atua a Amarração:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Inquietação mental: a pessoa não tem paz, sono ou desejo com outra</li>
          <li>Afastamento fulminante de amantes, intromissões familiares e rivais</li>
          <li>Retorno carinhoso, submisso e com pedido de reconciliação</li>
          <li>Lacre de proteção para que nenhum outro trabalho desfaça a união</li>
        </ul>
      </div>
      <p style="font-size: 0.95rem; color: var(--text-dim);">* Conduzido no caldeirão e fundamento de Maria Padilha das Almas.</p>
    `,
    ctaMessage: 'Olá Táta Rodrigo, quero informações para realizar uma Amarração Amorosa.'
  },
  limpezas: {
    title: 'Limpezas Espirituais & Descarrego',
    category: 'Rompimento de Demandas & Pragas',
    content: `
      <p>Descarrego severo com ervas de Kimbanda, fogo, pólvora e ferro para quebrar feitiços enviados contra você, retirar encostos, espíritos obsessores e afastar olho gordo devastador.</p>
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(212,175,55,0.08); border-left: 3px solid var(--gold-primary); border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.5rem; font-size: 1rem;">Indicações de Limpeza:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Sensação de peso sufocante, dores sem causa médica e cansaço constante</li>
          <li>Pessoas que foram alvo de queimas de vela preta e feitiços de cemitério</li>
          <li>Purificação e desinfecção espiritual de lares e empresas atacadas</li>
        </ul>
      </div>
      <p style="font-size: 0.95rem; color: var(--gold-light);">* Alívio perceptível logo após a queima e a entrega do descarrego.</p>
    `,
    ctaMessage: 'Olá Táta Rodrigo, preciso de uma Limpeza Espiritual forte e descarrego.'
  },
  protecao: {
    title: 'Proteção & Firmezas Sagradas',
    category: 'Fechamento de Corpo & Blindagem',
    content: `
      <p>Assentamento de guarda com <strong>Exu Tranca Rua</strong> para blindar sua vida física e espiritual contra traições, tragédias, assaltos e feitiços ocultos.</p>
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(212,175,55,0.08); border-left: 3px solid var(--gold-primary); border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.5rem; font-size: 1rem;">O que inclui:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Fechamento de corpo e ponto de ferro consagrado</li>
          <li>Amuleto/patuá cruzado e imantado no templo</li>
          <li>Firmeza permanente para a porta do seu comércio ou residência</li>
        </ul>
      </div>
      <p style="font-size: 0.95rem; color: var(--text-dim);">* Proteção essencial para quem lida com grande exposição pública e dinheiro.</p>
    `,
    ctaMessage: 'Olá Táta Rodrigo, quero fazer minha Proteção e Fechamento de Corpo.'
  },
  destruicao: {
    title: 'Destruição e Morte de Inimigos',
    category: 'Justiça & Cobrança da Kimbanda Malei',
    content: `
      <p>Trabalho supremo de cobrança na força da Kalunga e do Cruzeiro. Destinado a aniquilar a força de pessoas traidoras, rivais perversos e inimigos que tramaram a sua ruína, a destruição da sua família ou da sua reputação.</p>
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(185,28,28,0.18); border-left: 3px solid #ef4444; border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.5rem; font-size: 1rem;">Fundamento de Cobrança:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Devolução com peso implacável de todo o mal e dano praticado contra você</li>
          <li>Queda, cegueira mental e ruína de quem persegue sua vida</li>
          <li>Ritual executado na calada da noite nos portais da Kalunga</li>
        </ul>
      </div>
      <p style="font-size: 0.95rem; color: #ef4444; font-weight: 600;">* Exige consulta com Táta Rodrigo no Oráculo de Exu para confirmação da causa.</p>
    `,
    ctaMessage: 'Olá Táta Rodrigo, preciso falar sobre Justiça e Destruição de Inimigos.'
  }
};

function initServiceModals() {
  const overlay = document.getElementById('serviceModalOverlay');
  const closeBtn = document.getElementById('modalCloseBtn');
  const titleEl = document.getElementById('modalServiceTitle');
  const catEl = document.getElementById('modalServiceCat');
  const contentEl = document.getElementById('modalServiceBody');
  const ctaBtn = document.getElementById('modalCtaBtn');

  if (!overlay) return;

  function openModal(serviceKey) {
    const data = serviceDetailsData[serviceKey];
    if (!data) return;

    titleEl.textContent = data.title;
    catEl.textContent = data.category;
    contentEl.innerHTML = data.content;

    const encoded = encodeURIComponent(data.ctaMessage);
    ctaBtn.href = `https://wa.me/${WHATSAPP_PRIMARY}?text=${encoded}`;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-open-modal');
      openModal(serviceKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. PERGUNTAS FREQUENTES (FAQ ACCORDION)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. FORMULÁRIO DE AGENDAMENTO COM FORMATADOR WHATSAPP
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const service = document.getElementById('formService').value;
    const format = document.getElementById('formFormat').value;
    const notes = document.getElementById('formNotes').value.trim();

    if (!name || !phone) {
      alert('Por favor, informe seu nome e número de WhatsApp.');
      return;
    }

    const message = `*SOLICITAÇÃO DE TRABALHO / CONSULTA*\n` +
      `*TEMPLO DE KIMBANDA MALEI*\n` +
      `*Táta Rodrigo de Padilha | LEUCAB Reg. 2784*\n\n` +
      `👤 *Consulente:* ${name}\n` +
      `📱 *WhatsApp:* ${phone}\n` +
      `🔥 *Trabalho:* ${service}\n` +
      `🏛️ *Modalidade:* ${format}\n` +
      (notes ? `📝 *Situação:* ${notes}\n\n` : `\n`) +
      `_Enviado através do site oficial templodekimbandamaleipadilha.com_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_PRIMARY}?text=${encoded}`, '_blank');
  });
}
