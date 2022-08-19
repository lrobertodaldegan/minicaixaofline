import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default function ProdutoListItem({produto, onDel}) {
    return (
        <View style={style.prod}>
          <Text style={style.prodTitle}>{produto.nome}</Text>
          <Text style={style.prodVal}>{`R$ ${produto.valor}`}</Text>

          <TouchableHighlight 
            underlayColor='#fafafa'
            style={style.prodAct}
            onPress={() => onDel(produto)}  
          >
            <Text style={style.prodActText}>Remover</Text>
          </TouchableHighlight>
        </View>
    );
}

const style = StyleSheet.create({
    prod: {
      marginVertical: 8,
      height: 30,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    prodTitle: {
      fontSize: 18,
      width: 200
    },
    prodVal: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    prodQtd: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    prodAct: {
      borderWidth: 1,
      borderColor: '#f02b2b',
      borderRadius: 10,
      width: 70,
      justifyContent: 'center',
      alignItems: 'center'
    },
    prodActText: {
      fontSize: 12,
      color: '#f02b2b'
    }
  });