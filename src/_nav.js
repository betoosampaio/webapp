export default {
  items: [
    {
      name: 'Mesas',
      url: '/mesas',
      icon: 'icon-grid',
    },
    {
      name: 'Caixas',
      url: '/caixas',
      icon: 'icon-calculator',
    },
    {
      name: 'Usuários',
      icon: 'icon-people',
      children: [
        {
          name: 'Operadores',
          url: '/operador',
          icon: 'icon-user',
        },
        {
          name: 'Perfis',
          url: '/perfil',
          icon: 'icon-people',
        },
      ]
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
    },
    {
      name: 'Cadastros',
      url: '/ambiente',
      icon: 'icon-plus',
      children: [
        {
          name: 'Ambientes',
          url: '/ambiente/cadastrar',
          icon: 'icon-layers',
        },
      ]
    },
  ],
};
