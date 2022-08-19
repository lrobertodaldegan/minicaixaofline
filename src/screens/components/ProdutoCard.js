import React, {useState, useEffect} from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    StyleSheet,
    Dimensions
  } from 'react-native';

export default function ProdutoCard({produto, onPlus, onMinus}) {
    return (
        <View style={style.formItem}>
            <Text style={style.formItemName}>
                {produto.nome}
            </Text>

            <View style={style.formItemOptions}>
                <TouchableHighlight 
                    style={style.formItemOptionsButtons}
                    underlayColor='#fafafa'
                    onPress={() => onMinus()}
                >
                    <Text style={style.formItemOptionsButtonsTxt}>-</Text>
                </TouchableHighlight>

                <Text style={style.formItemOptionsQtd}>
                    {produto.qtd}
                </Text>

                <TouchableHighlight 
                    style={style.formItemOptionsButtons}
                    underlayColor='#fafafa'
                    onPress={() => onPlus()}
                >
                    <Text style={style.formItemOptionsButtonsTxt}>+</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    formItem: {
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#f7adad',
        width: Dimensions.get('window').width - 32,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 1,
        paddingHorizontal: 20
    },
    formItemName: {
        fontSize: 18,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        width: 150
    },
    formItemOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 110
    },
    formItemOptionsButtons: {
        borderRadius: 15,
        borderColor: '#f02b2b',
        borderWidth: 1,
        alignItems: 'center',
        width: 30,
        height: 30,
    },
    formItemOptionsButtonsTxt: {
        color: '#f02b2b',
        fontSize: 20,
        
    },
    formItemOptionsQtd: {
        fontWeight: 'bold',  
        fontSize: 16,
        marginHorizontal: 10
    },
});