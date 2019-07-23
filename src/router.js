import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    }, {
      path: '/tools',
      name: 'tools',
      component: () => import('./views/Tools.vue'),
      children: [
        {
          path: 'todo',
          name: 'todo',
          component: () => import('./views/Todo.vue')
        },
        {
          path: 'analytics',
          name: 'analytics',
          component: () => import('./views/Analytics.vue')
        }, {
          path: 'ringtones',
          name: 'ringtones',
          component: () => import('./views/RingTones.vue')
        }
      ]
    }, {
      path: '*',
      redirect: '/'
    }
  ]
});
