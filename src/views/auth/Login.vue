<script>
import Checkbox from '@/components/Checkbox.vue';
import GuestLayout from '@/components/GuestLayout.vue';
import InputError from '@/components/InputError.vue';
import InputLabel from '@/components/InputLabel.vue';
import Loader from '@/components/Loader.vue';
import TextInput from '@/components/TextInput.vue';
import axios from 'axios';

export default {
    components: {
        Checkbox,
        GuestLayout,
        InputError,
        InputLabel,
        Loader,
        TextInput,
    },
   data() {
        return {
            email: '',
            password: '',
            remember: false,
            errors: {
                email: '',
                password: '',
            },
            isLoading: false,
        }
    },
    methods: {
        submit() {
            this.isLoading = true;

            axios.get('/sanctum/csrf-cookie').then(response => {
                console.log(response);

                this.errors.email = '';
                this.errors.password = '';

                axios
                .post('/api/login', {
                    email: this.email,
                    password: this.password,
                    remember: this.remember,
                })
                .then((response) => {
                    console.log(response.data.message);

                    this.$router.push({ name: 'home' });
                })
                .catch((error) => {
                    console.log(error.response);

                    if (error.response && error.response.status === 422) {
                        if (error.response.data.errors.email && error.response.data.errors.email.length > 0) {
                            this.errors.email = error.response.data.errors.email[0];
                            this.reset();
                        }
                        if (error.response.data.errors.password && error.response.data.errors.password.length > 0) {
                            this.errors.password = error.response.data.errors.password[0];
                            this.reset();
                        }
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                })
            });
        },
        reset() {
            this.password = '';
        },
    },
};
</script>

<template>
    <Loader v-if="isLoading" />
    <GuestLayout v-else>
        <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
                <div>
                    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        Or
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> start your 14-day free trial </a>
                    </p>
                </div>
                <form class="mt-8 space-y-6" @submit.prevent="submit()">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <InputLabel for="email" class="sr-only" value="Email address" />
                        <TextInput
                            id="email"
                            type="email"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            v-model="email"
                            autocomplete="username"
                            placeholder="Email address"
                        />
                        <InputError class="mt-2" :message="errors.email" />

                        <InputLabel for="password" class="sr-only" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            v-model="password"
                            autocomplete="current-password"
                            placeholder="Password"
                        />
                        <InputError class="mt-2" :message="errors.password" />
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <Checkbox name="remember" v-model:checked="remember" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <span class="ml-2 block text-sm text-gray-900">Remember me</span>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
                        </div>
                    </div>

                    <div>
                        <button class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <!-- Heroicon name: solid/lock-closed -->
                                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>
