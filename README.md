# README - Projeto de Cadastro de Endereço com HTML, CSS e JavaScript
 
![](Gravando%202024-10-03%20112126.gif)
 
# Descrição do Projeto
 
Este projeto é um formulário de cadastro de endereço que permite ao usuário inserir um CEP e, automaticamente, preencher os demais campos como logradouro, bairro, cidade e estado, usando a API ViaCEP para busca dos dados. A interface é desenvolvida com HTML e CSS, enquanto a funcionalidade de preenchimento automático é feita com JavaScript.
 
# Estrutura do Projeto
1. HTML (Estrutura da Página)
O HTML fornece a base para a criação do formulário, definindo os campos necessários para o cadastro de endereço, como:
 
* Campo para o CEP: O usuário insere o CEP, e ao perder o foco do campo, o sistema faz uma busca automática usando a API ViaCEP.
 
* Campos para logradouro, número, bairro, complemento, cidade e estado: Esses campos serão preenchidos automaticamente com base na busca do CEP, exceto o campo de número e complemento, que o usuário deverá preencher manualmente.
 
Seções principais:
 
* Cabeçalho (<head>): Contém as meta-informações como charset e o link para o CSS externo.
 
* Corpo (<body>): O corpo da página é onde o formulário reside. Ele possui um título, campos de entrada de dados, e um botão de envio.
 
2. CSS (Estilização)
O CSS foi utilizado para dar estilo à página e ao formulário. As principais estilizações aplicadas são:
 
Centralização do formulário na página: Usamos flexbox para garantir que o formulário fique centralizado vertical e horizontalmente.
 
* Estilização dos campos de entrada: Aplicamos uma estética visual nos campos do formulário, além de efeitos de transição ao passar o mouse sobre os campos e botões.
 
* Estilização do botão de envio: O botão "Enviar" possui efeitos de destaque ao ser clicado ou ao passar o mouse sobre ele, melhorando a experiência do usuário.
 
# Funcionamento do JavaScript
 
A principal funcionalidade do projeto é o preenchimento automático dos campos do formulário quando um CEP válido é inserido. Isso é feito usando a API ViaCEP através de JavaScript.
 
# Funcionalidades:
 
* Validação do CEP: Antes de realizar a busca, o sistema valida se o CEP inserido tem 8 dígitos e se contém apenas números.
 
* Busca na API ViaCEP: Quando um CEP válido é inserido, o sistema faz uma requisição à [API ViaCEP ](https://viacep.com.br/) para obter os dados de endereço relacionados ao CEP.
 
* Preenchimento Automático: Após a busca, os campos de logradouro, bairro, cidade e estado são preenchidos automaticamente com os dados retornados pela API.
 
* Limpeza do Formulário: Caso o CEP seja inválido ou não encontrado, o formulário será limpo e o usuário será notificado com uma mensagem de erro.
 
# Detalhes da Integração com a [API ViaCEP ](https://viacep.com.br/)
 
A API ViaCEP é gratuita e permite buscar endereços com base no CEP fornecido. A integração foi feita de forma assíncrona usando a função fetch() do JavaScript, que realiza a requisição HTTP e recebe a resposta em formato JSON.
 
# Funções e seu propósito:
 
**Função ``limparFormulario()``**
 
* **Objetivo:** Limpa os campos do formulário relacionados ao endereço (logradouro, localidade, UF, bairro) sempre que o usuário inserir ou tentar pesquisar um CEP.
* **Funcionamento:** Utiliza o método document.getElementById() para selecionar os campos do formulário e definir seus valores como vazios.
 
````
const limparFormulario = () => {
    document.getElementById("logradouro").value = ""; // Limpa o campo Rua
    document.getElementById("localidade").value = ""; // Limpa o campo Cidade
    document.getElementById("uf").value = "";         // Limpa o campo Estado
    document.getElementById("bairro").value = "";     // Limpa o campo Bairro
};
````
**Função ``eNumero(numero)``**
 
* **Objetivo:** Verifica se o valor inserido (número) contém apenas dígitos numéricos.
* **Funcionamento:** Utiliza uma expressão regular (/^[0-9]+$/) que testa se a string é composta apenas de números.
 
````
const eNumero = (numero) => /^[0-9]+$/.test(numero);
````
** Função ``cepValido(cep)``**
 
* **Objetivo:** Valida o CEP inserido pelo usuário, verificando se ele tem exatamente 8 caracteres e é composto apenas por números.
* **Funcionamento:** Combina duas condições: se o CEP tem exatamente 8 caracteres (cep.length == 8) e se contém apenas números (eNumero(cep)).
 
````
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
````
 
**Função ``preencherFormulario(endereco)``**
 
* **Objetivo:** Preenche os campos do formulário com os dados de endereço (logradouro, cidade, estado e bairro) recebidos da API ViaCEP.
* **Funcionamento:** Recebe um objeto endereco contendo os dados retornados pela API e atribui esses valores aos campos correspondentes do formulário.
````
const preencherFormulario = (endereco) => {
    document.getElementById('logradouro').value = endereco.logradouro;
    document.getElementById('localidade').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
    document.getElementById('bairro').value = endereco.bairro;
};
 
````
 
**Função ``pesquisarCep()``**
* **Objetivo:** Esta é a função principal que pesquisa o CEP fornecido pelo usuário na API ViaCEP e preenche os campos do formulário com as informações obtidas, se o CEP for válido.
* **Funcionamento:**
    1. Limpa o formulário: Primeiro, limpa os campos usando limparFormulario().
 
    2. Constrói a URL: Usa o valor do campo cep para criar a URL de requisição à API.
    3. Validação do CEP: Verifica se o CEP inserido é válido com a função cepValido().
    4. Busca os dados: Se o CEP for válido, realiza uma requisição assíncrona (fetch()) para buscar os dados naAPI ViaCEP e converte a resposta em JSON.
    5. Tratamento dos dados: Caso a resposta da API não contenha erros, os dados de endereço são inseridos nos campos do formulário. Caso contrário, exibe uma mensagem de alerta indicando que o CEP não foi encontrado.
 
````
    const pesquisarCep = async () => {
    limparFormulario(); // Limpa os campos antes de iniciar nova busca
   
    const url = `https://viacep.com.br/ws/${cep.value}/json/`; // Monta a URL com o CEP inserido
 
    if (cepValido(cep.value)) { // Verifica se o CEP é válido
        const dados = await fetch(url); // Faz a requisição à API ViaCEP
        const addres = await dados.json(); // Converte a resposta da API em JSON
 
        if (addres.hasOwnProperty('erro')) { // Verifica se a API retornou um erro
            alert("CEP não encontrado");
        } else {
            preencherFormulario(addres); // Preenche o formulário com os dados retornados
        }
    } else {
        alert("Cep incorreto..."); // Exibe alerta se o CEP for inválido
    }
};
````
 
**Adicionando o Escutador de Evento**
* **Objetivo:** Detecta quando o campo de CEP perde o foco (quando o usuário clica fora do campo) e chama a função pesquisarCep().
* **Funcionamento:** Adiciona um "escutador" de evento ao campo de CEP, utilizando o evento focusout. Quando o campo perde o foco, o evento dispara e executa a função pesquisarCep().
js
````
document.getElementById("cep").addEventListener("focusout", pesquisarCep);
````
 
# Como Utilizar o Projeto
 
* Inserção de Dados: Ao abrir o formulário, insira um CEP no campo correspondente.
 
* Preenchimento Automático: Ao digitar o CEP e sair do campo (evento de "focusout"), o sistema buscará automaticamente os dados do endereço na API ViaCEP.
 
* Preenchimento Manual: Caso o CEP seja válido, os campos serão preenchidos automaticamente, mas o campo "Número" e "Complemento" devem ser inseridos manualmente.
 
* Envio: Após preencher todos os campos, clique no botão "Enviar" para finalizar o cadastro (apenas visual, sem back-end integrado).
 
# Tecnologias Utilizadas
 
* HTML5: Estruturação semântica da página.
 
* CSS3: Estilização e responsividade.
 
* JavaScript: Interatividade e consumo da API ViaCEP.
 
# Conclusão
 
Este projeto é um exemplo simples e prático de como construir um formulário dinâmico com preenchimento automático de dados, consumindo uma API externa com JavaScript. Além disso, a utilização de CSS para a estilização e HTML para a estrutura garantem uma interface de usuário agradável e funcional.
 
# Autor:Hilary Caroline Freire de Abreu

