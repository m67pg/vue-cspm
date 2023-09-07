<script>
export default {
    props: {
        name: String,
    },
    data() {
        return {
            isShow: false,
            message: String,
        }
    },
    mounted() {
        this.isShow = this.$store.state.success.name === this.name;
        this.message = this.$store.state.success.message;
        this.$store.commit('resetSuccess');
    },
};
</script>

<template>
    <div v-if="isShow" style="color:blue">{{ message }}<br /></div>
</template>
