// Loja.js
import React, { useState, useEffect } from 'react';
import Produto from './Produto/Produto';
import axios from 'axios';

const Loja = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Busque os produtos do Prisma assim que a página for carregada
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:3333/products');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error.message);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div>
      <h2>Bem-vindo à Nossa Loja</h2>
      <div>
        {produtos.map((produto) => (
          <Produto key={produto.id} nome={produto.name} preco={produto.price} />
        ))}
      </div>
    </div>
  );
};

export default Loja;
