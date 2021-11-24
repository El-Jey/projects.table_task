import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light: {
                primary: "#1976D2",
                secondary: "#607d8b",
                accent: "#c23926",
                success: "#4caf50",
                info: "#03a9f4",
                warning: "#ff9800",
                error: "#ff5722"
            },
            dark: {
                primary: '#21CFF3',
                secondary: '#ffe18d',
                accent: '#c23926',
                success: '#4CAF50',
                info: '#2196F3',
                warning: '#FB8C00',
                error: '#FF5252'
            }
        },
        options: {
            themeCache: {
                get: key => localStorage.getItem(key),
                set: (key, value) => localStorage.setItem(key, value),
            },
        },
    },
};

export default new Vuetify(opts);