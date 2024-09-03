import { useState } from "react"; /* quando for trabalhar com algo dinamico, que vai mudar de valor precisamos fazer estado "USESTATE" e aqui a gente importa o state + o react*/
import { FiSearch } from "react-icons/fi";
import "./styles.css";

import api from "./services/api"; // import do arquivo da api para ser chamado

function App() {
  const [input, setInput] =
    useState(
      ""
    ); /* const que vai ter o estado e o input , o useState com um teste para ver qual  estado vai começar no caso '' é pra começar sem nd 
   1° input nessa função é o nome do nosso estado, 2° depois do virgula do input é a função para buscar o valor do estado
  quando eu chamar apenas o input eu quero saber apenas o valor desse estado, quando eu chamo o  SetInput eu quero passar  o valor novo do estado */

  const [cep, setCep] = useState({}); // armazenar o retorno da chamada, pra começar com um objeto vazio ate clicar e digitar algo no input

  async function handleSearch() {
    // transformada em funcao assicrona porque pode demorar usando a API
    // 01310930/json/

    if (input === "") {
      // if é pra colocar uma condição caso o input for igual a string '' nesse caso vazia vai aparecer o alerta colcoado em baixo
      alert("Preencha algum cep!"); // alerta para colocar caso nao tenha colocado nada no input
      return; // return para parar de rodar o codigo caso nao tenha digitado algo, caso tenha digitado vai continuar rodando
    }

    try {
      // oque voce quer fazer mas pode dar errado  e caso der errado vai cair no bloco catch

      const response = await api.get(`${input}/json`); // criado uma cosnt chamada responsa onde nela é criado await para esperar nossa chamada, importa o arquivo da api ja criado no inicio
      // agora podemos utilizar a o import, api.get ()  nesse caso o get é o tipo da requisao INFORMAÇÕES, abre o template string para passar a chamada usando `${input}` usa / e coloca o formato nesse caso json
      setCep(response.data); // passar para no usosate algum valor = response.data o objeto que a gente teve retorno
      setInput(""); // depois de receber passar para vazio
    } catch {
      alert("Ops.. erro ao buscar aqui"); // caso der algum problema na API aparecer uma mensagem
      setInput(""); // caso der problema, limpar nosso campo e zerar / colocar o valor do useState vazio
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text" // para colocar um quadrado de dados //
          placeholder="Digite seu cep..." /*texto que fica dentro do quadrado de input */
          value={input} /* aqui esta o valor atrelado ao usestate*/
          onChange={(event) =>
            setInput(event.target.value)
          } /* onchange recebe uma função anonima ,() =>, que nesse () recebe o evento ficando assim (event)
             pra  salvar o que foi digitado, vira um evento que a gente passa para o setinput que ele recebe event, quando se chama o setinput pra passar um valor para o estado 
             nesse caso a gente vai ter acesso ao que foi digitado pelo event.target.value*/
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} -- {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;

//foi adiciona a biblioteca de icons do site react-icon importou o icone de lupinha no topo aqui e no lugar de procurar no botao aparecer o icone//
// depois foi criado uma <MAIN> para o conteudo principal do site, dentro dele colocado um h2 + spans com as informações que seram relevante em exemplo
// depois foi criado no src um arquivo para o style.css e foi importado a pasta no app.js
// foi adiciona uma API de buscador de CEP = https://viacep.com.br/ws/01310930/json/
// Foi instalada uma bliblioteca para trabalhar com http = npm install axios
// na parte do main pra aparecer os dados vamos colocar no useState utiliza os objetos que vai ser mostrado e usando ex cep.cep, cep.logradouro, cep.complemento
// {Object.keys(cep).length > 0}  acessando o objeto e verificando se caso tem algo dentro desse objeto, se for maior que zero tem alguma coisa e se tem alguma coisa vai mostrar as coisas
