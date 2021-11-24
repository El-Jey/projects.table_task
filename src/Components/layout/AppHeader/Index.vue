<template>
    <v-app-bar app>
        <v-app-bar-nav-icon
            @click="toggleLeftBar('leftBarVisible')"
            color="accent"
            class="hidden-md"
        ></v-app-bar-nav-icon>

        <v-app-bar-nav-icon
            @click="toggleLeftBar('leftBarMini')"
            color="accent"
            class="hidden-sm"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <app-bar-notifications></app-bar-notifications> -->

        <app-bar-account></app-bar-account>
    </v-app-bar>
</template>

<script>
import { TOGGLE_LEFT_BAR } from "@/store/types";
import AppBarNotifications from "./TheNotifications";
import AppBarAccount from "./TheAccount";

export default {
    components: {
        AppBarNotifications,
        AppBarAccount,
    },
    computed: {
        title() {
            return this.$store.state.config.app.appBarTitle;
        },
    },
    methods: {
        toggleLeftBar(property) {
            this.$store.commit(TOGGLE_LEFT_BAR, property);
        },
    },
};
</script>

<style>
</style>