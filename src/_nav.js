export default {
  items: [
    {
      name: 'Meu perfil',
      url: '/gerenciar',
      icon: 'icon-user',
      children: [
        {
          name: "Listar Perfil",
          url: '/perfil',
          icon: 'icon-pencil'
        },
        {
          name: "Editar dados pessoais",
          url: '/gerenciar/restaurante/editar',
          icon: 'icon-pencil'
        },
        {
          name: "Editar dados do restaurante",
          url: '/gerenciar/restaurante/editar',
          icon: 'icon-pencil',
        },
        {
          name: "Editar dados bancários",
          url: '/gerenciar/restaurante/editar',
          icon: 'icon-pencil',
        },

      ]
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
