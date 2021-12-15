const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//models
const Produto = require("./database/models/Produto");

//Database Connection
connection.authenticate()
    .then(() => {
        console.log("Conexão realizada com sucesso ao banco de dados");
    })
    .catch((msgError) => {
        console.log(msgError);
    })

server.set('view engine', 'ejs');
server.use(express.static('public'));
server.use(express.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());


server.get("/", (req, res) => {
    Produto.findAll( {raw: true} ).then(produtos => {
        res.render("index", {
            produtos: produtos
        });
    });
});

server.get("/menu", (req, res) => {
    Produto.findAll( {raw: true} ).then(produtos => {
        res.render("menu", {
            produtos: produtos
        });
    });
});


server.get("/teste", (req, res) => {
    let teste = {
        status: "Testando"
    }
    return res.json(teste);
});


server.post('/produtos/cadastrar', (req, res) => {
    var status_requisicao = "";
    var { nome_produto, descricao, valor, quantidade } = "";
    nome_produto = req.body.nome_produto;
    descricao = req.body.descricao;
    valor = req.body.valor;
    quantidade = req.body.quantidade;

    console.log(req.body);
    
    
    Produto.create({
        nome_produto: nome_produto,
        descricao: descricao,
        valor: valor,
        quantidade: quantidade
    })
    .then(() => {
        // console.log("Produto criado com sucesso");
        status_requisicao = "Criado com sucesso"
        res.json({atualizacao: status_requisicao});
    })
    .catch((msgError) => {
        // console.log(msgError);
        status_requisicao = msgError;
        res.json({atualizacao: status_requisicao});
    })
});


server.listen(3000, () => {
    console.log("App online")
});