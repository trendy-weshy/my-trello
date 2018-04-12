import Vue from 'vue';
import Router from 'vue-router';
import ProjectsApi from 'store/project/api';

// The meta data for your routes
const meta = require('./meta.json');

Vue.use(Router);

export function createRouter () {
    const router = new Router({
      base: __dirname,
      mode: 'history',
      scrollBehavior: () => ({ y: 0 }),
      routes: [
        {
          path: '/console',
          meta: meta['/console'],
          component: resolve => import(`pages/ConsolePage.vue`).then(resolve)
        },
        {
          path: '/start',
          meta: meta['/start'],
          component: resolve => import(`pages/StartPage.vue`).then(resolve)
        },
        // Global redirect for 404
        { path: '*', redirect: '/console' }
      ]
    });

    // Send a pageview to Google Analytics
    router.beforeEach((to, from, next) => {
        if (typeof ga !== 'undefined') {
            ga('set', 'page', to.path);
            ga('send', 'pageview');
        }
        next();
    });

    return router;
}
