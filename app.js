const botaoChute = document.querySelector("#chutar");
const botaoNovoJogo = document.querySelector("#reiniciar");
const valorMax = 10;
let numeroSecreto = 0;
let numTentatitvas = 0;
let numerosSecretos = [];
let posicaoAtual = 0;

function geraNumerosSecretos(){
    numerosSecretos = [];
    for(let i=0; i<=valorMax; i++){
        numerosSecretos.push(i);
    }
    numerosSecretos.sort(() => Math.random() > 0.5 ? 2 : -1);
}

function imprimeTexto(localAImprimir, texto){
    document.querySelector(localAImprimir).innerHTML = texto;
}

function inicializaJogo(){
    imprimeTexto("h1", "Jogo do Número Secreto");
    imprimeTexto("p", `Escolha um número de 0 a ${valorMax}`);
    numeroSecreto = numerosSecretos[posicaoAtual];
    numTentatitvas = 1;
    botaoChute.removeAttribute("disabled");
    botaoNovoJogo.setAttribute("disabled", true);
    if(posicaoAtual<valorMax){
        posicaoAtual++;
    }
    else{
        geraNumerosSecretos();
        posicaoAtual = 0;
    }
}

function chutarNumero(){
    const numeroDigitado = document.querySelector("input").valueAsNumber;

    document.querySelector("input").value = null;

    if(isNaN(numeroDigitado)){
        imprimeTexto("p", `Por favor... Um número de 0 a ${valorMax}`);
    }
    else if(numeroDigitado === numeroSecreto){
        const stringTentativa = numTentatitvas === 1 ? "tentativa" : "tentativas";

        imprimeTexto("h1",`Acertou Miserávi`);
        imprimeTexto("p", `Com um total de ${numTentatitvas} ${stringTentativa}`);
        botaoChute.setAttribute("disabled",true);
        botaoNovoJogo.removeAttribute("disabled");
    }
    else{
        const stringMenorOuMaior = numeroDigitado > numeroSecreto ? "menor" : "maior";

        imprimeTexto("p",`Você Errou, o numero é ${stringMenorOuMaior} que ${numeroDigitado}`);
        numTentatitvas++;
    }    
}


(function () {

    geraNumerosSecretos();

    botaoChute.addEventListener("click", chutarNumero);
    botaoNovoJogo.addEventListener("click", inicializaJogo);

    inicializaJogo();
})();