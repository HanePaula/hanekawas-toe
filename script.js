const linha1 = document.getElementById('linha1');
const linha2 = document.getElementById('linha2');
const linha3 = document.getElementById('linha3');
const turno = document.querySelectorAll('[data-vez]');
let jogoVencido = false;

let tabuleiro = [
    [linha1.children[0], linha1.children[1], linha1.children[2]],
    [linha2.children[0], linha2.children[1], linha2.children[2]],
    [linha3.children[0], linha3.children[1], linha3.children[2]]
]

console.log(tabuleiro);
console.log(turno);

function removeEventListeners() {
    tabuleiro.forEach((linha) => {
        linha.forEach((bloco) => {
            bloco.removeEventListener('click', () => { }); // Remove o ouvinte de evento de clique
        });
    });
}

function fazJogada() {
    if (jogoVencido === false) {
        tabuleiro.forEach((linha) => {
            linha.forEach((bloco) => {
                bloco.addEventListener('click', () => {

                    if (jogoVencido) {
                        return;
                    }

                    if (turno[0].dataset.vez === 'sim') {
                        bloco.innerHTML = `<img class="bloco-ponto" src="assets/hanekawa-x.webp" alt="Marcação de Ponto da Hanekawa">`
                        bloco.dataset.cheio = 'X';
                        turno[0].dataset.vez = 'não';
                        turno[1].dataset.vez = 'sim';
                        verificaTabuleiro();

                        if (jogoVencido) {
                            removeEventListeners();
                        }
                    }

                    else {
                        bloco.innerHTML = `<img class="bloco-ponto" src="assets/black-hanekawa-o.png" alt="Marcação de Ponto da Black Hanekawa">`
                        bloco.dataset.cheio = 'O';
                        turno[0].dataset.vez = 'sim';
                        turno[1].dataset.vez = 'não';
                        verificaTabuleiro();

                        if (jogoVencido) {
                            removeEventListeners();
                        }
                    }
                })
            })
        })
    }
}

function verificaTabuleiro() {
    for (let i = 0; i < 3; i++) {
        let checkO = 0;
        let checkX = 0;
        for (let j = 0; j < 3; j++) {
            if (tabuleiro[i][j].dataset.cheio === 'O') {
                checkO++;
            }

            else if (tabuleiro[i][j].dataset.cheio === 'X') {
                checkX++;
            }
        }

        if (checkO >= 3 || checkX >= 3) {
            jogoVencido = true;
        }
    }

    for (let j = 0; j < 3; j++) {
        let checkO = 0;
        let checkX = 0;

        for (let i = 0; i < 3; i++) {
            if (tabuleiro[i][j].dataset.cheio === 'O') {
                checkO++;
            }

            else if (tabuleiro[i][j].dataset.cheio === 'X') {
                checkX++;
            }
        }

        if (checkO >= 3 || checkX >= 3) {
            jogoVencido = true;
        }
    }

    if ((tabuleiro[0][0].dataset.cheio === 'O' || tabuleiro[0][0].dataset.cheio === 'X') &&
        (tabuleiro[1][1].dataset.cheio === 'O' || tabuleiro[1][1].dataset.cheio === 'X') &&
        (tabuleiro[2][2].dataset.cheio === 'O' || tabuleiro[2][2].dataset.cheio === 'X')) {
        jogoVencido = true;
    }

    if ((tabuleiro[0][2].dataset.cheio === 'O' || tabuleiro[0][2].dataset.cheio === 'X') &&
        tabuleiro[0][2].dataset.cheio === tabuleiro[1][1].dataset.cheio &&
        tabuleiro[1][1].dataset.cheio === tabuleiro[2][0].dataset.cheio) {
        jogoVencido = true;
    }


    if (jogoVencido === true) {
        console.log('Parabéns, você venceu!');
    }
}

fazJogada();

