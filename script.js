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