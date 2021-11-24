import Vue from 'vue';
import Router from 'vue-router';

import routes from './routes';

Vue.use(Router);

const router = new Router({
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    mode: 'history',
    routes: routes
});

export default router;