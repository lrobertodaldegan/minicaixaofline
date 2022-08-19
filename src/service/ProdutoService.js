import { Service} from './Service';

const key = '@produtos_';

export const ProdutoService = {
    getProdutos: async (nomeEvento) => {
        const produtos = await Service.get(key + nomeEvento);

        return produtos === null ? [] : produtos;
    },
    salvarProduto: async (nomeEvento, prod) => {
        let produtos = await Service.get(key + nomeEvento);
        produtos = produtos === null ? [] : produtos;

        produtos.push(prod);

        await Service.save(key + nomeEvento, produtos);

        return eventos;
    },
    salvarProdutos: async (nomeEvento, prods) => {
        await Service.save(key + nomeEvento, prods);

        return prods;
    },
    removerProdutos: async (nomeEvento) => {
        await Service.delete(key + nomeEvento);
    },
}