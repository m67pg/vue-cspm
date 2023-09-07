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
        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
    />
</template>
