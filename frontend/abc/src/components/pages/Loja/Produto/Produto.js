// Produto.js
import React from 'react';

const Produto = ({ nome, preco }) => {
  return (
    <div>
      <h3>{nome}</h3>
      <p>Preço: R${preco.toFixed(2)}</p>
      {/* Adicione mais detalhes do produto, botões de compra, etc., conforme necessário */}
    </div>
  );
};

export default Produto;
