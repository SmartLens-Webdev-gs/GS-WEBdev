# AI.md — Registro de Uso de Inteligência Artificial

**Projeto:** SolarNet  
**Arquivo analisado:** `script.js`

---

## Interação 1 — Questões do Quiz

### O que foi solicitado para a IA

Criação de perguntas de múltipla escolha para um quiz interativo sobre energia solar e o projeto SolarNet, abordando temas como energia fotovoltaica, ODS (Objetivos de Desenvolvimento Sustentável), monitoramento de painéis solares e público-alvo do sistema.

### O que a IA retornou

A IA gerou 9 perguntas de múltipla escolha, cada uma com 4 alternativas e uma resposta correta indicada pelo índice `correta`. As perguntas geradas foram:

1. O que é energia solar fotovoltaica?
2. Qual ODS está diretamente relacionado à energia limpa e acessível?
3. Qual é a principal vantagem do monitoramento em tempo real de painéis solares?
4. O SolarNet aplica conceitos de qual área tecnológica para o monitoramento energético?
5. Qual é um dos principais problemas abordados pelo SolarNet?
6. Painéis solares convertem qual tipo de energia em energia elétrica?
7. Qual dos seguintes NÃO é um público-alvo do SolarNet?
8. Qual benefício ambiental é promovido pelo uso da energia solar?
9. O Brasil é um dos países com maior potencial de energia solar do mundo. Qual fator contribui para isso?

### O que foi alterado, mantido ou rejeitado

| Situação | Detalhe |
|----------|---------|
| **Mantido** | Todas as 9 perguntas foram incorporadas ao array `perguntas` dentro da função `iniciarQuiz()`. |
| **Mantido** | As alternativas e os índices de resposta correta foram preservados conforme gerados. |
| **Erro identificado** | Há uma vírgula faltando após o objeto da pergunta 8 no array (antes da pergunta 9), o que causa um erro de sintaxe em JavaScript. Este erro foi introduzido durante a integração do conteúdo gerado pela IA e deve ser corrigido manualmente. |

---

## Interação 2 — Funcionalidade de Slideshow

### O que foi solicitado para a IA

Criação de uma função JavaScript para controlar um slideshow automático com navegação por botões (anterior/próximo), indicadores de ponto (dots), suporte a toque em dispositivos móveis (swipe) e autoplay com intervalo de 4 segundos.

### O que a IA retornou

A IA gerou a função `iniciarSlideshow()`, contendo:

- Seleção dos elementos do DOM: slides, dots, botões de navegação.
- Função `mostrarSlide(indice)` com controle de índice circular (volta ao início/fim).
- Funções `proximoSlide()` e `slideAnterior()` para navegação manual.
- Sistema de autoplay com `setInterval` a cada 4000ms, pausado ao interagir e reiniciado logo em seguida.
- Navegação por clique nos dots com `data-index`.
- Suporte a gestos de swipe via eventos `touchstart` e `touchend`, com threshold de 50px para diferenciar toque de arraste.

### O que foi alterado, mantido ou rejeitado

| Situação | Detalhe |
|----------|---------|
| **Mantido** | Toda a lógica de controle do slideshow foi mantida conforme gerada. |
| **Mantido** | O intervalo de 4000ms (4 segundos) foi mantido. |
| **Mantido** | O suporte a swipe mobile foi mantido integralmente. |
| **Mantido** | A reinicialização do autoplay após interação manual foi mantida. |
| **Nenhuma rejeição** | O código gerado foi integrado sem alterações de lógica. |

---

*Documento gerado para fins acadêmicos conforme exigência do projeto.*
