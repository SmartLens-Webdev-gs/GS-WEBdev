(function iniciarTema() {
  const btnsTema = document.querySelectorAll('.theme-btn');
  const body = document.body;
  const CHAVE_TEMA = 'solarnet_tema';

  const temaSalvo = localStorage.getItem(CHAVE_TEMA);
  if (temaSalvo && temaSalvo !== 'escuro') {
    aplicarTema(temaSalvo);
  }

  btnsTema.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const tema = btn.getAttribute('data-theme');
      aplicarTema(tema);
      localStorage.setItem(CHAVE_TEMA, tema);
    });
  });

  function aplicarTema(tema) {
    body.classList.remove('tema-solar', 'tema-verde');
    btnsTema.forEach(function (b) { b.classList.remove('active'); });

    if (tema === 'solar') body.classList.add('tema-solar');
    else if (tema === 'verde') body.classList.add('tema-verde');

    const btnAtivo = document.querySelector('[data-theme="' + tema + '"]');
    if (btnAtivo) btnAtivo.classList.add('active');
  }
})();

(function iniciarSlideshow() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const btnPrev = document.getElementById('slidePrev');
  const btnNext = document.getElementById('slideNext');

  if (!slides.length) return;

  let indiceAtual = 0;
  let intervalo = null;

  function mostrarSlide(indice) {
    slides.forEach(function (s) { s.classList.remove('active'); });
    dots.forEach(function (d) { d.classList.remove('active'); });

    if (indice >= slides.length) indice = 0;
    if (indice < 0) indice = slides.length - 1;

    indiceAtual = indice;
    slides[indiceAtual].classList.add('active');
    dots[indiceAtual].classList.add('active');
  }

  function proximoSlide() { mostrarSlide(indiceAtual + 1); }
  function slideAnterior() { mostrarSlide(indiceAtual - 1); }
  function iniciarAutoPlay() { intervalo = setInterval(proximoSlide, 4000); }
  function pararAutoPlay() { clearInterval(intervalo); }

  btnNext.addEventListener('click', function () {
    pararAutoPlay(); proximoSlide(); iniciarAutoPlay();
  });

  btnPrev.addEventListener('click', function () {
    pararAutoPlay(); slideAnterior(); iniciarAutoPlay();
  });

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      pararAutoPlay();
      mostrarSlide(parseInt(dot.getAttribute('data-index'), 10));
      iniciarAutoPlay();
    });
  });

  var touchStartX = 0;
  var slideshowEl = document.getElementById('slideshow');

  slideshowEl.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  });

  slideshowEl.addEventListener('touchend', function (e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      pararAutoPlay();
      if (diff > 0) proximoSlide(); else slideAnterior();
      iniciarAutoPlay();
    }
  });

  mostrarSlide(0);
  iniciarAutoPlay();
})();

(function iniciarQuiz() {
  const perguntas = [
    {
      pergunta: 'O que é energia solar fotovoltaica?',
      opcoes: ['Energia gerada pelo vento', 'Energia gerada pela conversão da luz solar em eletricidade', 'Energia gerada pela queima de biomassa', 'Energia gerada por turbinas a vapor'],
      correta: 1
    },
    {
      pergunta: 'Qual Objetivo de Desenvolvimento Sustentável (ODS) está diretamente relacionado à energia limpa e acessível?',
      opcoes: ['ODS 3', 'ODS 7', 'ODS 11', 'ODS 15'],
      correta: 1
    },
    {
      pergunta: 'Qual é a principal vantagem do monitoramento em tempo real de painéis solares?',
      opcoes: ['Aumentar o tamanho dos painéis', 'Identificar falhas e ineficiências rapidamente', 'Eliminar a necessidade de manutenção', 'Reduzir o número de painéis necessários'],
      correta: 1
    },
    {
      pergunta: 'O SolarNet aplica conceitos de qual área tecnológica para o monitoramento energético?',
      opcoes: ['Tecnologia automotiva', 'Tecnologia espacial', 'Tecnologia naval', 'Tecnologia agrícola'],
      correta: 1
    },
    {
      pergunta: 'Qual é um dos principais problemas abordados pelo SolarNet?',
      opcoes: ['Falta de energia eólica no Brasil', 'Excesso de energia gerada por usinas nucleares', 'Falta de monitoramento acessível da eficiência da energia solar', 'Alto custo de fabricação de painéis'],
      correta: 2
    },
    {
      pergunta: 'Painéis solares convertem qual tipo de energia em energia elétrica?',
      opcoes: ['Energia cinética', 'Energia térmica', 'Energia luminosa (solar)', 'Energia química'],
      correta: 2
    },
    {
      pergunta: 'Qual dos seguintes NÃO é um público-alvo do SolarNet?',
      opcoes: ['Residências', 'Agroindústria', 'Mineradoras de carvão', 'Instituições de Ensino'],
      correta: 2
    },
  ]
    const elPergunta = document.getElementById('quizPergunta');
  const elOpcoes = document.getElementById('quizOpcoes');
  const elCounter = document.getElementById('quizCounter');
  const elProgressBar = document.getElementById('quizProgressBar');
  const elNextBtn = document.getElementById('quizNextBtn');
  const elResultado = document.getElementById('quizResultado');
  const elCard = document.getElementById('quizCard');
  const elReiniciar = document.getElementById('quizReiniciar');
  const elResultadoIcon = document.getElementById('resultadoIcon');
  const elResultadoTitulo = document.getElementById('resultadoTitulo');
  const elResultadoPontos = document.getElementById('resultadoPontos');
  const elResultadoMsg = document.getElementById('resultadoMsg');

  if (!elPergunta) return;

  let indicePergunta = 0;
  let pontuacao = 0;
  let respondeu = false;

  function carregarPergunta() {
    respondeu = false;
    elNextBtn.style.display = 'none';

    const p = perguntas[indicePergunta];
    elCounter.textContent = 'Pergunta ' + (indicePergunta + 1) + ' de ' + perguntas.length;
    elProgressBar.style.width = (((indicePergunta + 1) / perguntas.length) * 100) + '%';
    elPergunta.textContent = p.pergunta;
    elOpcoes.innerHTML = '';

    p.opcoes.forEach(function (opcao, i) {
      var btn = document.createElement('button');
      btn.className = 'quiz-opcao';
      btn.textContent = opcao;
      btn.setAttribute('data-indice', i);
      btn.addEventListener('click', function () {
        if (respondeu) return;
        responder(i, btn);
      });
      elOpcoes.appendChild(btn);
    });
  }

  function responder(indiceEscolhido, btnClicado) {
    respondeu = true;
    const p = perguntas[indicePergunta];
    const btns = elOpcoes.querySelectorAll('.quiz-opcao');

    btns.forEach(function (b) { b.disabled = true; });

    if (indiceEscolhido === p.correta) {
      btnClicado.classList.add('correta');
      pontuacao++;
    } else {
      btnClicado.classList.add('errada');
      btns[p.correta].classList.add('correta');
    }

    elNextBtn.style.display = 'block';
    elNextBtn.textContent = indicePergunta === perguntas.length - 1 ? 'Ver Resultado 🏆' : 'Próxima →';
  }

  elNextBtn.addEventListener('click', function () {
    indicePergunta++;
    if (indicePergunta < perguntas.length) {
      carregarPergunta();
    } else {
      mostrarResultado();
    }
  });

  function mostrarResultado() {
    elCard.style.display = 'none';
    elResultado.style.display = 'block';

    var pct = Math.round((pontuacao / perguntas.length) * 100);
    elResultadoPontos.textContent = pontuacao + ' / ' + perguntas.length + ' (' + pct + '%)';
    elProgressBar.style.width = '100%';
    elCounter.textContent = 'Quiz concluído!';

    if (pct === 100) {
      elResultadoIcon.textContent = '🏆';
      elResultadoTitulo.textContent = 'Perfeito!';
      elResultadoMsg.textContent = 'Uau! Você acertou todas as perguntas! Você é um verdadeiro especialista em energia solar e no projeto SolarNet.';
    } else if (pct >= 70) {
      elResultadoIcon.textContent = '⭐';
      elResultadoTitulo.textContent = 'Muito Bem!';
      elResultadoMsg.textContent = 'Ótimo desempenho! Você demonstra bom conhecimento sobre energia solar sustentável e as tecnologias do SolarNet.';
    } else if (pct >= 50) {
      elResultadoIcon.textContent = '📚';
      elResultadoTitulo.textContent = 'Bom Esforço!';
      elResultadoMsg.textContent = 'Você tem uma base de conhecimento sobre o tema. Continue aprendendo mais sobre energia solar e sustentabilidade!';
    } else {
      elResultadoIcon.textContent = '🌱';
      elResultadoTitulo.textContent = 'Continue Aprendendo!';
      elResultadoMsg.textContent = 'Não desanime! Explore mais o site do SolarNet e aprenda sobre energia solar limpa e tecnologia espacial aplicada à sustentabilidade.';
    }
  }

  elReiniciar.addEventListener('click', function () {
    indicePergunta = 0;
    pontuacao = 0;
    respondeu = false;
    elResultado.style.display = 'none';
    elCard.style.display = 'block';
    elProgressBar.style.width = '10%';
    carregarPergunta();
  });

  carregarPergunta();
})();


(function iniciarFormulario() {
  const btnSubmit = document.getElementById('formSubmit');
  if (!btnSubmit) return;

  const campos = {
    nome: {
      input: document.getElementById('nomeInput'),
      erro: document.getElementById('nomeErro'),
      validar: function (val) {
        if (!val) return 'O nome é obrigatório.';
        if (val.length < 3) return 'O nome deve ter ao menos 3 caracteres.';
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(val)) return 'O nome deve conter apenas letras.';
        return '';
      }
    },
    email: {
      input: document.getElementById('emailInput'),
      erro: document.getElementById('emailErro'),
      validar: function (val) {
        if (!val) return 'O e-mail é obrigatório.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Informe um e-mail válido.';
        return '';
      }
    },
    telefone: {
      input: document.getElementById('telefoneInput'),
      erro: document.getElementById('telefoneErro'),
      validar: function (val) {
        if (!val) return '';
        var numeros = val.replace(/\D/g, '');
        if (numeros.length < 10 || numeros.length > 11) return 'Informe um telefone válido com DDD.';
        return '';
      }
    },
    tipo: {
      input: document.getElementById('tipoInput'),
      erro: document.getElementById('tipoErro'),
      validar: function (val) {
        if (!val) return 'Selecione um tipo de instalação.';
        return '';
      }
    },
    mensagem: {
      input: document.getElementById('mensagemInput'),
      erro: document.getElementById('mensagemErro'),
      validar: function (val) {
        if (!val) return 'A mensagem é obrigatória.';
        if (val.length < 10) return 'A mensagem deve ter ao menos 10 caracteres.';
        return '';
      }
    }
  };

  Object.values(campos).forEach(function (campo) {
    campo.input.addEventListener('blur', function () { validarCampo(campo); });
    campo.input.addEventListener('input', function () {
      if (campo.input.classList.contains('campo-erro')) validarCampo(campo);
    });
  });

  function validarCampo(campo) {
    var msgErro = campo.validar(campo.input.value.trim());
    campo.erro.textContent = msgErro;
    if (msgErro) { campo.input.classList.add('campo-erro'); return false; }
    else { campo.input.classList.remove('campo-erro'); return true; }
  }

  function validarTodos() {
    var valido = true;
    Object.values(campos).forEach(function (campo) {
      if (!validarCampo(campo)) valido = false;
    });
    return valido;
  }

  btnSubmit.addEventListener('click', function () {
    if (validarTodos()) {
      document.getElementById('formWrapper').style.display = 'none';
      var formSuccess = document.getElementById('formSuccess');
      formSuccess.style.display = 'block';
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(function () {
        Object.values(campos).forEach(function (campo) {
          campo.input.value = '';
          campo.input.classList.remove('campo-erro');
          campo.erro.textContent = '';
        });
        document.getElementById('formWrapper').style.display = 'block';
        formSuccess.style.display = 'none';
      }, 5000);
    } else {
      var primeiro = document.querySelector('.campo-erro');
      if (primeiro) { primeiro.scrollIntoView({ behavior: 'smooth', block: 'center' }); primeiro.focus(); }
    }
  });
})();

(function iniciarMenuMobile() {
  var btnToggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (!btnToggle || !menu) return;

  btnToggle.addEventListener('click', function () {
    var aberto = menu.classList.toggle('aberto');
    btnToggle.setAttribute('aria-expanded', aberto);
    btnToggle.textContent = aberto ? '✕' : '☰';
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('aberto');
      btnToggle.setAttribute('aria-expanded', false);
      btnToggle.textContent = '☰';
    });
  });
})();