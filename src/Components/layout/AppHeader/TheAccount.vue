<template>
    <v-menu :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" class="mr-2">
                <v-avatar>
                    <img :src="user.avatar" alt="Пользователь" />
                </v-avatar>
            </v-btn>
        </template>

        <v-card>
            <v-card-text class="pa-0">
                <v-list>
                    <v-list-item>
                        <v-list-item-avatar>
                            <img :src="user.avatar" alt="Пользователь" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title
                                >{{ user.firstname }}
                                {{ user.lastname }}</v-list-item-title
                            >
                            <v-list-item-subtitle>{{
                                user.work
                            }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list dense>
                    <v-list-item
                        v-for="(m, index) in menus"
                        :key="index"
                        :to="m.route"
                    >
                        <v-list-item-icon class="mr-3">
                            <v-icon dense color="primary">{{ m.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ m.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item to="/logout">
                        <v-list-item-icon class="mr-3">
                            <v-icon dense color="primary">mdi-logout</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title
                                >Выход</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-row align="center" no-gutters class="px-4">
                    <v-col cols="auto">Темная тема</v-col>

                    <v-spacer />

                    <v-col cols="auto">
                        <v-switch dense v-model="switchTheme"></v-switch>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    data() {
        return {
            user: {
                firstname: "Вася",
                lastname: "Куралесов",
                work: "Администратор",
                avatar: "https://i.pravatar.cc/300?img=50",
            },
            menus: [
                {
                    title: "Профиль",
                    icon: "mdi-account",
                    route: "/profile",
                },
                {
                    title: "Настройки",
                    icon: "mdi-settings",
                    route: "/settings",
                },
            ],
        };
    },
    computed: {
        switchTheme: {
            get: function () {
                let theme =
                    JSON.parse(localStorage.getItem("theme")) || "light";

                return (this.$vuetify.theme.dark =
                    theme === "dark" ? true : false);
            },
            set: function (value) {
                if (typeof value === "boolean") {
                    let theme = value === true ? "dark" : "light";

                    localStorage.setItem("theme", JSON.stringify(theme));
                    this.$vuetify.theme.dark = theme === "dark" ? true : false;
                }
            },
        },
    },
};
</script>

<style>
</style>