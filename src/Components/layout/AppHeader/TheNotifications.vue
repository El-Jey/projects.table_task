<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                class="mr-2"
                v-bind="attrs"
                v-on="on"
            >
                <v-badge
                    :content="messages"
                    :value="messages"
                    color="warning"
                    overlap
                >
                    <v-icon color="secondary">mdi-bell</v-icon>
                </v-badge>
            </v-btn>
        </template>

        <v-card max-width="450">
            <v-list
                flat
                dense
            >
                <v-subheader>Сегодня</v-subheader>

                <v-list-item
                    v-for="(n, index) in notifications"
                    :key="index"
                    to="#"
                >
                    <v-list-item-icon class="mr-3">
                        <v-icon :color="n.color">mdi-alert-circle
                        </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="n.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <div class="text-center py-2">
                <v-btn
                    plain
                    small
                    color="error"
                >Очистить</v-btn>
            </div>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    data() {
        return {
            notifications: [
                { title: "Notification 1", color: "warning" },
                { title: "Notification 2", color: "error" },
                { title: "Notification 3", color: "error" },
                {
                    title: "Notification 4",
                    color: "success",
                },
            ],
        };
    },
    computed: {
        messages() {
            return this.notifications.length;
        },
    },
};
</script>

<style>
</style>