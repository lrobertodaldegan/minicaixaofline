import React from 'react';
import {
    TouchableHighlight,
    View,
    Text,
    StyleSheet,
    Dimensions
  } from 'react-native';

export default function EventoButton({nome, onPress, delOnPress}) {
    return (
      <TouchableHighlight
        underlayColor='#fafafa'
        style={style.item}
        onPress={onPress}
      >
          <View style={style.itemWrapper}>
              <Text style={style.itemText}>
                  {nome}
              </Text>


              <TouchableHighlight
                underlayColor='#fafafa'
                style={style.delItem}
                onPress={delOnPress}
              >
                <Text style={style.delItemText}>Excluir</Text>
              </TouchableHighlight>
          </View>
      </TouchableHighlight>
    )
}

const style = StyleSheet.create({
  item: {
    backgroundColor:'#f02b2b',
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  itemText: {
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 35
  },
  delItem: {
    
  },
  delItemText: {
    color:'#fff',
    fontSize: 14,
    lineHeight: 35
  },
});