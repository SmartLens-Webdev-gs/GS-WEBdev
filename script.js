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

