<script>
import { ref } from 'vue';

export default {
   props: {
        modelValue: {
            type: String,
            required: true,
        },
   },
   emits: ['update:modelValue'],
   data() {
        return {
            input: ref(null),
        }
    },
    mounted() {
        if (this.$refs.input.hasAttribute('autofocus')) {
            this.$refs.input.focus();
        }
    },
    expose: { focus: () => this.$refs.input.focus() },
};
</script>

<template>
    <input
        class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
    />
</template>
