// querySelector server para selecionar algo em uma tag/classe / id / etc
// prompt() para deixar digitar em uma caixa em alerts por exemplo
// EXEMPLO: tentativas > 1 ? "tentativas":"tentativa" serve para if e else sem precisar escrever tudo
// setAttribute serve para definir ou alterar o valor de um atributo em um elemento HTML, e não para selecionar o elemento
// length ver o tamanho de um lista(arrays)
// return é enviar um valor de volta para o ponto do código que chamou a função, permitindo que esse resultado seja guardado em uma variável ou usado em outros cálculos
// includes serve para ver se o elemento esta ou não em uma lista
// para concatenar é `${}` dentro da chaves coloque a variavel
// responsiveVoice.speak(texto , 'Brazilian portuguese Female',{rate:1.2}) texto : onde muda ; brasilian portuguese female : o idioma ; {rate : 1.2} velocidade
// while  enquanto
// if ('speechSynthesis' in window) {
//     let utterance = new SpeechSynthesisUtterance(texto);
//     utterance.lang = 'pt-BR'; 
//     utterance.rate = 1.2; 
//     window.speechSynthesis.speak(utterance); 
// } else {
//     console.log("Web Speech API não suportada neste navegador."); alternativa para o responsive voice
// }


let listaDeNumeroSorteados =  [];
let numeroLimitite = 10
let numerSecreto = gerarNumeroAleatório()
let tentativas = 1

exibirMensagenmInicial()

function exbirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

exbirTextoNaTela('h1', 'Jogo do número secreto');
exbirTextoNaTela('p', 'Escolha um numero de 1 a 10');

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numerSecreto){
        exbirTextoNaTela('h1', 'acertou');
    let palavraTentativa = tentativas > 1 ? 'tentativas':'tentativa';

    let mensagemTentativas =  `  Você descobriu o número secreto com ${tentativas}  ${palavraTentativa} !`;

        exbirTextoNaTela('p' ,mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{
        if(chute > numerSecreto){
            exbirTextoNaTela('p' , ' o número secreto é menor');
        }
        else{
            exbirTextoNaTela('p' , ' o número secreto é maior');
        }
        tentativas++
        limparCampo()
    }
}
function exibirMensagenmInicial(){
    exbirTextoNaTela('h1', 'Jogo do número secreto');
    exbirTextoNaTela('p', 'Escolha um numero de 1 a 10');
}

function gerarNumeroAleatório() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimitite + 1);
   let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

        if(quantidadeDeElementosNaLista == 3){
            listaDeNumeroSorteados = [];
        }



   if(listaDeNumeroSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatório();
   }
   else{
    listaDeNumeroSorteados.push(numeroEscolhido)
    console.log(listaDeNumeroSorteados)
    return numeroEscolhido
   }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numerSecreto = gerarNumeroAleatório()
    limparCampo()
    tentativas = 1
   exibirMensagenmInicial()
   document.getElementById('reiniciar'),setAttribute('disabled', true)
}