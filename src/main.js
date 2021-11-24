// Полифиллы для vuetify
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Импорты
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import store from '@/store';
import vuetify from '@/vuetify';
const axios = require("axios").default;

// Собственные плагины
import Plugins from '@/Global';

// Стили
import '@/styles/app.scss';

Vue.prototype.$axios = axios;
Vue.use(...Plugins);

new Vue({
    el: '#application',
    render: h => h(App),
    router,
    store,
    vuetify,
    Plugins
});