export const generateSalesCopy = (recipe) => {
  return {
    instagram: '✨ Sabonete artesanal de ' + recipe.title.replace('Sabonete de ', '').replace('Sabonete ', '') + '\n\n' +
      recipe.description + '\n\n' +
      '🧼 100% artesanal\n' +
      '🌿 Ingredientes naturais\n' +
      '💝 Perfeito para presentear\n\n' +
      'A partir de ' + recipe.salePrice + '\n' +
      'Faça seu pedido! 📩',

    whatsapp: 'Oi! Tudo bem? 😊\n\n' +
      'Estou com sabonetes artesanais fresquinhos!\n\n' +
      '🧴 ' + recipe.title + '\n' +
      recipe.description + '\n\n' +
      '✅ Feito com carinho, 100% artesanal\n' +
      '✅ ' + recipe.salePrice + '\n\n' +
      'Quer encomendar? Me chama! 💬',

    priceTable: '📋 Tabela de Preços\n\n' +
      '🧼 ' + recipe.title + '\n\n' +
      '1 unidade: ' + recipe.salePrice + '\n' +
      'Kit 3 un: desconto especial!\n' +
      'Kit 6 un: melhor preço!\n\n' +
      'Encomendas pelo WhatsApp 📱',
  };
};
