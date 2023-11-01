const linha1 = document.getElementById('linha1');
const linha2 = document.getElementById('linha2');
const linha3 = document.getElementById('linha3');
const turno = document.querySelectorAll('[data-vez]');
var jogoVencido = false;

var tabuleiro = [
    [linha1.children[0], linha1.children[1], linha1.children[2]],
    [linha2.children[0], linha2.children[1], linha2.children[2]],
    [linha3.children[0], linha3.children[1], linha3.children[2]]
]

console.log(tabuleiro);
console.log(turno);

function fazJogada() {
    if (jogoVencido == false) {
        tabuleiro.forEach((linha) => {
            linha.forEach((bloco) => {
                bloco.addEventListener('click', () => {
                    if (turno[0].dataset.vez == 'sim') {
                        bloco.innerHTML = `<img class="bloco-ponto" src="assets/hanekawa-x.webp" alt="Marcação de Ponto da Hanekawa">`
                        bloco.dataset.cheio = 'X';
                        turno[0].dataset.vez = 'não';
                        turno[1].dataset.vez = 'sim';
                        verificaTabuleiro();
                    }
    
                    else {
                        bloco.innerHTML = `<img class="bloco-ponto" src="assets/black-hanekawa-o.png" alt="Marcação de Ponto da Black Hanekawa">`
                        bloco.dataset.cheio = 'O';
                        turno[0].dataset.vez = 'sim';
                        turno[1].dataset.vez = 'não';
                        verificaTabuleiro();
                    }
                })
            })
        })
    }
}

fazJogada();

