<template>
    <v-app>
        <router-view></router-view>
    </v-app>
</template>
<script>
export default {
    beforeCreate() {
        let theme = JSON.parse(localStorage.getItem("theme")) || "light";
        this.$vuetify.theme.dark = theme === "dark" ? true : false;
    },
};
</script>