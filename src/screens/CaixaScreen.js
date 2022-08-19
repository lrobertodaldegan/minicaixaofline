import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { Mocks } from '../mocks/Mocks';
import { ProdutoService } from '../service/ProdutoService';
import { VendaService } from '../service/VendaService';

import EventoHeader from './components/EventoHeader';
import ProdutoCard from './components/ProdutoCard';
import EventoFooter from './components/EventoFooter';

export default function CaixaScreen({navigation, route}) {
    const [produtos, setProdutos] = useState([]);
    const [qtdVendidos, setQtdVendidos] = useState(0);
    const [vendas, setVendas] = useState([]);
    const [valorVenda, setValorVenda] = useState(0);
    const [produtosSelecionados, setProdutosSelecionados] = useState([]);
    const inFocus = useIsFocused();

    useEffect(() => {
        setProdutosSelecionados([]);
        buscarVendas();
        buscarProdutos();
    }, [inFocus, qtdVendidos]);

    const buscarVendas = async () => {
        let vends = await VendaService.getVendas(route.params.nomeEvento);

        let newVends = Array.from(vends);

        setVendas(newVends);
        setQtdVendidos(newVends.length);
    };

    const buscarProdutos = async () => {
        let novoProds = [];

        let prods = await ProdutoService.getProdutos(route.params.nomeEvento);

        prods.map((p) => novoProds.push({...p, qtd: 0}));

        setProdutos(Array.from(novoProds));
    };

    const updValorVenda = (prod) => {
        let novoProdSelect = Array.from(produtosSelecionados);

        let includes = false;

        novoProdSelect.map((p, index) => {
            if(p.nome === prod.nome){
                includes = true;

                if(prod.qtd === 0)
                    novoProdSelect.splice(index, 1);
                else
                    p.qtd = prod.qtd;
            }
        });

        if(includes === false && prod.qtd > 0)
            novoProdSelect.push(prod);

        let novoVV = 0;

        novoProdSelect.map((p) => {
            novoVV += p.valor * p.qtd;
        });

        setValorVenda(novoVV);
        setProdutosSelecionados(novoProdSelect);
    };

    const updQtdProdSelect = (plus, prod) => {
        let novoProd = prod;

        if(plus === true){
            novoProd.qtd++;
        } else {
            if(novoProd.qtd !== 0)
                novoProd.qtd--;
        }

        updValorVenda(novoProd);
    }

    const updVendas = async () => {
        if(valorVenda > 0) {
            let novoVendas = Array.from(vendas);

            let novaVenda = {
                id: Date.now(),
                valor: valorVenda,
                produtos: Array.from(produtosSelecionados)
            };

            novoVendas.push(novaVenda);
            
            await VendaService.salvarVendas(route.params.nomeEvento, novoVendas);

            let prods = Array.from(produtos);
            prods.map((p) => p.qtd = 0);

            setProdutos(prods);

            setValorVenda(0);
            setVendas(novoVendas);
            setQtdVendidos(novoVendas.length);
            setProdutosSelecionados([]);
        }
    }

    return (
        <>
            <View>
                <EventoHeader
                    navigation={navigation}
                    nomeEvento={route.params.nomeEvento}
                    qtdVendidos={qtdVendidos}
                />

                <FlatList
                    style={style.form}
                    data={produtos}
                    keyExtractor={(item) => item.nome}
                    renderItem={({item}) => {
                        return (
                            <ProdutoCard 
                                produto={item} 
                                onPlus={() => updQtdProdSelect(true, item)}
                                onMinus={() => updQtdProdSelect(false, item)}
                            />
                        );
                    }}
                />
            </View>

            <EventoFooter
                valorVenda={valorVenda}
                onPress={updVendas}
            />
        </>
    );
};
  
const style = StyleSheet.create({
    form: {
        paddingVertical: 16,
        marginHorizontal: 16,
        borderTopColor: '#f7adad',
        borderTopWidth: 0.5,
        maxHeight: Dimensions.get('window').height - 320
    },
});