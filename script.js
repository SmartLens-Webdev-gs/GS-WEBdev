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