const sequelize = require("sequelize");
const connection = require("../database");

const Carrinho = connection.define('carrinho', {
    id_produto: {
        type: sequelize.TEXT,
        allowNull: false
    },
    quantidade: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    nome_produto: {
        type: sequelize.STRING,
        allowNull: false
    },
    observacao: {
        type: sequelize.STRING,
        allowNull: false
    },
    valor_produto: {
        type: sequelize.FLOAT,
        allowNull: false
    },
});

Carrinho.sync({force: false}).then(() => {});


module.exports = Carrinho;