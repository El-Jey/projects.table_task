import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './types';
import configState from './config';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        ...configState,
        alert: {
            show: null,
            message: null,
            timeout: null,
            type: null
        },
        leftBarMini: false,
        leftBarVisible: null,
        siis: {
            currentPage: null,
            projects: [],
            tableLoading: false,
            totalCount: null,
        }
    },
    mutations: {
        [types.ALERT](state, data) {
            state.alert = data;

            const timeout = data.timeout || 7000;
            setTimeout(() => {
                for (const key in state.alert) {
                    state.alert[key] = null;
                }
            }, timeout);
        },
        [types.CURRENT_PAGE](state, pageNum) {
            state.siis.currentPage = pageNum;
        },
        [types.PROJECTS](state, projects) {
            state.siis.projects = projects;
        },
        [types.SET_APP_BAR_TITLE](state, title) {
            state.config.app.appBarTitle = title;
        },
        [types.SET_TABLE_LOADING](state, data) {
            state.siis.tableLoading = data;
        },
        [types.TOGGLE_LEFT_BAR](state, key) {
            state[key] = !state[key];
        },
        [types.TOTAL_PAGES](state, projectsCount) {
            state.siis.totalCount = projectsCount;
        },
        [types.UPDATE_PROJECTS](state, payload) {
            Object.assign(
                state.siis.projects[payload.index],
                payload.item
            );
        },
    },
    actions: {},
    getters: {}
})

export default store;