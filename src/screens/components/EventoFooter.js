import React from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet,
    Dimensions
  } from 'react-native';

  export default function EventoFooter({valorVenda, onPress}) {
    const getValorVendaFormatado = (valor) => {
        if(valor === null || valor === 0)
            return 'R$ 0,00';

        return `R$ ${valor}`.replace('.', ',');
    }

    return (
        <TouchableHighlight 
            style={style.footer} 
            onPress={onPress}
            underlayColor='#fafafa'
        >
            <>
                <Text style={style.textoFooter}>
                    {getValorVendaFormatado(valorVenda)}
                </Text>
                <Text style={style.legendaFooter}>
                    Salvar Venda
                </Text>
            </>
        </TouchableHighlight>
    );
  }

  const style = StyleSheet.create({
    footer: {
        width: Dimensions.get('window').width - 32,  
        paddingVertical:10, 
        borderRadius: 10,            
        backgroundColor: '#f02b2b',                                    
        position: 'absolute',                                          
        bottom: 16,                                                    
        right: 16, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoFooter: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center'
    },
    legendaFooter: {
        color: 'white',
        fontSize: 16,
        textAlign:'center'
    }
});