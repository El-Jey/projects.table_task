<template>
    <v-footer app padless absolute inset>
        <v-row justify="center" no-gutters class="py-md-2">
            <v-btn
                v-for="link in links"
                :key="link.name"
                text
                rounded
                :to="link.route"
            >
                {{ link.name }}
            </v-btn>
        </v-row>

        <v-col class="pa-0" cols="12"> </v-col>

        <v-col class="text-center" cols="12"
            >{{ new Date().getFullYear() }} — <strong>{{ appName }}</strong>
        </v-col>
    </v-footer>
</template>

<script>
export default {
    data() {
        return {
            links: [
                { name: "Главная", route: "/" },
                { name: "Контакты", route: "/contacts" },
                { name: "Политика конфиденциальности", route: "/privacy" },
            ],
        };
    },
    computed: {
        appName() {
            return this.$store.state.config.app.name;
        },
    },
};
</script>

<style>
</style>