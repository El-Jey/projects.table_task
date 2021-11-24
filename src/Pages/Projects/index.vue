<template>
    <v-app>
        <app-left-bar></app-left-bar>

        <app-header></app-header>

        <v-main>
            <v-container fluid class="pa-6 ma-0">
                <v-row>
                    <v-col>
                        <projects-table
                            :projects="projects"
                        ></projects-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <app-footer></app-footer>

        <alert-popup v-if="alert.show"></alert-popup>
    </v-app>
</template>

<script>
// Layout
import AppHeader from "@/Components/layout/AppHeader";
import AppLeftBar from "@/Components/layout/AppLeftBar";
import AppFooter from "@/Components/layout/AppFooter";
import AlertPopup from "@/Components/popups/Alert";
import ProjectsTable from "@/Pages/Projects/Table";

export default {
    components: {
        AppHeader,
        AppLeftBar,
        AppFooter,
        AlertPopup,
        ProjectsTable,
    },
    data() {
        return {};
    },
    computed: {
        alert() {
            return this.$store.state.alert;
        },
        siisApi() {
            return this.$store.state.config.api.siis.baseUrl;
        },
        projects() {
            return this.$store.state.siis.projects;
        },
    },
};
</script>