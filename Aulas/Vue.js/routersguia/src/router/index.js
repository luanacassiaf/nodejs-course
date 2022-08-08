import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Formulario from '../views/Formulario.vue'
import RotaPai from '../views/RotaPai.vue'
import RotaFilha from '../views/RotaFilha.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/formulario/:dados',
    name: 'formulario',
    component: Formulario
  },
  {
    path: '/rota',
    name: 'rota',
    component: RotaPai,
    children: [
      {
        path: "aninhada",
        name: 'aninhada',
        component: RotaFilha,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
