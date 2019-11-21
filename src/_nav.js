export default {
  items: [
    {
      name: 'Mesas',
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
    },
    {
      name: 'Relatório',
      icon: 'icon-graph',
      children: [
        {
          name: 'Mesas',
          url: '/relatorio/mesas',
          icon: 'icon-list',
        }, 
        {
          name: 'Produtos',
          url: '/relatorio/produtos',
          icon: 'icon-tag',
        }, 
        {
          name: 'Pagamentos',
          url: '/relatorio/pagamentos',
          icon: 'fa fa-dollar',
        },      
      ]
    }


  ],
};
