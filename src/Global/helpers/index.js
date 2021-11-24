import helpers from './methods';

const Helpers = {
    install(Vue) {
        Vue.prototype.$helpers = helpers;
    }
}

export default Helpers;