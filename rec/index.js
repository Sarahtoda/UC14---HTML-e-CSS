
// Selecionando os elementos da página
let pontuacao = 0;
let perguntasRespondidas = 0;

const perguntas = document.querySelectorAll(".pergunta");
const placar = document.getElementById("pontos");
const resultado = document.getElementById("resultado");
const botaoReiniciar = document.getElementById("reiniciar");

// Adicionando eventos aos botões de resposta
perguntas.forEach(function(pergunta) {

    const alternativas = pergunta.querySelectorAll(".alternativa");
    const respostaCorreta = pergunta.dataset.correct;
    const feedback = pergunta.querySelector(".feedback");

    alternativas.forEach(function(botao) {

        botao.addEventListener("click", function() {

            // Impede responder mais de uma vez
            if (pergunta.dataset.respondida === "true") {
                return;
            }

            pergunta.dataset.respondida = "true";
            perguntasRespondidas++;

            // Verifica se a resposta está correta
            if (botao.dataset.answer === respostaCorreta) {

                pontuacao++;

                botao.classList.add("correto");
                feedback.textContent = "Parabéns! Resposta correta!";

            } else {

                botao.classList.add("errado");
                feedback.textContent = "Resposta incorreta!";

                // Mostra qual era a alternativa correta
                alternativas.forEach(function(alternativa) {
                    if (alternativa.dataset.answer === respostaCorreta) {
                        alternativa.classList.add("correto");
                    }
                });
            }

            // Desativa as alternativas da pergunta respondida
            alternativas.forEach(function(alternativa) {
                alternativa.disabled = true;
            });

            // Atualiza o placar
            placar.textContent = pontuacao;

            // Verifica se todas as perguntas foram respondidas
            if (perguntasRespondidas === 5) {

                resultado.textContent =
                    "Você acertou " + pontuacao + " de 5!";

            }

        });

    });

});

// Botão para reiniciar o quiz
botaoReiniciar.addEventListener("click", function() {

    pontuacao = 0;
    perguntasRespondidas = 0;

    placar.textContent = pontuacao;
    resultado.textContent = "";

    // Limpa as respostas de todas as perguntas
    perguntas.forEach(function(pergunta) {

        pergunta.dataset.respondida = "false";

        const alternativas = pergunta.querySelectorAll(".alternativa");
        const feedback = pergunta.querySelector(".feedback");

        alternativas.forEach(function(botao) {

            botao.classList.remove("correto");
            botao.classList.remove("errado");

            botao.disabled = false;

        });

        feedback.textContent = "";

    });

});
