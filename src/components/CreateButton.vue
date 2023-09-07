<script>
export default {
    props: {
        name: String,
    },
};
</script>

<template>
    <router-link :to="{
            name: name,
            query: { page: this.$route.query.page } 
        }"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >新規追加</router-link>
</template>
