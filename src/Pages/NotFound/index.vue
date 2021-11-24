<template>
    <v-container
        id="error-view"
        class="fill-height text-center"
        app
    >
        <v-row justify="center">
            <v-col cols="auto">
                <h1 class="text-h1 secondary--text mb-16 font-weight-bold">
                    404
                </h1>

                <div class="text-h4 pt-8 pb-10">
                    Страница не найдена :(
                </div>

                <v-btn
                    depressed
                    large
                    to="/"
                    color="primary"
                >
                    Уведите меня отсюда!
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    beforeCreate() {
        document.title = "UT.GIS | 404";
    },
};
</script>

<style lang="scss">
#error-view {
    h1 {
        &.text-h1 {
            font-size: 14rem !important;
        }
    }
}
</style>
