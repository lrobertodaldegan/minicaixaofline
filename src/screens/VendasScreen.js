import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';

import ExportButton from './components/ExportButton';

import { VendaService } from '../service/VendaService';

import VendaListItem from './components/VendaListItem';

export default function VendasScreen({navigation, route}) {
    const [vendas, setVendas] = useState([]);
    
    useEffect(() => {
        buscarVendas();
    }, []);

    const buscarVendas = async () => {
        let vends = await VendaService.getVendas(route.params.nomeEvento);

        setVendas(Array.from(vends));
    }

    const sumTotalVendas = () => {
        let total = 0;

        vendas.map((v) => {
            total += v.valor;
        });

        return total;
    }

    const cancelaVenda = async (venda) => {
        let novoVendas = Array.from(vendas);

        novoVendas.splice(novoVendas.indexOf(venda), 1);
    
        setVendas(novoVendas);

        await VendaService.salvarVendas(route.params.nomeEvento, novoVendas);
    }

    return (
        <>
            <FlatList
                style={style.list}
                data={vendas}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <VendaListItem venda={item} onDel={cancelaVenda}/>}
                ListHeaderComponent={
                    <View style={style.listHeader}>
                        <Text>{`Valor Total das vendas: R$ ${sumTotalVendas()}`}</Text>
                    </View>
                }
            />

            <ExportButton nomeEvento={route.params.nomeEvento} informacao={vendas}/>
        </>
    );
}

const style = StyleSheet.create({
    list: {
        padding: 16
    },
    listHeader: {
        height: 30,
        alignItems: 'center'
    }
});