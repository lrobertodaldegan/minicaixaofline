import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';

export default function ProdutoForm({onSubmit}) {
    const [nomeProduto, setNomeProduto] = useState(null);
    const [valorProduto, setValorProduto] = useState(0);

    const submit = () => {
        onSubmit(nomeProduto, valorProduto);

        setNomeProduto(null);
        setValorProduto(0);
    }

    return (
        <>
            <View style={style.formInputs}>
                <TextInput 
                    style={style.formInput}
                    placeholder='Produto'
                    placeholderTextColor='#f02b2b'
                    value={nomeProduto}
                    onChangeText={(val) => {
                        setNomeProduto(val);

                        val = null;
                    }}
                />

                <TextInput  
                    style={[style.formInput, {width: 100}]}
                    placeholder='Valor'
                    keyboardType='numeric'
                    placeholderTextColor='#f02b2b'
                    value={valorProduto}
                    onChangeText={(val) => {
                        setValorProduto(val);

                        val = 0;
                    }}
                />
            </View>

            <TouchableHighlight
                underlayColor='#fafafa'
                onPress={() => submit()} 
                style={style.submitForm}
            >
                <Text style={style.submitFormText}>Adicionar</Text>
            </TouchableHighlight>
        </>
    );
}

const style = StyleSheet.create({
    formInputs: {
      flexDirection: 'row',
      padding: 16,
      justifyContent: 'space-between'
    },
    formInput: {
      width: (Dimensions.get('screen').width/2) + 62,
      paddingHorizontal: 15,
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