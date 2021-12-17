const sequelize = require("sequelize");
const connection = require("../database");

const ProdutosVenda = connection.define('produtos_venda', {
    nome_produto: {
        type: sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    quantidade: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    id_venda: {
        type: sequelize.INTEGER,
        allowNull: false
    },
});

ProdutosVenda.sync({force: false}).then(() => {});


module.exports = ProdutosVenda;