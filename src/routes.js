import React from 'react';

const Operador = React.lazy(() => import('./views/operador/Operador'));
const CadastrarOperador = React.lazy(() => import('./views/operador/CadastrarOperador'));
const EditarOperador = React.lazy(() => import('./views/operador/EditarOperador'));
const Perfil = React.lazy(() => import('./views/perfil/Perfil'));
const Produto = React.lazy(() => import('./views/produto/Produto'));
const CadastrarProduto = React.lazy(() => import('./views/produto/CadastrarProduto'));
const EditarProduto = React.lazy(() => import('./views/produto/EditarProduto'));
const Menu = React.lazy(() => import('./views/menu/Menu'));
const CadastrarMenu = React.lazy(() => import('./views/menu/CadastrarMenu'));
const EditarMenu = React.lazy(() => import('./views/menu/EditarMenu'));
const DadosRestaurante = React.lazy(() => import('./views/restaurante/DadosRestaurante'));
const EditarDadosPessoais = React.lazy(() => import('./views/restaurante/EditarDadosPessoais'));
const EditarDadosRestaurante = React.lazy(() => import('./views/restaurante/EditarDadosRestaurante'));
const EditarDadosBancarios = React.lazy(() => import('./views/restaurante/EditarDadosBancarios'));
const ListaMesa = React.lazy(() => import('./views/mesa/ListaMesa'));
const DetalheMesa = React.lazy(() => import('./views/mesa/DetalheMesa'));
const ConfigRestaurante = React.lazy(() => import('./views/restaurante/Configuracao'));
const RelatorioMesas = React.lazy(() => import('./views/relatorio/Mesas'));
const RelatorioProdutos = React.lazy(() => import('./views/relatorio/Produtos'));
const RelatorioPagamentos = React.lazy(() => import('./views/relatorio/Pagamentos'));
const ListaCaixa = React.lazy(() => import('./views/caixa/ListaCaixa'));
const DetalheCaixa = React.lazy(() => import('./views/caixa/DetalheCaixa'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/restaurante/configuracao', exact: true, name: 'Configuração', component: ConfigRestaurante },
  { path: '/operador', exact: true, name: 'Operador', component: Operador },
  { path: '/operador/cadastrar', name: 'Cadastrar', component: CadastrarOperador },
  { path: '/operador/editar/:id', name: 'Editar', component: EditarOperador },
  { path: '/perfil/', exact: true, name: 'Perfil', component: Perfil },
  { path: '/cardapio/', exact: true, name: 'Cardapio', component: Produto },
  { path: '/cardapio/produto', exact: true, name: 'Produto', component: Produto },
  { path: '/cardapio/produto/cadastrar', name: 'Cadastrar', component: CadastrarProduto },
  { path: '/cardapio/produto/editar/:id', name: 'Editar', component: EditarProduto },
  { path: '/cardapio/menu', exact: true, name: 'Menu', component: Menu },
  { path: '/cardapio/menu/cadastrar', name: 'Cadastrar', component: CadastrarMenu },
  { path: '/cardapio/menu/editar/:id', name: 'Editar', component: EditarMenu },
  { path: '/restaurante', exact: true, name: 'Restaurante', component: DadosRestaurante },
  { path: '/restaurante/editarDadosPessoais', name: 'Editar Dados Pessoais', component: EditarDadosPessoais },
  { path: '/restaurante/editarDadosRestaurante', name: 'Editar Dados Restaurante', component: EditarDadosRestaurante },
  { path: '/restaurante/editarDadosBancario', name: 'Editar Dados Bancários', component: EditarDadosBancarios },
  { path: '/mesas', exact: true, name: 'Mesas', component: ListaMesa },
  { path: '/mesas/detalhemesa/:id', name: 'Detalhe Mesa', component: DetalheMesa },
  { path: '/relatorio/mesas', name: 'Relatório Mesas', component: RelatorioMesas },
  { path: '/relatorio/produtos', name: 'Relatório Produtos', component: RelatorioProdutos },
  { path: '/relatorio/pagamentos', name: 'Relatório Pagamentos', component: RelatorioPagamentos },
  { path: '/caixas/', exact: true, name: 'Caixas', component: ListaCaixa },
  { path: '/caixas/detalhe/:id', name: 'Detalhe Caixa', component: DetalheCaixa },
  
];

export default routes;
