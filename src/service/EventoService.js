import { Service} from './Service';
import { ProdutoService } from './ProdutoService';
import { VendaService } from './VendaService';

const key = '@eventos';

export const EventoService = {
    getEventos: async () => {
        const eventos = await Service.get(key);

        return eventos === null ? [] : eventos;
    },
    salvarEvento: async (nomeEvento) => {
        let eventos = await Service.get(key);
        eventos = eventos === null ? [] : eventos;

        eventos.push({nome: nomeEvento});

        await Service.save(key, eventos);

        return eventos;
    },
    removerEvento: async (nomeEvento) => {
        let eventos = await Service.get(key);

        eventos.splice(eventos.indexOf({nome: nomeEvento}), 1);

        await Service.save(key, eventos);

        await ProdutoService.removerProdutos(nomeEvento);
        await VendaService.removerVendas(nomeEvento);
    }
}