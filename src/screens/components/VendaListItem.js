import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight
} from 'react-native';

export default function VendaListItem({venda, onDel}) {
    
  const formataProds = (prods) => {
    let legenda = '';

    prods.map((p) => {
        legenda += `${p.nome} (${p.qtd})\n`;
    });

    return legenda;
  }

  return (
    <View style={style.venda}>      
      <View style={style.vendaProds}>
        <Text>
            {formataProds(venda.produtos)}
        </Text>
      </View>

      <Text style={style.vendaVal}>{`R$ ${venda.valor}`}</Text>

      <TouchableHighlight 
        underlayColor='#fafafa'
        style={style.vendaAct}
        onPress={() => onDel(venda)}  
      >
          <Text style={style.vendaActText}>Cancelar</Text>
      </TouchableHighlight>
    </View>
  );
}

const style = StyleSheet.create({
  venda: {
    marginVertical: 8,
    minHeight: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  vendaProds: {
    width: Dimensions.get('screen').width * 0.5
  },
  vendaVal: {
    width: Dimensions.get('screen').width * 0.18,
    fontSize: 16,
    fontWeight: 'bold'
  },
  vendaQtd: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  vendaQtd: {
      fontSize: 10,
    },
  vendaAct: {
    borderWidth: 1,
    borderColor: '#f02b2b',
    borderRadius: 10,
    height: 25,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  vendaActText: {
    fontSize: 12,
    color: '#f02b2b'
  }
});