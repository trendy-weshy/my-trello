import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function createRouter() {
  const router = new Router({
    scrollBehavior: () => ({ y: 0, x: 0 }),
    routes: [
      {
        path: '/console',
        component: resolve => import('@/pages/ConsolePage.vue').then(resolve),
        children: [
          {
            path: 'tasks',
            component: resolve => import('@/pages/TasksPage.vue').then(resolve),
          },
          {
            path: 'notes',
            component: resolve => import('@/pages/NotesPage.vue').then(resolve),
          },
          { path: '*', redirect: 'tasks' },
        ],
      },
      {
        path: '/start',
        component: resolve => import('@/pages/StartPage.vue').then(resolve),
      },
      { path: '*', redirect: '/start' },
    ],
  });

  return router;
}

export default createRouter();
