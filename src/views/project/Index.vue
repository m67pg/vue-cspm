<script>
import AuthenticatedLayout from '@/components/AuthenticatedLayout.vue';
import CreateButton from '@/components/CreateButton.vue';
import Label from '@/components/Label.vue';
import Loader from '@/components/Loader.vue';
import MessageSuccess from '@/components/MessageSuccess.vue';
import Pagination from '@/components/Pagination.vue';
import Http401 from '@/mixins/Http401.vue';
import User from '@/mixins/User.vue';
import axios from 'axios';

export default {
    components: {
        AuthenticatedLayout,
        CreateButton,
        Label,
        Loader,
        MessageSuccess,
        Pagination,
    },
    mixins: [
        Http401,
        User,
    ],
    data() {
        console.log('data()');

        return {
            isLoading: false,
            page: this.$route.query.page,

            crowd_sourcings: Array,
            orderers: Array,
            progresses: Array,
            projects: {
                data: Array,
                from: Number,
                links: Array,
                next_page_url: String,
                prev_page_url: String,
                to: Number,
                total: Number,
            },
            form: {
                keyword: this.$store.state.form.keyword,
                crowd_sourcing_id: this.$store.state.form.crowd_sourcing_id,
                orderer_id: this.$store.state.form.orderer_id,
                progress_id: this.$store.state.form.progress_id,
                button: this.$store.state.form.button,
            },

            url: '/api/project/index',
            selectClass: 'mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
        }
    },
    mounted() {
        console.log('mounted()::' + '::page::' + this.page + '::button::' + this.form.button);

        if (!this.page) this.formReset('submit_button');

        this.axiosPost(false);
    },
    methods: {
        axiosPost(isSearchOrReset) {
            console.log('axiosPost()');

            this.isLoading = true;

            // 検索・リセットボタン押下時にURLの「?page=n」を除去する
            if (isSearchOrReset && this.page) {
                this.page = null;
                this.$router.replace( {name: 'project_index'} );
            }

            axios
            .post(this.page ? this.url + '?page=' + this.page : this.url, {
                keyword: this.$store.state.form.keyword,
                crowd_sourcing_id: this.$store.state.form.crowd_sourcing_id,
                orderer_id: this.$store.state.form.orderer_id,
                progress_id: this.$store.state.form.progress_id,
                button: this.$store.state.form.button,
            })
            .then((response) => {
                console.log(response);

                this.setResponse(response);

                this.form.button = null;
                this.$store.commit('saveButton', this.form.button);
            })
            .catch((error) => {
                console.log(error); 

                this.Http401(error);
            })
            .finally(() => {
                this.isLoading = false;
            })
        },
        setResponse(response) {
            console.log('setResponse()');

            const projectInfo = response.data.list.projectInfo;
            this.crowd_sourcings = projectInfo.crowd_sourcings;
            this.orderers = projectInfo.orderers;
            this.progresses = projectInfo.progresses;
            this.projects.data = projectInfo.projects.data;

            this.projects.from = projectInfo.projects.from;
            this.projects.links = projectInfo.projects.links;
            this.projects.next_page_url = projectInfo.projects.next_page_url;
            this.projects.prev_page_url = projectInfo.projects.prev_page_url;
            this.projects.to = projectInfo.projects.to;
            this.projects.total = projectInfo.projects.total;
        },
        submit(e) {
            console.log('submit()::e.target.name::' + e.target.name);

            this.form.button = e.target.name === '' ? 'submit_button' : e.target.name;

            this.$store.commit(
                'saveForm', {
                    keyword: this.form.keyword,
                    crowd_sourcing_id: this.form.crowd_sourcing_id,
                    orderer_id: this.form.orderer_id,
                    progress_id: this.form.progress_id,
                },
            );
            this.$store.commit('saveButton', this.form.button);

            this.axiosPost(true);
        },
        reset(e) {
            console.log('reset()::e.target.name::' + e.target.name);

            this.formReset(e.target.name);

            this.axiosPost(true);
        },
        formReset(name) {
            console.log('reset()::name::' + name);

            this.form.keyword = null;
            this.form.crowd_sourcing_id = null;
            this.form.orderer_id = null;
            this.form.progress_id = null;
            this.form.button = name;

            this.$store.commit(
                'saveForm', {
                    keyword: null,
                    crowd_sourcing_id: null,
                    orderer_id: null,
                    progress_id: null,
                },
            );
            this.$store.commit('saveButton', this.form.button);
        },
    },
}
</script>

<template>
    <Loader v-if="isLoading" />
    <AuthenticatedLayout v-else>
        <div class="py-2 w-full">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-2 bg-white border-b border-gray-200">
                        <h2 class="font-semibold text-2xl text-gray-800 leading-tight py-4">
                            プロジェクト一覧
                        </h2>

                        <MessageSuccess name="project_index" />

                        <div class="mt-10 sm:mt-0">
                            <div class="md:grid md:grid-cols-2 md:gap-6">
                                <div class="mt-5 md:mt-0 md:col-span-2">
                                    <form @submit.prevent="submit">
                                        <div class="shadow overflow-hidden sm:rounded-md">
                                            <div class="px-2 py-2 bg-white sm:p-6">
                                                <div class="grid grid-cols-12 gap-6">
                                                    <div class="col-span-12 sm:col-span-3">
                                                        <Label for="keyword" value="キーワード" />
                                                        <input
                                                            type="text"
                                                            name="keyword"
                                                            id="keyword"
                                                            v-model="form.keyword"
                                                            autofocus
                                                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                                    </div>

                                                    <div class="col-span-12 sm:col-span-3">
                                                        <Label for="crowd_sourcing_id" value="クラウドソーシング" />
                                                        <select
                                                            id="crowd_sourcing_id"
                                                            v-model="form.crowd_sourcing_id"
                                                            :class="selectClass"
                                                        >
                                                            <option value=""></option>
                                                            <option v-for="(option, id) in crowd_sourcings" :key="id" :value="option.id">{{ option.name }}</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-span-12 sm:col-span-3">
                                                        <Label for="orderer_id" value="発注者" />
                                                        <select
                                                            id="orderer_id"
                                                            v-model="form.orderer_id"
                                                            :class="selectClass"
                                                        >
                                                            <option value=""></option>
                                                            <option v-for="(option, id) in orderers" :key="id" :value="option.id">{{ option.name }}</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-span-12 sm:col-span-3">
                                                        <Label for="progress_id" value="進捗" />
                                                        <select
                                                            id="progress_id"
                                                            v-model="form.progress_id"
                                                            :class="selectClass"
                                                        >
                                                            <option value=""></option>
                                                            <option v-for="(option, id) in progresses" :key="id" :value="option.id">{{ option.name }}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="py-2 bg-gray-50 text-right sm:px-6">
                                                <button
                                                    type="button"
                                                    @click="reset"
                                                    class="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                                                    name="reset_button">リセット</button>
                                                <button
                                                    type="button"
                                                    @click="submit"
                                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    name="submit_button">検索する</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col py-4">
                            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th scope="col">
                                                        <div class="px-6 py-1 text-left font-medium text-gray-900 uppercase tracking-wider">名前</div>
                                                        <div class="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">発注者</div>
                                                    </th>
                                                    <th scope="col" class="px-6 py-3 text-left font-medium text-gray-900 uppercase tracking-wider">クラウドソーシング</th>
                                                    <th scope="col">
                                                        <div class="px-6 py-1 text-left font-medium text-gray-900 uppercase tracking-wider">進捗</div>
                                                        <div class="px-6 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">応募期限</div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr v-for="(project, id) in projects.data" :key="id">
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <div class="text-sm font-medium text-gray-900">
                                                            <router-link :to="{
                                                                name: 'project_show',
                                                                params: { id: project.id },
                                                                query: { page: page },
                                                            }"
                                                            class="mr-[4px]"
                                                            ><i class="far fa-file"></i></router-link>
                                                            <router-link :to="{
                                                                name: 'project_edit',
                                                                params: { id: project.id },
                                                                query: { page: page },
                                                            }"
                                                            class="mr-[4px]"
                                                            ><i class="far fa-edit"></i></router-link>
                                                            <router-link :to="{
                                                                name: 'project_detail_index',
                                                                params: { project_id: project.id },
                                                                query: { page: page },
                                                            }"
                                                            ><i class="far fa-copy"></i></router-link>
                                                            {{ project.name }}
                                                        </div>
                                                        <div class="text-sm text-gray-500">{{ project.orderer_name }}</div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ project.crowd_sourcing_name }}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <div class="text-sm font-medium text-gray-900">{{ project.progress_name }}</div>
                                                        <div class="text-sm text-gray-500">{{ project.application_deadline_on }}</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td class="px-4 py-4">
                                                        <CreateButton name="project_create" />
                                                    </td>
                                                    <td colspan="2">
                                                        <Pagination :data="projects" />
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
