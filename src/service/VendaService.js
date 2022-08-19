import { Service} from './Service';

const key = '@vendas_';

export const VendaService = {
    getVendas: async (nomeEvento) => {
        const vendas = await Service.get(key + nomeEvento);

        return vendas === null ? [] : vendas;
    },
    salvarVenda: async (nomeEvento, venda) => {
        let vendas = await Service.get(key + nomeEvento);
        vendas = vendas === null ? [] : vendas;

        vendas.push(venda);

        await Service.save(key + nomeEvento, vendas);

        return vendas;
    },
    salvarVendas: async (nomeEvento, vendas) => {
        await Service.save(key + nomeEvento, vendas);

        return vendas;
    },
    removerVendas: async (nomeEvento) => {
        await Service.delete(key + nomeEvento);
    },
}