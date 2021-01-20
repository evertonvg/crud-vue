import Vue from 'vue'
import Router from 'vue-router'
import Loading from './components/Loading'
import Login from './components/Login'
import Home from './components/Home'
import novoUser from './components/novoUsuario'
import esqueci from './components/esqueciSenha'


Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {path:'/',component: Loading},
        {path:'/login',component: Login},
        {path:'/home',component: Home},
        {path:'/recuperar-senha',component: esqueci},
        {path:'/novo-usuario',component: novoUser},
    ]
})