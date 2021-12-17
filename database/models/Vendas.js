const sequelize = require("sequelize");
const connection = require("../database");

const Vendas = connection.define('vendas', {

    valor: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    numero_cartao: {
        type: sequelize.STRING,
        allowNull: false
    },
    mes_vencimento: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    ano_vencimento: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    nome_cartao: {
        type: sequelize.STRING,
        allowNull: false
    }
});

Vendas.sync({force: false}).then(() => {});


module.exports = Vendas;