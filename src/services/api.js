import axios from "axios"; //importa a npm do axios, importante para aplicar API

// https://viacep.com.br/ws/01310930/json/ 

const api = axios.create({
baseURL:"https://viacep.com.br/ws/" // baseurl é algo que nao vai mudar nesse ex = https://viacep.com.br/ws/   ate aqui nunca vai mudar depois disso é uma rota =  01310930/json/ 
});

export default api; // exportantando para usar a api no projeto