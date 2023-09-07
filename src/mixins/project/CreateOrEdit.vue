<script>
import AuthenticatedLayout from '@/components/AuthenticatedLayout.vue';
import BackButton from '@/components/BackButton.vue';
import Input from '@/components/Input.vue';
import InputError from '@/components/InputError.vue';
import Label from '@/components/Label.vue';
import Loader from '@/components/Loader.vue';
import SaveButton from '@/components/SaveButton.vue';
import Http401 from '@/mixins/Http401.vue';
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
        User,
    ],
    data() {
        return {
            isLoading: false,

            data: {
                projectInfo: {
                    crowd_sourcings: Array,
                    current_progress_id: Number,
                    orderers: Array,
                    progresses: Array,
                }
            },
            form: {
                name: null,
                crowd_sourcing_id: null,
                orderer_id: null,
                progress_id: null,
                publication_on: null,
                application_deadline_on: null,
                contract_amount_excluding_tax: null,
                display: null,
                errors: {
                    name: null,
                    crowd_sourcing_id: null,
                    orderer_id: null,
                    progress_id: null,
                    publication_on: null,
                    application_deadline_on: null,
                    contract_amount_excluding_tax: null,
                    display: null,
                },
            },

            inputClass: 'w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md',
            selectClass: 'mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
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
        reset() {
            this.form.errors.name = null;
            this.form.errors.crowd_sourcing_id = null;
            this.form.errors.orderer_id = null;
            this.form.errors.progress_id = null;
            this.form.errors.publication_on = null;
            this.form.errors.application_deadline_on = null;
            this.form.errors.contract_amount_excluding_tax = null;
            this.form.errors.display = null;
        },
        getRequest() {
            return {
                name: this.form.name,
                crowd_sourcing_id: this.form.crowd_sourcing_id,
                orderer_id: this.form.orderer_id,
                progress_id: this.form.progress_id,
                publication_on: this.form.publication_on,
                application_deadline_on: this.form.application_deadline_on,
                contract_amount_excluding_tax: this.form.contract_amount_excluding_tax,
            };
        },
        setResponse(response) {
            const projectInfo = response.data.data.projectInfo;
            this.data.projectInfo.crowd_sourcings = projectInfo.crowd_sourcings;
            this.data.projectInfo.current_progress_id = projectInfo.current_progress_id;
            this.data.projectInfo.orderers = projectInfo.orderers;
            this.data.projectInfo.progresses = projectInfo.progresses;

            const project = projectInfo.project;
            if (project) {
                this.form.name = project.name;
                this.form.crowd_sourcing_id = project.crowd_sourcing_id;
                this.form.orderer_id = project.orderer_id;
                this.form.progress_id = projectInfo.current_progress_id;
                this.form.publication_on = project.publication_on;
                this.form.application_deadline_on = project.application_deadline_on;
                this.form.contract_amount_excluding_tax = project.contract_amount_excluding_tax;
                this.form.display = project.display;
            }
        },
    },
}
</script>

<template>
    <Loader v-if="isLoading" />
    <AuthenticatedLayout v-else>
        <div class="mt-10 sm:mt-0">
            <div class="mt-5">
                <div class="px-4 sm:px-0">
                    <h2 class="font-semibold text-2xl text-gray-800 leading-tight py-4">
                        {{ title }}
                    </h2>
                </div>

                <form @submit.prevent="submit">
                    <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                            <div class="grid grid-cols-3 gap-6">
                                <div class="col-span-3 sm:col-span-3">
                                    <Label for="name" value="名前" />
                                    <Input
                                        id="name"
                                        type="text"
                                        :class="inputClass"
                                        v-model="form.name"
                                        autofocus
                                        autocomplete="name"
                                    />

                                    <InputError class="mt-2" :message="form.errors.name" />
                                </div>
                                <div class="col-span-3 sm:col-span-1">
                                    <Label for="crowd_sourcing_id" value="クラウドソーシング" />
                                    <select
                                        id="crowd_sourcing_id"
                                        v-model="form.crowd_sourcing_id"
                                        :class="selectClass"
                                    >
                                        <option value=""></option>
                                        <option v-for="(option, id) in data.projectInfo.crowd_sourcings" :key="id" :value="option.id">{{ option.name }}</option>
                                    </select>

                                    <InputError class="mt-2" :message="form.errors.crowd_sourcing_id" />
                                </div>
                                <div class="col-span-3 sm:col-span-1">
                                    <Label for="orderer_id" value="発注者" />
                                    <select
                                        id="orderer_id"
                                        v-model="form.orderer_id"
                                        :class="selectClass"
                                    >
                                        <option value=""></option>
                                        <option v-for="(option, id) in data.projectInfo.orderers" :key="id" :value="option.id">{{ option.name }}</option>
                                    </select>

                                    <InputError class="mt-2" :message="form.errors.orderer_id" />
                                </div>
                                <div class="col-span-3 sm:col-span-1">
                                    <Label for="progress_id" value="進捗" />
                                    <select
                                        id="progress_id"
                                        v-model="form.progress_id"
                                        :class="selectClass"
                                    >
                                        <option value=""></option>
                                        <option v-for="(option, id) in data.projectInfo.progresses" :key="id" :value="option.id">{{ option.name }}</option>
                                    </select>

                                    <InputError class="mt-2" :message="form.errors.progress_id" />
                                </div>
                                <div class="col-span-3 sm:col-span-1">
                                    <Label for="publication_on" value="掲載日" />
                                    <input :class="inputClass" type="date" id="publication_on" v-model="form.publication_on" />

                                    <InputError class="mt-2" :message="form.errors.publication_on" />
                                </div>
                                <div class="col-span-3 sm:col-span-1">
                                    <Label for="application_deadline_on" value="応募期限" />
                                    <input :class="inputClass" type="date" id="application_deadline_on" v-model="form.application_deadline_on" />

                                    <InputError class="mt-2" :message="form.errors.application_deadline_on" />
                                </div>
                                <div class="col-span-3 sm:col-span-1">
                                    <Label for="contract_amount_excluding_tax" value="契約金額(税抜)" />
                                    <input :class="inputClass" type="text" id="contract_amount_excluding_tax" v-model="form.contract_amount_excluding_tax" />

                                    <InputError class="mt-2" :message="form.errors.contract_amount_excluding_tax" />
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
                            <BackButton class="mr-[12px]"  name="project_index" />
                            <SaveButton>{{ buttonTitle }}</SaveButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
