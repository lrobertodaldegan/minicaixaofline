import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  Dimensions
} from 'react-native';
import { EventoService } from '../service/EventoService';

export default function ProdutoScreen({navigation}) {
  const [nomeEvento, setNomeEvento] = useState(null);

  const addEvento = async () => {
    await EventoService.salvarEvento(nomeEvento);

    navigation.navigate('Home')
  }

  return (
    <View style={style.parent}>
      <View style={style.formInputs}>
          <TextInput 
              style={style.formInput}
              placeholder='Nome do evento'
              placeholderTextColor='#f02b2b'
              value={nomeEvento}
              onChangeText={(val) => {
                setNomeEvento(val);

                val = null;
              }}
          />
      </View>

      <TouchableHighlight
        underlayColor='#fafafa'
        onPress={() => addEvento()} 
        style={style.submitForm}
      >
          <Text style={style.submitFormText}>Adicionar</Text>
      </TouchableHighlight>
    </View>
  );
}

const style = StyleSheet.create({
  parent: {
    padding: 16
  },
  formInputs: {
    marginBottom: 16
  },
  formInput: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#f02b2b',
    borderRadius: 10
  },
  submitForm: {
    width: Dimensions.get('screen').width - 32,
    height: 40,
    backgroundColor: '#f02b2b',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f02b2b',
    borderRadius: 10,
  },  
  submitFormText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
});