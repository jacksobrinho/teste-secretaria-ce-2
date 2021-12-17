Ao ser inicializado, o sistema irá criar todas as tabelas necessárias no banco de dados

Para editar um produto, basta acessar a rota indicada com o id do produto via POST, enviando o json com os dados a serem editados.
    Exemplo:
    Rota: localhost:3000/produto/editar/8   (via POST)
    JSON de exemplo:
    {
        nome_produto: "Café Expresso",
        descricao: "São 150ml de Café Expresso para melhorar o seu dia",
        valor: 15.99,
        quantidade: 10
    }


Para Deletar um produto, basta acessar a rota indicada com o id do produto via DELETE, assim o sistema irá conferir o id e realizará a exclusão, caso seja encontrado.
    Exemplo:
    Rota: localhost:3000/produto/deletar/8   (via DELETE)


Para Cadastrar um produto, bastar acessar a roda indicada via POST, enviando o json com os dados a serem adicionados.
    Exemplo:
    Rota: localhost:3000/produto/cadastrar   (via POST)
    JSON de exemplo:
    {
        nome_produto: "Café Expresso",
        descricao: "São 150ml de Café Expresso para melhorar o seu dia",
        valor: 15.99,
        quantidade: 10
    }
    Observação: Caso não consiga fazer a inserção dos produtos, verificar se está marcada a opção "x-www-form-urlenconded", comigo consegui adicionar apenas com essa opção.

Os métodos acima devem ser feitos via Postman, Isomnia ou algum programa parecido que se comunique com API.

No demais, os processos de venda, administração do carrinho estão sendo feitos via Front-End, então através do navegador é possível ter interação com o sistema.

Rota inicial: localhost:3000/
    Nela contém apenas algumas informações básicas, bem como acesso ao menu/cardápio

Rota menu: localhost:3000/menu
    Nesta rota é onde os produtos são mostrados, todos com a mesma imagem (não foi feito o cadastro de imagens)

Rota carrinho: localhost:3000/carrinho
    É a rota onde é possível acessar e administrar o seu carrinho, bem como finalizar a venda/compra