import React from 'react';
import {
  StyleSheet,
  StatusBar
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import EventoScreen from './src/screens/EventoScreen';
import CaixaScreen from './src/screens/CaixaScreen';
import ProdutoScreen from './src/screens/ProdutoScreen';
import VendasScreen from './src/screens/VendasScreen';

const Screens = [
  {
    key: 'home',
    name: 'Home',
    component: HomeScreen,
    options: {
      title: 'Bem-vindo!',
    }
  },
  {
    key: 'evento',
    name: 'Evento',
    component: EventoScreen,
    options: {
      title: 'Novo evento',
    }
  },
  {
    key: 'caixa',
    name: 'Caixa',
    component: CaixaScreen,
    options: {}
  },
  {
    key: 'produto',
    name: 'Produto',
    component: ProdutoScreen,
    options: {
      title: 'Produtos',
    }
  },
  {
    key: 'vendas',
    name: 'Vendas',
    component: VendasScreen,
    options: {}
  }
];

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={style.header.backgroundColor}/>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: '#fafafa',
            headerStyle: style.header
          }}
        >
          {Screens.map((screen) => {
            return (
              <Stack.Screen
                key={screen.key}
                name={screen.name}
                component={screen.component}
                options={screen.options}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const style = StyleSheet.create({
  header: {
    backgroundColor: '#f02b2b'
  },
});