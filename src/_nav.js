export default {
  items: [
    {
      name: 'Gerenciar',
      url: '/gerenciar',
      icon: 'icon-grid',
      children: [
        {
          name: "Editar dados pessoais",
          url: '/gerenciar/restaurante/editar',
          icon: 'icon-pencil'
        },
        {
          name: "Editar dados do restaurante",
          url: 'gerenciar/restaurante/editar',
          icon: 'icon-pencil',
        },

      ]
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
