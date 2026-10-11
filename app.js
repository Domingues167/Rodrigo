/* ==========================================================================
   TEMPLO DE KIMBANDA MALEI MARIA PADILHA DAS ALMAS E EXU TRANCA RUA
   ESPECIALIZADO EM AMARRAÇÃO AMOROSA & UNIÃO DE CASAIS
   Táta Rodrigo de Padilha | Filiado pela LEUCAB - Reg. Nº 2784
   Telefones: (11) 98355-7454 / (11) 96660-7249
   ========================================================================== */

const WHATSAPP_PRIMARY = '5511983557454';
const WHATSAPP_SECONDARY = '5511966607249';

document.addEventListener('DOMContentLoaded', () => {
  initLoveParticlesCanvas();
  initAmbientAudio();
  initNavigation();
  initLoveOracle();
  initLoveSimulator();
  initLoveModals();
  initFaqAccordion();
});

/* --------------------------------------------------------------------------
   1. CANVAS DE PÉTALAS DE ROSAS VERMELHAS & BRASAS DOURADAS
   -------------------------------------------------------------------------- */
function initLoveParticlesCanvas() {
  const canvas = document.getElementById('ember-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const isMobile = window.innerWidth < 768;
  const petalCount = isMobile ? 18 : 36;
  const emberCount = isMobile ? 22 : 45;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // Classe para Pétalas de Rosas Vermelhas (descendentes com oscilação suave)
  class RosePetal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 7 + 6;
      this.speedY = Math.random() * 0.9 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.03;
      this.opacity = Math.random() * 0.55 + 0.35;
      this.sway = Math.random() * 0.02 + 0.01;
      this.colors = [
        'rgba(225, 29, 72, ',   // Rosa paixão
        'rgba(190, 18, 60, ',   // Rubi intenso
        'rgba(136, 19, 55, ',   // Veludo escuro
        'rgba(159, 18, 57, '    // Carmesim nobre
      ];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * this.sway) * 1.1 + this.speedX;
      this.rotation += this.rotSpeed;

      if (this.y > height + 25 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(225, 29, 72, 0.4)';
      ctx.fill();
      ctx.restore();
    }
  }

  // Classe para Brasas Douradas da Fogueira Sagrada (ascendentes)
  class GoldenEmber {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.4 + 1;
      this.speedY = -(Math.random() * 1.1 + 0.5);
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.opacity = Math.random() * 0.7 + 0.3;
      this.decay = Math.random() * 0.005 + 0.002;
      const colors = [
        '212, 175, 55',   // Ouro
        '251, 191, 36',   // Âmbar
        '254, 240, 138'   // Ouro Claro
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.015) * 0.35;
      this.opacity -= this.decay;

      if (this.opacity <= 0 || this.y < -10) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.shadowBlur = 9;
      ctx.shadowColor = `rgba(${this.color}, 0.85)`;
      ctx.fill();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    particles.push(new RosePetal());
  }
  for (let i = 0; i < emberCount; i++) {
    particles.push(new GoldenEmber());
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
   2. ÁUDIO AMBIENTE PROCEDURAL (WEB AUDIO API - FOGUEIRA & VELAS SAGRADAS)
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
      toggleBtn.setAttribute('title', 'Pausar som de velas e fogueira sagrada');
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
    toggleBtn.setAttribute('title', 'Ouvir som de velas e fogueira ritualística');
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
   3. NAVEGAÇÃO & HEADER
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
  }
}

/* --------------------------------------------------------------------------
   4. ORÁCULO DO AMOR DE MARIA PADILHA (3D CARD FLIP)
   -------------------------------------------------------------------------- */
const loveOracleCards = [
  {
    roman: 'LÂMINA I',
    title: 'Maria Padilha das Almas',
    archetype: 'A Rainha da Coroa & do Domínio Amoroso',
    verdict: '“O que foi separado pelo orgulho será reunido na força do caldeirão. Quem manda na sua vida amorosa é a sua fé; dobre a cabeça de quem te desprezou.”',
    ctaNote: 'Orientação de Padilha: Hora de amarrar e tomar de volta o seu lugar.'
  },
  {
    roman: 'LÂMINA II',
    title: 'O Fogo da Paixão Ardente',
    archetype: 'O Desejo Incontrolável & Atração Carnal',
    verdict: '“A frieza entre vocês não é natural. Quando a brasa de Padilha acende, não há sono tranquilo nem sossego longe do seu cheiro e dos seus braços.”',
    ctaNote: 'Orientação de Padilha: Reacendimento imediato de paixão e atração sexual.'
  },
  {
    roman: 'LÂMINA III',
    title: 'A Quebra do Orgulho',
    archetype: 'A Submissão do Rancor & Desmanche da Resistência',
    verdict: '“A casca dura cairá por terra. Aquele que hoje se nega a falar virá com olhos cheios de lágrimas, pedindo perdão e sem forças para resistir.”',
    ctaNote: 'Orientação de Padilha: Adoçamento e quebra de teimosia urgente.'
  },
  {
    roman: 'LÂMINA IV',
    title: 'A Espada de Padilha nas Almas',
    archetype: 'O Corte Fulminante de Amantes e Rivais',
    verdict: '“Quem se colocou no meio do seu caminho será afastado na encruzilhada. O laço que une a terceira pessoa se tornará veneno e discórdia imediata.”',
    ctaNote: 'Orientação de Padilha: Afastamento e separação definitiva de rival.'
  },
  {
    roman: 'LÂMINA V',
    title: 'O Lacre do Amor & Proteção Eterna',
    archetype: 'O Casamento Blindado nos 7 Reinos',
    verdict: '“Amor com tranca não vaza. Uma vez lacrado nos pés dos guardiões, nenhuma língua venenosa nem feitiço de inveja conseguirá desfazer o pacto de vocês.”',
    ctaNote: 'Orientação de Padilha: Blindagem e lacre espiritual de casal.'
  }
];

function initLoveOracle() {
  const cardContainer = document.getElementById('oracleCardContainer');
  const cardRoman = document.getElementById('cardRoman');
  const cardTitle = document.getElementById('cardTitle');
  const cardArchetype = document.getElementById('cardArchetype');
  const cardVerdict = document.getElementById('cardVerdict');
  const feedbackBox = document.getElementById('oracleFeedback');
  const resetBtn = document.getElementById('oracleResetBtn');
  const oracleCtaBtn = document.getElementById('oracleCtaBtn');

  if (!cardContainer) return;

  let isFlipped = false;
  let currentIndex = 0;

  cardContainer.addEventListener('click', () => {
    if (isFlipped) return;

    // Sorteia lâmina
    currentIndex = Math.floor(Math.random() * loveOracleCards.length);
    const cardData = loveOracleCards[currentIndex];

    if (cardRoman) cardRoman.textContent = cardData.roman;
    if (cardTitle) cardTitle.textContent = cardData.title;
    if (cardArchetype) cardArchetype.textContent = cardData.archetype;
    if (cardVerdict) cardVerdict.textContent = cardData.verdict;

    cardContainer.classList.add('flipped');
    isFlipped = true;

    if (oracleCtaBtn) {
      const msg = `Olá Táta Rodrigo! Tirei a carta *${cardData.title}* (${cardData.roman}) no Oráculo do Amor de Maria Padilha.\n\n` +
        `Mensagem revelada: ${cardData.verdict}\n\n` +
        `Gostaria de consultar meu caso amoroso com você.`;
      oracleCtaBtn.href = `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(msg)}`;
    }

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
   5. SIMULADOR DE SITUAÇÃO AMOROSA (TRIAGEM INTERATIVA)
   -------------------------------------------------------------------------- */
function initLoveSimulator() {
  const step1 = document.getElementById('quizStep1');
  const step2 = document.getElementById('quizStep2');
  const step3 = document.getElementById('quizStep3');
  const resultBox = document.getElementById('quizResult');
  const progressBar = document.getElementById('quizProgress');

  if (!step1 || !step2 || !step3 || !resultBox) return;

  const userAnswers = {
    situacao: '',
    tempo: '',
    formato: ''
  };

  document.querySelectorAll('[data-quiz-step="1"]').forEach(btn => {
    btn.addEventListener('click', () => {
      userAnswers.situacao = btn.getAttribute('data-value');
      step1.classList.remove('active');
      step2.classList.add('active');
      if (progressBar) progressBar.style.width = '66.66%';
    });
  });

  document.querySelectorAll('[data-quiz-step="2"]').forEach(btn => {
    btn.addEventListener('click', () => {
      userAnswers.tempo = btn.getAttribute('data-value');
      step2.classList.remove('active');
      step3.classList.add('active');
      if (progressBar) progressBar.style.width = '100%';
    });
  });

  document.querySelectorAll('[data-quiz-step="3"]').forEach(btn => {
    btn.addEventListener('click', () => {
      userAnswers.formato = btn.getAttribute('data-value');
      renderLoveSimulatorResult(userAnswers);
      step3.classList.remove('active');
      resultBox.classList.add('active');
    });
  });
}

function renderLoveSimulatorResult(answers) {
  const titleEl = document.getElementById('quizResultTitle');
  const textEl = document.getElementById('quizResultText');
  const btnEl = document.getElementById('quizResultBtn');

  const situacaoMap = {
    bloqueado: 'Terminamos e ele(a) me bloqueou / Não quer contato',
    frio: 'Estamos juntos mas ele(a) está frio(a), distante e com desinteresse',
    rival: 'Existe uma terceira pessoa (amante / rival) atrapalhando',
    amarracao_forte: 'Quero prender e casar definitivamente com quem amo'
  };

  const tempoMap = {
    recente: 'Menos de 30 dias (Situação em aberto)',
    medio: 'Entre 1 e 6 meses (Orgulho e afastamento forte)',
    longo: 'Mais de 6 meses a 1 ano (Caso urgente de resgate)'
  };

  const formatoMap = {
    online: 'Online via WhatsApp com Envio de Vídeos e Fotos da Firmeza',
    presencial: 'Presencialmente no Templo em São Paulo'
  };

  const situacaoText = situacaoMap[answers.situacao] || 'Caso de Reconciliação Amorosa';
  const tempoText = tempoMap[answers.tempo] || 'Distância em avaliação';
  const formatoText = formatoMap[answers.formato] || 'Online via WhatsApp';

  if (titleEl) {
    titleEl.textContent = `Caso Amoroso Mapeado para Táta Rodrigo`;
  }

  if (textEl) {
    textEl.innerHTML = `Sua situação: <strong>${situacaoText}</strong>, tempo de distanciamento: <strong>${tempoText}</strong>. Atendimento selecionado: <strong>${formatoText}</strong>.<br><br>Táta Rodrigo de Padilha já pode analisar a compatibilidade do casal no oráculo das almas para direcionar a amarração exata.`;
  }

  if (btnEl) {
    const rawMsg = `Olá Táta Rodrigo de Padilha! Fiz a triagem de Amarração Amorosa no site.\n\n` +
      `💔 *Situação Atual:* ${situacaoText}\n` +
      `⏳ *Tempo de Crise:* ${tempoText}\n` +
      `🏛️ *Formato Desejado:* ${formatoText}\n\n` +
      `Gostaria de agendar a consulta para ver se podemos fazer a Amarração.`;
    btnEl.href = `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(rawMsg)}`;
  }
}

/* --------------------------------------------------------------------------
   6. MODAIS DOS 6 RITUAIS DE ALTA MAGIA AMOROSA
   -------------------------------------------------------------------------- */
const loveRitualsData = {
  amarracao: {
    title: 'Amarração Amorosa Tradicional de Alta Magia',
    category: 'Dominação Espiritual & Retorno Definitivo',
    content: `
      <p>Trabalho de máxima potência sacerdotal, firmado aos pés de <strong>Pomba Gira Maria Padilha das Almas</strong> no chão sagrado do terreiro. Não é simpatia ou oração de internet, mas sim alta magia ritualística de Kimbanda Malei.</p>
      
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(225, 29, 72, 0.1); border-left: 3px solid var(--rose-passion); border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.6rem; font-size: 1rem;">O que acontece durante a firmeza:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Cruzamento espiritual das fotos e nomes com as amarras sagradas de Padilha</li>
          <li>Inquietação contínua nos pensamentos da pessoa amada dia e noite</li>
          <li>Desmanche de mágoas passadas, quebra de resistência e orgulho ferido</li>
          <li>Atração magnética irresistível que faz a pessoa procurar por você</li>
        </ul>
      </div>

      <div style="padding: 1rem; background: rgba(212, 175, 55, 0.08); border-radius: 6px; margin-bottom: 1.5rem;">
        <p style="color: var(--gold-light); font-size: 0.9rem; margin: 0;">
          <strong>Comprovação Real:</strong> Você recebe vídeos e fotos do ritual sendo assentado com o seu nome e do seu amor no caldeirão de Maria Padilha. Filiado à LEUCAB Reg. Nº 2784.
        </p>
      </div>
    `,
    ctaMessage: 'Olá Táta Rodrigo, quero consultar o meu caso para fazer a Amarração Amorosa Tradicional.'
  },
  adocamento: {
    title: 'Adoçamento & Amansamento de Orgulho',
    category: 'Doçura, Carinho & Fim das Brigas',
    content: `
      <p>Indicado quando o casal ainda mantém contato ou está em crise de grosserias, mágoas profundas, desrespeito ou teimosia extrema. O trabalho atua diretamente no campo emocional para acalmar a raiva e resgatar a ternura.</p>
      
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(212, 175, 55, 0.1); border-left: 3px solid var(--gold-bright); border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.6rem; font-size: 1rem;">Efeitos do Ritual:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Amolecimento de pessoas ríspidas, orgulhosas e cabeça-dura</li>
          <li>Fim das discussões violentas e palavras que machucam o casal</li>
          <li>Despertar de conversas carinhosas, abraços e disposição para dialogar</li>
          <li>Trabalhado com favas doces, rosas vermelhas, mel de Kimbanda e perfumes nobres</li>
        </ul>
      </div>
    `,
    ctaMessage: 'Olá Táta Rodrigo, gostaria de informações sobre o Adoçamento e Amansamento de Orgulho.'
  },
  afastamento_rival: {
    title: 'Afastamento Definitivo de Rival & Amante',
    category: 'Separação Fulminante & Corte de Intromissões',
    content: `
      <p>Se existe uma terceira pessoa seduzindo, interferindo ou destruindo o seu lar, este ritual é executado nas forças cortantes de Maria Padilha e Exu Tranca Rua para gerar repulsa incontrolável entre eles.</p>
      
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(185, 28, 28, 0.15); border-left: 3px solid #ef4444; border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.6rem; font-size: 1rem;">Como a força age:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Gera enjoamento, frieza e nojo mútuo entre a pessoa amada e o(a) rival</li>
          <li>Brigas constantes e intolerância total na presença um do outro</li>
          <li>Afastamento natural e desinteresse completo pela terceira pessoa</li>
          <li>Corta também intromissões nocivas de parentes, sogras ou falsos amigos</li>
        </ul>
      </div>
    `,
    ctaMessage: 'Olá Táta Rodrigo, preciso urgentemente afastar uma rival/amante da minha vida amorosa.'
  },
  blindagem_casal: {
    title: 'Blindagem & Lacre Espiritual de Casamento',
    category: 'Proteção Máxima contra Invejas e Feitiços',
    content: `
      <p>Para casais que sofrem com olho gordo constante, inveja de pessoas próximas ou histórico de traições. Esse ritual cria uma redoma sagrada de proteção na encruzilhada de Tranca Rua e no cruzeiro de Padilha.</p>
      
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(212, 175, 55, 0.1); border-left: 3px solid var(--gold-primary); border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.6rem; font-size: 1rem;">Benefícios da Blindagem:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Impedimento de novos feitiços enviados para separar vocês</li>
          <li>Fechamento de corpo e tranca contra tentações passageiras na rua</li>
          <li>Harmonia dentro do lar e prosperidade financeira conjunta</li>
          <li>Assentamento de patuá consagrado para o casal</li>
        </ul>
      </div>
    `,
    ctaMessage: 'Olá Táta Rodrigo, quero fazer a Blindagem e Lacre Espiritual do meu casamento/relacionamento.'
  },
  desejo_paixao: {
    title: 'Acendimento da Paixão & Desejo Sexual Ardente',
    category: 'Atração Carnal Exclusiva & Fogo Íntimo',
    content: `
      <p>Quando a rotina esfriou a cama ou quando a pessoa amada perdeu o apetite sexual por você, Maria Padilha das Almas domina o campo da libido para fazer você ser o único foco de desejo carnal.</p>
      
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(225, 29, 72, 0.12); border-left: 3px solid var(--rose-passion); border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.6rem; font-size: 1rem;">Manifestações do Trabalho:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Sonhos íntimos e pensamentos eróticos recorrentes com você</li>
          <li>Impotência ou desinteresse ao tentar tocar qualquer outra pessoa</li>
          <li>Reativação do magnetismo do toque, dos beijos ardentes e da entrega total</li>
          <li>Firmeza consagrada em bebidas de nobreza e velas de fogo vivo</li>
        </ul>
      </div>
    `,
    ctaMessage: 'Olá Táta Rodrigo, quero informações sobre o ritual de Acendimento da Paixão e Desejo Ardente.'
  },
  desmanche_feitico: {
    title: 'Desmanche de Feitiços Amorosos & Quebra de Amarras Antigas',
    category: 'Corte de Macumbas, Separações Forçadas e Fechamento',
    content: `
      <p>Muitas vezes o relacionamento acabou porque alguém fez um trabalho maldoso de separação, vela invertida ou cemitério para afastar vocês. Este ritual destrói qualquer feitiçaria antiga e liberta a mente da pessoa.</p>
      
      <div style="margin: 1.5rem 0; padding: 1.2rem; background: rgba(185, 28, 28, 0.15); border-left: 3px solid #ef4444; border-radius: 4px;">
        <h5 style="color: #ffffff; margin-bottom: 0.6rem; font-size: 1rem;">O que é purificado:</h5>
        <ul style="list-style: disc; margin-left: 1.2rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          <li>Quebra imediata de trabalhos de separação, ódio e repulsa feitos por rivais</li>
          <li>Retirada de espíritos obsessores que sussurravam discórdia no ouvido do casal</li>
          <li>Limpeza profunda dos caminhos amorosos para a verdade reinar</li>
          <li>Devolução do equilíbrio e clareza mental para a pessoa amada</li>
        </ul>
      </div>
    `,
    ctaMessage: 'Olá Táta Rodrigo, desconfio que fizeram feitiço para separar meu casal. Preciso de um Desmanche.'
  }
};

function initLoveModals() {
  const overlay = document.getElementById('serviceModalOverlay');
  const closeBtn = document.getElementById('modalCloseBtn');
  const catEl = document.getElementById('modalServiceCat');
  const titleEl = document.getElementById('modalServiceTitle');
  const bodyEl = document.getElementById('modalServiceBody');
  const ctaBtn = document.getElementById('modalCtaBtn');

  if (!overlay) return;

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-open-modal');
      const data = loveRitualsData[serviceKey];
      if (!data) return;

      if (catEl) catEl.textContent = data.category;
      if (titleEl) titleEl.textContent = data.title;
      if (bodyEl) bodyEl.innerHTML = data.content;
      if (ctaBtn) {
        ctaBtn.href = `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(data.ctaMessage)}`;
      }

      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

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
   7. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
}
