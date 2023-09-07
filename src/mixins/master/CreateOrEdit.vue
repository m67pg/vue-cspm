<script>
import AuthenticatedLayout from '@/components/AuthenticatedLayout.vue';
import BackButton from '@/components/BackButton.vue';
import Input from '@/components/Input.vue';
import InputError from '@/components/InputError.vue';
import Label from '@/components/Label.vue';
import Loader from '@/components/Loader.vue';
import SaveButton from '@/components/SaveButton.vue';
import Http401 from '@/mixins/Http401.vue';
import Http422 from '@/mixins/master/Http422.vue';
import User from '@/mixins/User.vue';
import axios from 'axios';

export default {
    components: {
        AuthenticatedLayout,
        BackButton,
        Input,
        InputError,
        Label,
        Loader,
        SaveButton,
    },
    mixins: [
        Http401,
        Http422,
        User,
    ],
   data() {
        return {
            isLoading: false,

            form: {
                name: '',
                sort_order: '9',
                display: '1',
                errors: {
                    name: '',
                    sort_order: '',
                },
            },
        }
    },
    mounted() {
        this.isLoading = true;

        axios
        .get(this.getUrl())
        .then((response) => {
            console.log(response);

            if (this.isEdit) this.setResponse(response);
        })
        .catch((error) => {
            console.log(error.response);

            this.Http401(error);
        })
        .finally(() => {
            this.isLoading = false;
        })
    },
    methods: {
        submit() {
            this.isLoading = true;

            this.form.errors.name = '';
            this.form.errors.sort_order = '';

            const data = {
                name: this.form.name,
                sort_order: this.form.sort_order,
            };
            if (this.isEdit) {
                data['_method'] =  'put';             
                data['display'] =  this.form.display;             
            }

            axios
            .post(this.url + this.id(), data)
            .then((response) => {
                console.log(response);

                this.$store.commit('saveSuccess', {
                    name: this.router_name,
                    message: response.data.success
                });

                const to = { name: this.router_name };
                if (this.isEdit) to['query'] = { page: this.$route.query.page };
                this.$router.push(to);
            })
            .catch((error) => {
                console.log(error.response);

                this.Http401(error);
                this.Http422(error);
            })
            .finally(() => {
                this.isLoading = false;
            })
        },
        setForm(master) {
            this.form.name = master.name;
            this.form.sort_order = String(master.sort_order);
            this.form.display = master.display;
        },
        getUrl() { return this.isEdit ? this.url + this.id() + '/edit' : this.url + '/create'  },
        id() { return this.$route.params && this.$route.params['id'] ? this.$route.params['id'] : ''; },
    },
};
</script>

<template>
    <Loader v-if="isLoading" />
    <AuthenticatedLayout v-else>
        <div class="py-12">
            <div class="max-w-xl mx-auto sm:px-6 lg:px-8">
                <h2 class="font-semibold text-2xl text-gray-800 leading-tight">
                    {{ title }}
                </h2>
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <form @submit.prevent="submit()">
                            <div>
                                <Label for="name" value="名前" />

                                <Input
                                    id="name"
                                    type="text"
                                    :class="name_class"
                                    v-model="form.name"
                                    autofocus
                                    autocomplete="name"
                                />

                                <InputError class="mt-2" :message="form.errors.name" />
                            </div>
                            <div class="mt-4">
                                <Label for="sort_order" value="並び順" />

                                <Input
                                    id="sort_order"
                                    type="text"
                                    class="block mt-1 w-16"
                                    v-model="form.sort_order"
                                    autocomplete="sort_order"
                                />

                                <InputError class="mt-2" :message="form.errors.sort_order" />
                            </div>
                            <div v-if="isEdit" class="mt-4">
                                <Label for="display" value="表示 / 非表示" />

                                <input type="radio" id="display" value="1" v-model="form.display">表示
                                <input type="radio" id="display" value="0" v-model="form.display">非表示
                            </div>
                            <div class="mt-4">
                                <BackButton :name="router_name" />
                                <SaveButton>{{ buttonTitle }}</SaveButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
