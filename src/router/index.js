import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import GerarPedido from '../views/GerarPedido.vue'
import Contagem from '../views/Contagem.vue'
import Menu from '../views/Menu.vue'
import Separacao from '../views/Separacao.vue'
import Apontamento from '../views/Apontamento.vue'
import NaoConformidade from '../views/NaoConformidade.vue'
import AssistenciaTecnica from '../views/AssistenciaTecnica.vue'

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/pedido-web',
    name: 'GerarPedido',
    component: GerarPedido
  },
  {
    path: '/contagem',
    name: 'Contagem',
    component: Contagem
  },
  {
    path: '/separacao',
    name: 'Separacao',
    component: Separacao
  },
  {
    path: '/apontamento',
    name: 'Apontamento',
    component: Apontamento
  },
  {
    path: '/nao-conformidade',
    name: 'NaoConformidade',
    component: NaoConformidade,
    props: { showNavBar: true, origem: 'menu' }
  },
  {
    path: '/assistencia-tecnica',
    name: 'AssistenciaTecnica',
    component: AssistenciaTecnica
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
