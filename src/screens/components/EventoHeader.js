import React from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    StyleSheet
  } from 'react-native';

export default function EventoHeader({navigation, nomeEvento, qtdVendidos}) {
    return (
        <View>
            <View style={style.evento}>
                <Text style={style.nomeEvento}>{nomeEvento}</Text>
            </View>

            <View style={style.opcoesEvento}>
                <TouchableHighlight 
                    underlayColor='#fafafa'
                    style={style.opcaoEvento}
                    onPress={() => navigation.navigate('Produto', {nomeEvento: nomeEvento})}
                >
                    <Text style={style.textoOpcaoEvento}>Gerenciar Produtos</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                    underlayColor='#fafafa'
                    style={style.opcaoEvento}
                    onPress={() => navigation.navigate('Vendas', {nomeEvento: nomeEvento})}
                >
                    <Text style={style.textoOpcaoEvento}>
                        {`Itens Vendidos (${qtdVendidos})`}
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    evento: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f02b2b',
        height: 100
    },
    nomeEvento: {
        color:'white',
        fontSize: 24,
        lineHeight: 50,
        fontWeight: 'bold'
    },
    opcoesEvento: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    opcaoEvento: {
        height: 40,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoOpcaoEvento: {
        color: '#f02b2b',
        fontSize: 14
    },
});