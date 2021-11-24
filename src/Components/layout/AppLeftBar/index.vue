<template>
    <v-navigation-drawer
        app
        v-model="drawer"
        subheader
        :mini-variant.sync="mini"
    >
        <template v-slot:prepend>
            <div class="px-2">
                <div class="py-2">
                    <v-subheader>{{ appName }}</v-subheader>
                </div>

                <v-divider></v-divider>
            </div>
        </template>

        <v-list nav>
            <v-list-item to="/projects">
                <v-list-item-icon>
                    <v-icon color="accent">mdi-calendar-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Проекты</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { TOGGLE_LEFT_BAR } from "@/store/types";

export default {
    data() {
        return {};
    },
    computed: {
        mini() {
            return this.$store.state.leftBarMini;
        },
        drawer: {
            get: function () {
                return this.$store.state.leftBarVisible;
            },
            set: function (value) {
                if (this.drawer !== value) {
                    this.$store.commit(TOGGLE_LEFT_BAR, "leftBarVisible");
                }
            },
        },
        appName() {
            return this.$store.state.config.app.name;
        },
    },
};
</script>

<style>
</style>