export default {
  items: [
    {
      name: 'Meu perfil',
      url: '/perfil',
      icon: 'icon-user',

    },
    {
      name: 'Gerenciar',
      url: '/meuperfil',
      icon: 'icon-grid',
    },
    {
      name: 'Operadores',
      url: '/operador',
      icon: 'icon-people',
    },
    {
      name: 'Cardapio',
      icon: 'icon-notebook',
      children: [
        {
          name: 'Produtos',
          url: '/cardapio/produto',
          icon: 'icon-tag',
        },
        {
          name: 'Menus',
          url: '/cardapio/menu',
          icon: 'icon-list',
        },
      ]
    }


  ],
};
