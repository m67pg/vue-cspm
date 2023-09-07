<script>
export default {
    props: {
        isPage: Boolean,
        name: String,
        iclass: String,
    },
};
</script>

<template>
    <router-link :to="{ name: name }"
        :class="isPage ? 'flex items-center px-4 py-2 mt-5 text-gray-700 bg-gray-100 rounded-md' :
                         'flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200'"
    >
        <i :class="iclass"></i>
        <span class="mx-4 font-medium"><slot /></span>
    </router-link>
</template>
