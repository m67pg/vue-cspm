<script>
import AuthenticatedLayout from '@/components/AuthenticatedLayout.vue';
import BackButton from '@/components/BackButton.vue';
import Input from '@/components/Input.vue';
import InputError from '@/components/InputError.vue';
import Label from '@/components/Label.vue';
import Loader from '@/components/Loader.vue';
import Modal from '@/components/Modal.vue'
import SaveButton from '@/components/SaveButton.vue';
import Http401 from '@/mixins/Http401.vue';
import Http422 from '@/mixins/project_detail/Http422.vue';
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
        Modal,
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
                message: '',
                upload_file: null,
                sort_order: 9,
                display: null,
                delete_button: null,
                errors: {
                    name: null,
                    message: null,
                    upload_file: null,
                    sort_order: null,
                    display: null,
                },
            },
            uploadFile: null,
            showModal: false,
            
            inputClass: 'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md',
            textareaClass: 'shadow-sm focus:ring-indigo-500 focus:border-indigo-00 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md',
        }
    },
    mounted() {
        this.isLoading = true;

        axios
        .get(this.getUrl())
        .then((response) => {
            console.log(response);

            this.setResponse(response);
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

            this.reset();
            const formData = this.getFormData();

            axios
            .post(this.url, formData)
            .then((response) => {
                console.log(response);

                this.$store.commit('saveSuccess', {
                    name: 'project_detail_index',
                    message: response.data.success
                });

                this.$router.push({ name: 'project_detail_index' });
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
        reset() {
            this.form.errors.name = null;
            this.form.errors.message = null;
            this.form.errors.upload_file = null;
            this.form.errors.sort_order = null;
            this.form.errors.display = null;
        },
        getFormData() {
            const form = new FormData();
            form.append('name', this.form.name);
            form.append('message', this.form.message);
            form.append('upload_file', this.form.upload_file);
            form.append('sort_order', this.form.sort_order);
            if (this.isEdit) {
                form.append('_method', 'put');
                form.append('display', this.form.display);
                form.append('delete_button', this.form.delete_button);
            }

            return form;
        },
        setResponse(response) {
            const project_detail = response.data.data.projectDetailInfo.project_detail;
            if (project_detail) {
                this.form.name = project_detail.name;
                this.form.message = project_detail.message;
                this.form.upload_file = project_detail.upload_file,
                this.form.sort_order = project_detail.sort_order;
                this.form.display = project_detail.display;

                this.uploadFile = axios.defaults.baseURL
                                + '/api'
                                + '/project/' + project_detail.project_id
                                + '/project_detail/' + project_detail.id
                                + '/download';
            }
        },
        deleteUploadFile() {
            this.showModal = false;

            this.form.delete_button = 1;
            this.submit();
        },
        projectId() { return this.$route.params && this.$route.params['project_id'] ? this.$route.params['project_id'] : ''; },
        id() { return this.$route.params && this.$route.params['id'] ? this.$route.params['id'] : ''; },
    },
}
</script>

<template>
    <Loader v-if="isLoading" />
    <AuthenticatedLayout v-else>
        <div class="mt-10 sm:mt-0 w-5/6">
            <div class="mt-5">
                <div class="px-4 sm:px-0">
                    <h2 class="font-semibold text-2xl text-gray-800 leading-tight py-4">
                        {{ title }}
                    </h2>
                </div>

                <form @submit.prevent="submit" enctype="multipart/form-data">
                    <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-3 sm:col-span-2">
                                    <Label for="name" value="名前" />
                                    <Input
                                        id="name"
                                        type="text"
                                        class="w-full"
                                        :class="inputClass"
                                        v-model="form.name"
                                        autofocus
                                        autocomplete="name"
                                    />

                                    <InputError class="mt-2" :message="form.errors.name" />
                                </div>
                                <div class="col-span-3 sm:col-span-3">
                                    <Label for="message" value="メッセージ" />
                                    <textarea :class="textareaClass" name="message" id="message" rows="20" v-model="form.message" />

                                    <InputError class="mt-2" :message="form.errors.message" />
                                </div>
                                <div class="col-span-3 sm:col-span-1">
                                    <Label for="upload_file" value="アップロードファイル" />
                                    <template v-if="isEdit && form.upload_file && typeof(form.upload_file) !== 'object'">
                                        <input type="hidden" id="delete_button" name="delete_button" v-model="form.delete_button" />
                                        <a :href="uploadFile">{{ form.upload_file }}</a><br>
                                        <button
                                            type="button"
                                            @click="showModal = true"
                                            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                        >削除する</button>
                                    </template>
                                    <template v-else>
                                        <input class="w-full" :class="inputClass" type="file" name="upload_file" id="upload_file" @input="form.upload_file = $event.target.files[0]" />
                                    </template>

                                    <InputError class="mt-2" :message="form.errors.upload_file" />
                                </div>
                                <div class="col-span-3 sm:col-span-1">
                                    <Label for="sort_order" value="並び順" />
                                    <input class="w-16" :class="inputClass" type="text" name="sort_order" id="sort_order" v-model="form.sort_order" />

                                    <InputError class="mt-2" :message="form.errors.sort_order" />
                                </div>
                                <div v-if="isEdit" class="col-span-3 sm:col-span-1">
                                    <Label for="display" value="表示 / 非表示" />
                                    <input type="radio" id="display" value="1" v-model="form.display">表示
                                    <input type="radio" id="display" value="0" v-model="form.display">非表示

                                    <InputError class="mt-2" :message="form.errors.display" />
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <BackButton class="mr-[12px]"  name="project_detail_index" />
                            <SaveButton>{{ buttonTitle }}</SaveButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <Teleport to="body">
            <modal :show="showModal" @delete="deleteUploadFile" @close="showModal = false" />
        </Teleport>
      </AuthenticatedLayout>
</template>
