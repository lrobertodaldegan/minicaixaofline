import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  View,
  Text
} from 'react-native';

import EventoButton from './components/EventoButton';
import { EventoService } from '../service/EventoService';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({navigation}) {
    const [eventos, setEventos] = useState([]);
    const inFocus = useIsFocused();

    useEffect(() => {
      buscarEventos();
    }, [inFocus]);

    const buscarEventos = async () => {
      let e = await EventoService.getEventos();

      setEventos(e);
    }

    const removerEvento = async (nome) => {
      await EventoService.removerEvento(nome);

      buscarEventos();
    }

    return (
      <>
        <FlatList 
            style={style.lista}
            data={eventos}
            keyExtractor={(item) => item.nome}
            renderItem={({item}) => {
                return (
                    <EventoButton 
                        nome={item.nome} 
                        delOnPress={() => removerEvento(item.nome)}
                        onPress={() => navigation.navigate('Caixa', 
                                                            {nomeEvento: item.nome})} 
                    />
                )
            }}
        />

        <View style={style.btnWrap}>
          <TouchableHighlight
            underlayColor='#fafafa'
            style={style.btn}
            onPress={() => navigation.navigate('Evento')}
          >
            <Text style={style.btnText}>
                Adicionar evento
            </Text>
          </TouchableHighlight>
        </View>
      </>
    );
  };
  
  const style = StyleSheet.create({
    parent: {
      flexDirection: 'row',
      flex: 1
    },
    lista: {
      padding: 10,
      backgroundColor: '#fafafa'
    },
    btnWrap: {
      width: Dimensions.get('screen').width,
      alignItems: 'center',
    },
    btn: {
        width: Dimensions.get('screen').width / 1.5,
        height: 50,
        marginVertical: 10,
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    btnText: {
        textAlign: 'center',
        color: '#f02b2b',
        fontWeight: 'bold',
        fontSize: 16
    }
  });