<script>
export default {
    props: {
        name: String,
        id: Number,
    },
};
</script>

<template>
    <router-link :to="{
            name: name,
            params: { id: id },
            query: { page: this.$route.query.page },
        }"
    >
        <i class="far fa-edit"></i>
    </router-link>
</template>

