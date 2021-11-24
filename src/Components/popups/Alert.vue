<template>
    <v-alert
        :type="alert.type"
        elevation="8"
        max-width="300px"
        transition="scroll-y-reverse-transition"
        class="alert ml-6"
        >{{ alert.message }}</v-alert
    >
</template>

<script>
export default {
    computed: {
        alert() {
            return this.$store.state.alert;
        },
    },
};
</script>

<style lang="scss" scoped>
.alert {
    bottom: 0;
    position: absolute;
    z-index: 99999;
}
</style>