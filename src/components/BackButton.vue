<script>
export default {
    props: {
        name: String,
        page: String,
    },
};
</script>

<template>
    <router-link :to="{
            name: name,
            query: { page: page ? page : this.$route.query.page } 
        }"
        class="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
    >戻る</router-link>
</template>
