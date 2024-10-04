'use strict'; // Modo restrito
// Este modo faz com que o Javascript opere de forma mais segura e rigorosa, ajudando a evitar erros comuns de programação
// * Consumo de API - https://viacep.com.br/ */
 
// FUNÇÃO PARA LIMPAR O FORMULARIO
const limparFormulario = () =>{
    document.getElementById ('logradouro').value = '';
    document.getElementById ('uf').value = '';
    document.getElementById ('bairro').value = '';
    document.getElementById ('localidade').value = '';
}
 
// VERIFICAR SE TEM SOMENTE NÚMERO NO CÓDIGO EXPRESSÃO REGULAR (REGEX) PARA TESTAR O VALOR INFORMADO PELO USUARIO
const eNumero = (numero) => /^[0-9]+$/.test(numero);
 
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
// length É UMA PROPRIEDADE QUE VERIFICA A QUANTIDA DE CARACTERES DENTRO DO CEP
 
// FUNÇÃO PARA PREENCHER FORMULARIO COMO CAMPOS DA API
 
const preencherFormulario = (endereco) =>{
    document.getElementById('logradouro').value = endereco.logradouro;
    document.getElementById('localidade').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
    document.getElementById('bairro').value = endereco.bairro;
}

// Função de consumo de API ViaCep

// Função Assíncrona define uma função que permite o uso de await para trabalhar com promessas.
const pesquisarCep = async() =>{

//  Limpeza do Formulário chama uma função que remove dados antigos do formulário antes de buscar novos dados.
    limparFormulario();
//  Construção da URL cria a URL da API ViaCep, inserindo o valor do campo de entrada do CEP na string.
     const url = `http://viacep.com.br/ws/${cep.value}/json/`;

 //  if Verifica se o CEP é válido utilizando a função cepValido. Se o CEP for válido, o bloco dentro do if será executado.
     if(cepValido(cep.value)){
 // const response Realiza uma requisição para a URL especificada (que deve ser definida anteriormente) e aguarda a resposta.
         const dados  = await fetch(url);
//  const address Converte a resposta da requisição para o formato JSON, que será armazenado na variável address.
         const addres = await dados.json();
//  if Verifica se o objeto address contém uma propriedade chamada erro, indicando que o CEP não foi encontrado.
         if(addres.hasOwnProperty('erro')){
// Alert exibe um alerta ao usuário caso o CEP não seja encontrado.
            alert('CEP Não encontrado');
         }else{
//  Se o CEP for encontrado, chama a função preencherFormulario para preencher o formulário com os dados retornados.
            preencherFormulario(addres);
         }
     }else{
//  Se o CEP não for válido, exibe um alerta informando que o CEP está incorreto.
         alert("CEP Incorreto!");
     }
}

// Adicionar escutador para executar consumo de API da ViaCep
document.getElementById('cep').addEventListener("focusout", pesquisarCep);
