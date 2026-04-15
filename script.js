const mida = 10;
let matriu = [];
let resposta= []
let mines = 15;
let banderas = 15
let numero = 0
let banderaspulsadas = 0



// Arrancada inicial
inicialitzarMatriu();
renderitzar();


function inicialitzarMatriu() {
    for (let i = 0; i < mida; i++) {
        matriu[i] = [];
        resposta[i] = [];
        for (let j = 0; j < mida; j++) {
            matriu[i][j] = 0; // 0 = Negre / Apagat
            resposta[i][j] = ''; // 0 = Negre / Apagat
        }
    }
}

//Funció que calcularà on estan ubicades les mines
function colocarMines(){
    inicialitzarMatriu();
    numero = 0
    banderaspulsadas = 0

    document.getElementById('info').innerHTML = 'HI HA ' + mines + ' MINES EN TOTAL'
    document.getElementById('botonempezar').innerHTML = 'Reiniciar'
    document.getElementById('banderas').innerHTML = '🚩:' + banderas
    for (let i = 0; i < mines; i++) {
        let x = Math.trunc(mida*Math.random());
        let y = Math.trunc(mida*Math.random());

        if(matriu[x][y] === 0){
            matriu[x][y] = 1;
            resposta[x][y] = 'X';
        }else{
        i--
        }
        matriu[x][y] = 1;

    }

    renderitzar()
}

function netejar() {
    inicialitzarMatriu();
    banderas = 0
    document.getElementById('perder').innerHTML = ''
    renderitzar();
}

function mostrarResposta() {
    const container = document.getElementById('grid-container');
    container.innerHTML = ""; // Esborrem l'anterior

    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            const div = document.createElement('div');
            div.classList.add('cell');

            if(resposta[i][j] === 'X'){
                div.classList.add('bomba');
            }else{
                if(resposta[i][j] !== '') {

                    div.classList.add('pulsado');
                    switch(resposta[i][j]){
                        case 0: div.style.color = '#7ec580'; break
                        case 1: div.style.color = '#b87c7c'; break
                        case 2: div.style.color = '#cf6c6c'; break
                        case 3: div.style.color = '#cd5c5c'; break
                        case 4: div.style.color = '#b15151'; break
                        case 5: div.style.color = '#b64141'; break
                        case 6: div.style.color = '#c14040'; break
                        case 7: div.style.color = '#a62e2e'; break
                        case 8: div.style.color = '#cf1b1b'; break
                    }
                    div.innerText = resposta[i][j];
                }
            }
            container.appendChild(div);
        }
    }
}

// Aquesta funció "dibuixa" els DIVs a l'HTML
function renderitzar() {
    const container = document.getElementById('grid-container');
    container.innerHTML = ""; // Esborrem l'anterior

    for (let i = 0; i < mida; i++) {
        for (let j = 0; j < mida; j++) {
            const div = document.createElement('div');
            div.classList.add('cell');

            // Si a la matriu hi ha un 1, afegim la classe 'active' (color verd)
            if (matriu[i][j] === 1) {
                div.classList.add('escondida');
            }

            if (matriu[i][j] === 'X') {
                div.classList.add('bomba');
            }

            if (matriu[i][j] === 3) {
                div.classList.add('bandera');
            }

            if (matriu[i][j] === 4) {
                div.classList.add('pulsado');
            }

            div.addEventListener('click', function () {

                if(!div.classList.contains('bandera')) {
                    if (matriu[i][j] === 1) {
                        document.getElementById('perder').innerHTML = 'Has perdut'
                        document.getElementById('info').innerHTML = ''
                        document.getElementById('banderas').innerHTML = ''
                        banderas= 15
                        mostrarResposta()
                        setTimeout(function () {
                            inicialitzarMatriu();
                            numero = 0
                            banderaspulsadas = 0
                            banderas = 15
                            document.getElementById('perder').innerHTML = ''
                            colocarMines()
                            renderitzar();
                        }, 1000)

                    } else if (matriu[i][j] === 0) {
                        div.classList.add('pulsado');

                        if (resposta[i][j] === '') {
                            numero++
                            console.log(numero)
                            let bombas = calculos(i, j)
                            resposta[i][j] = bombas;
                            p = document.createElement("p");

                            if(bombas===0){

                            }

                            switch(bombas){
                                case 0: p.style.color = '#7ec580'; break
                                case 1: p.style.color = '#b87c7c'; break
                                case 2: p.style.color = '#cf6c6c'; break
                                case 3: p.style.color = '#cd5c5c'; break
                                case 4: p.style.color = '#b15151'; break
                                case 5: p.style.color = '#b64141'; break
                                case 6: p.style.color = '#c14040'; break
                                case 7: p.style.color = '#a62e2e'; break
                                case 8: p.style.color = '#cf1b1b'; break
                            }

                            p.textContent = bombas;
                            div.appendChild(p);
                        }
                    }

                    if(banderas >= 0){
                        if(numero + banderaspulsadas === mida*mida){
                        document.getElementById('perder').innerHTML = 'HAS GUANYAT'
                        document.getElementById('info').innerHTML = ''
                        document.getElementById('banderas').innerHTML = ''
                        banderas= 15
                        mostrarResposta()
                        setTimeout(function () {
                            inicialitzarMatriu();
                            numero = 0
                            banderaspulsadas = 0
                            banderas = 15
                            document.getElementById('perder').innerHTML = ''
                            colocarMines()
                            renderitzar();
                        }, 1000)
                    }

                    }
                }


            })
            container.appendChild(div);

            div.addEventListener('contextmenu', function () {

                event.preventDefault();
            if(!div.classList.contains('pulsado')){
                    if (div.classList.contains('bandera')) {
                        div.classList.remove('bandera');
                        banderas++
                        banderaspulsadas--
                        div.innerHTML=''
                }else if(!div.classList.contains('bandera')) {
                        div.classList.add('bandera');
                        div.innerHTML = '🚩'
                        banderaspulsadas++
                        banderas--
                        console.log(banderaspulsadas)
                }
            }
                document.getElementById('banderas').innerHTML = '🚩:' + banderas
            })
        }
    }
}

function calculos(x,y){

    let HayBomba = 0

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if(matriu[x+i]?.[y+j] === 1){
                HayBomba++
            }
        }
    }
    return HayBomba;
}
