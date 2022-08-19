import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native';

import { Mocks } from '../mocks/Mocks';
import { ProdutoService } from '../service/ProdutoService';

import ProdutoForm from './components/ProdutoForm';
import ProdutoListItem from './components/ProdutoListItem';

export default function ProdutoScreen({navigation, route}) {
  const [produtos, setProdutos] = useState([]);
  //route.params.nomeEvento

  const addProduto = async (nomeProduto, valorProduto) => {
    let prod = {nome: nomeProduto, valor: valorProduto};

    let novosProdutos = Array.from(produtos);

    novosProdutos.push(prod);

    setProdutos(novosProdutos);

    await ProdutoService.salvarProdutos(route.params.nomeEvento, novosProdutos);
  }

  const delProduto = async (prod) => {
    let novosProdutos = Array.from(produtos);

    novosProdutos.splice(novosProdutos.indexOf(prod), 1);

    setProdutos(novosProdutos);

    await ProdutoService.salvarProdutos(route.params.nomeEvento, novosProdutos);
  }

  const buscarProdutos = async () => {
    let prods = await ProdutoService.getProdutos(route.params.nomeEvento);

    setProdutos(Array.from(prods));
  };

  useEffect(()=> {
    buscarProdutos();
  }, []);

  return (
    <>
      <ProdutoForm 
        onSubmit={addProduto}
      />

      <FlatList
        style={style.list}
        data={produtos}
        keyExtractor={(item) => item.nome}
        renderItem={({item}) => <ProdutoListItem produto={item} onDel={delProduto}/>}
      />
    </>
  );
}

const style = StyleSheet.create({
  list: {
    padding: 16
  },
});