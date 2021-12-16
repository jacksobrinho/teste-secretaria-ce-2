const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//models
const Produto = require("./database/models/Produto");
const Carrinho = require("./database/models/Carrinho");

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

server.get("/carrinho", (req, res) => {
    var total_compra = 0;
    Carrinho.findAll( {raw: true} ).then(carrinho => {
        res.render("carrinho", {
            carrinho: carrinho,
            total_compra: total_compra
        });
    });
});

server.get("/atualizarcarrinho/confirmarexclusao/:id", (req, res) => {
    var id = req.params.id;

    Carrinho.findOne({
        where: {id: id}
    }).then(carrinho => {
        if(carrinho != undefined) {
            res.render("confirmarExclusaoCarrinho", {
                carrinho: carrinho
            });
        } else {
            console.log("Produto não encontrado!");
            res.redirect("/carrinho");
        }
    });
});

server.post("/atualizarcarrinho/deletar/:id",(req, res) => {
    var id = req.params.id;
    Carrinho.destroy({
        where: {id: id}
    }).then(() => {
        console.log("Produto deletado com sucesso do carrinho!")
        res.redirect("/carrinho");

    });
});


server.post("/atualizarcarrinho",(req, res) => {
    var quantidade = req.body.quantidade;
    var observacao = req.body.observacao;
    var valor_produto = req.body.valor_produto;
    var nome_produto = req.body.nome_produto;
    var id_produto = req.body.id_produto;
    // res.send("Formulário recebido! Quantidade: " + quantidade + " || " + " Observação: " + observacao + " || " + "ID: " + id);

    Carrinho.findOne({
        where: {id: id_produto}
    }).then(carrinho => {
        if(carrinho != undefined) {
            Carrinho.update({
                id_produto: req.body.id_produto != undefined ? req.body.id_produto : carrinho.id_produto,
                quantidade: req.body.quantidade != undefined ? req.body.quantidade : carrinho.quantidade,
                observacao: req.body.observacao != undefined ? req.body.observacao : carrinho.observacao,
                valor_produto: req.body.valor_produto != undefined ? req.body.valor_produto : carrinho.valor_produto,
                nome_produto: req.body.nome_produto != undefined ? req.body.nome_produto : carrinho.nome_produto
            }, {
                where: {
                    id_produto: id_produto
                }
            }).then(() => {
                status_requisicao = "Produto alterado com sucesso no carrinho";
                console.log(status_requisicao);
                // res.json({atualizacao: status_requisicao});
                res.redirect("/carrinho");
            })
        } else {
            Carrinho.create({
                id_produto: id_produto,
                quantidade: quantidade,
                observacao: observacao,
                valor_produto: valor_produto,
                nome_produto: nome_produto
            })
            .then(() => {
                status_requisicao = "Produto adicionado com sucesso ao carrinho";
                console.log(status_requisicao);
                // res.json({atualizacao: status_requisicao});
                res.redirect("/carrinho");
            })
            .catch((msgError) => {
                // console.log(msgError);
                status_requisicao = msgError;
                res.json({atualizacao: status_requisicao});
            })
        }
    });
});

server.delete("/produto/deletar/:id",(req, res) => {
    var id = req.params.id;
    Produto.findOne({
        where: {id: id}
    }).then(produto => {
        if(produto != undefined) {
            Produto.destroy({
                where: {id: id}
            });
            console.log("Produto deletado com sucesso!")
            res.send("Produto deletado com sucesso!")
        } else {
            console.log("Produto não encontrado!");
            res.send("Produto não encontrado!")
        }
    });
});

server.get("/produto/:id", (req, res) => {
    var id = req.params.id;
    Produto.findOne({
        where: {id: id}
    }).then(produto => {
        if(produto != undefined) {
            res.render("produto", {
                produto: produto
            });
        } else {
            console.log("Produto não encontrado!");
            res.redirect("/menu");
        }
    });
});

server.post('/produto/cadastrar', (req, res) => {
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
        // console.log("Produto cadastrado com sucesso");
        status_requisicao = "Produto cadastrado com sucesso"
        res.json({atualizacao: status_requisicao});
    })
    .catch((msgError) => {
        // console.log(msgError);
        status_requisicao = msgError;
        res.json({atualizacao: status_requisicao});
    })
});


server.post('/produto/editar/:id', (req, res) => {

    var status_requisicao = "";
    var { nome_produto, descricao, valor, quantidade } = "";

    var id = req.params.id;

    Produto.findOne({
        where: {id: id}
    }).then(produto => {
        if(produto != undefined) {
            Produto.update({
                nome_produto: req.body.nome_produto != undefined ? req.body.nome_produto : produto.nome_produto,
                descricao: req.body.descricao != undefined ? req.body.descricao : produto.descricao,
                valor: req.body.valor != undefined ? req.body.valor : produto.valor,
                quantidade: req.body.quantidade != undefined ? req.body.quantidade : produto.quantidade
            }, {
                where: {
                    id: id
                }
            }).then(() => {
                res.send("Produto alterado com sucesso!");
            })
            
        } else {
            console.log("Produto não encontrado!");
            res.send("Produto não encontrado!");
        }
    });
});


server.listen(3000, () => {
    console.log("App online")
});