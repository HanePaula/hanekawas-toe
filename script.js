const linha1 = document.getElementById('linha1');
const linha2 = document.getElementById('linha2');
const linha3 = document.getElementById('linha3');
const turno = document.querySelectorAll('[data-vez]');
const main = document.querySelector('main');
const overlay = document.getElementById('overlay');
const jogarNovamente = document.getElementById('jogar-novamente');
const vitorias1 = document.getElementById('vitorias-1');
const vitorias2 = document.getElementById('vitorias-2');
const musica = document.getElementById('musica');
const botaoJogar = document.getElementById('jogar');
const apresentacao = document.getElementById('apresentacao');
const somX = new Audio ('assets/xTone.mp3');
const somO = new Audio ('assets/OTone.mp3');

botaoJogar.addEventListener('click', () => {
    musica.play();
    musica.loop = true;
    botaoJogar.style.display = 'none';
    overlay.style.display = 'none';
    apresentacao.style.display = 'none';
})

let jogoVencidoX = false;
let jogoVencidoO = false;

let placarX  = 0;
let placarO = 0;

let blocosCheios = 0;

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
    if (jogoVencidoO === false && jogoVencidoX === false) {
        tabuleiro.forEach((linha) => {
            linha.forEach((bloco) => {

                bloco.addEventListener('click', () => {

                    if (jogoVencidoO == true || jogoVencidoX == true) {
                        return;
                    }

                    if (bloco.dataset.cheio !== '') {
                        bloco.removeEventListener('click', () => { });
                    }

                    else if (turno[0].dataset.vez === 'sim') {
                        bloco.innerHTML = `<img class="bloco-ponto" src="assets/hanekawa-x.webp" alt="Marcação de Ponto da Hanekawa">`
                        bloco.dataset.cheio = 'X';
                        turno[0].dataset.vez = 'não';
                        turno[1].dataset.vez = 'sim';
                        somX.play();
                        blocosCheios++;
                        verificaTabuleiro();

                        if (jogoVencidoO == true || jogoVencidoX == true) {
                            removeEventListeners();
                        }
                    }

                    else {
                        bloco.innerHTML = `<img class="bloco-ponto" src="assets/black-hanekawa-o.png" alt="Marcação de Ponto da Black Hanekawa">`
                        bloco.dataset.cheio = 'O';
                        turno[0].dataset.vez = 'sim';
                        turno[1].dataset.vez = 'não';
                        somO.play();
                        blocosCheios++;
                        verificaTabuleiro();

                        if (jogoVencidoO == true || jogoVencidoX == true) {
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

        if (checkO >= 3) {
            jogoVencidoO = true;
        }

        else if (checkX >= 3) {
            jogoVencidoX = true;
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

        if (checkO >= 3) {
            jogoVencidoO = true;
        }

        else if (checkX >= 3) {
            jogoVencidoX = true;
        }
    }

    if (tabuleiro[0][0].dataset.cheio === 'O' &&
        tabuleiro[1][1].dataset.cheio === 'O' &&
        tabuleiro[2][2].dataset.cheio === 'O') {
        jogoVencidoO = true;
    }

    if ((tabuleiro[0][2].dataset.cheio === 'O') &&
        tabuleiro[0][2].dataset.cheio === tabuleiro[1][1].dataset.cheio &&
        tabuleiro[1][1].dataset.cheio === tabuleiro[2][0].dataset.cheio) {
        jogoVencidoO = true;
    }

    if (tabuleiro[0][0].dataset.cheio === 'X' &&
    tabuleiro[1][1].dataset.cheio === 'X' &&
    tabuleiro[2][2].dataset.cheio === 'X') {
    jogoVencidoX = true;
}

if ((tabuleiro[0][2].dataset.cheio === 'X') &&
    tabuleiro[0][2].dataset.cheio === tabuleiro[1][1].dataset.cheio &&
    tabuleiro[1][1].dataset.cheio === tabuleiro[2][0].dataset.cheio) {
    jogoVencidoX = true;
}


    if (jogoVencidoX === true) {
        const telaDeVitoria = document.createElement('div');
        telaDeVitoria.className = "tela-de-vitoria";
        telaDeVitoria.innerHTML = 'PLAYER 1 WINS!';

        main.appendChild(telaDeVitoria);

        overlay.style.display = 'block';
        jogarNovamente.style.display = 'block';

        musica.pause();
        musica.currentTime = 0;
    }

    else if (jogoVencidoO === true) {
        const telaDeVitoria = document.createElement('div');
        telaDeVitoria.className = "tela-de-vitoria";
        telaDeVitoria.innerHTML = 'PLAYER 2 WINS!';

        main.appendChild(telaDeVitoria);

        overlay.style.display = 'block';
        jogarNovamente.style.display = 'block';

        musica.pause();
        musica.currentTime = 0;
    }

    else if (blocosCheios >= 9) {
        const telaDeVitoria = document.createElement('div');
        telaDeVitoria.className = "tela-de-vitoria";
        telaDeVitoria.innerHTML = 'DRAW!';

        main.appendChild(telaDeVitoria);

        overlay.style.display = 'block';
        jogarNovamente.style.display = 'block';

        musica.pause();
        musica.currentTime = 0;
    }
}

function jogaNovamente() {
    jogarNovamente.addEventListener('click', () => {
        overlay.style.display = 'none';
        jogarNovamente.style.display = 'none';

        main.removeChild(main.lastChild);

        tabuleiro.forEach((linha) => {
            linha.forEach((bloco) => {
                bloco.dataset.cheio = '';

                while (bloco.firstChild) {
                    bloco.removeChild(bloco.firstChild);
                }
            })
        })

        if (jogoVencidoX) {
            placarX++;
        }
        
        else if (jogoVencidoO) {
            placarO++;
        }

        vitorias1.innerText = placarX.toString();
        vitorias2.innerText = placarO.toString();

        jogoVencidoO = false;
        jogoVencidoX = false;
        blocosCheios = 0;

        turno[0].dataset.vez = 'sim';
        turno[1].dataset.vez = 'não';

        musica.play();
    })
}

fazJogada();
jogaNovamente();

