import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Public/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Public/About.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/Public/List.vue')
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('./views/Public/Comment.vue')
    },
    {
      path: '/watch/:id?/:episode?',
      name: 'watch',
      component: () => import('./views/Public/Watch.vue')
    },
    {
      path: '/cinematic/:id?/:episode?',
      name: 'cinematic',
      component: () => import('./views/Public/Cinematic.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/Public/Test.vue')
    },
    {
      path: '/user',
      component: () => import('./views/User/index.vue'),
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: () => import('./views/User/Profile.vue')
        },
        {
          path: 'collection',
          name: 'collection',
          component: () => import('./views/User/Collection.vue')
        },
        {
          path: 'edit',
          name: 'editAnime',
          component: () => import('./views/User/EditAnime.vue')
        }
      ]
    },
    {
      path: '/controlpanel',
      component: () => import('./views/ControlPanel/Menu.vue'),
      children: [
        {
          path: 'users',
          name: 'users',
          component: () => import('./views/ControlPanel/User.vue')
        }
      ]
    },
    {
      path: '/*', redirect: '/'
    }
  ]
})
