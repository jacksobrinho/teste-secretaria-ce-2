const sequelize = require("sequelize");
const connection = require("../database");

const Produto = connection.define('produtos', {
    nome_produto: {
        type: sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    },
    valor: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    quantidade: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Produto.sync({force: false}).then(() => {});


module.exports = Produto;