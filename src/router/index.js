import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import GerarPedido from '../views/GerarPedido.vue'
import Contagem from '../views/Contagem.vue'
import Menu from '../views/Menu.vue'
import Separacao from '../views/Separacao.vue'
import Apontamento from '../views/Apontamento.vue'

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
