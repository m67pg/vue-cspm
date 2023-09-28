<script>
import AuthenticatedLayout from '@/components/AuthenticatedLayout.vue';
import BackButton from '@/components/BackButton.vue';
import CreateButton from '@/components/CreateButton.vue';
import Loader from '@/components/Loader.vue';
import MessageSuccess from '@/components/MessageSuccess.vue';
import Http401 from '@/mixins/Http401.vue';
import User from '@/mixins/User.vue';
import axios from 'axios';

export default {
    components: {
        AuthenticatedLayout,
        BackButton,
        CreateButton,
        Loader,
        MessageSuccess,
    },
    mixins: [
        Http401,
        User,
    ],
    data() {
        return {
            isLoading: false,
            
            list: {
                projectDetailInfo: {
                    project_id: Number,
                    project_details: Array,
                }
            },
            prevRoute: null,
        }
    },
    // 前のページのURLを取得する
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.prevRoute = from;
        })
    },
    created() {
        this.$router.replace({ name: 'project_detail_index' });
    },
    mounted() {
        this.isLoading = true;

        if (this.prevRoute.path === '/' || this.prevRoute.path === '/project') {
            this.$store.commit('savePage', this.$route.query.page);
        }

        axios
        .get('/api/project/' + this.projectId() + '/project_detail')
        .then((response) => {
            console.log(response);

            this.list.projectDetailInfo.project_id = response.data.list.projectDetailInfo.project_id;
            this.list.projectDetailInfo.project_details = response.data.list.projectDetailInfo.project_details;
        })
        .catch((error) => {
            console.log(error); 

            this.Http401(error);
        })
        .finally(() => {
            this.isLoading = false;
        })
    },
    methods: {
        projectId() { return this.$route.params && this.$route.params['project_id'] ? this.$route.params['project_id'] : ''; },
    },
}
</script>

<template>
    <Loader v-if="isLoading" />
    <AuthenticatedLayout v-else>
        <div class="py-2 w-auto min-w-[67%] max-w-full">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-2 bg-white">
                        <h2 class="font-semibold text-2xl text-gray-800 leading-tight py-4">
                            プロジェクト詳細一覧
                        </h2>

                        <MessageSuccess name="project_detail_index" />

                        <div class="flex flex-col py-2">
                            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3 text-left font-medium text-gray-900 uppercase tracking-wider">名前</th>
                                                    <th scope="col" class="px-6 py-3 text-left font-medium text-gray-900 uppercase tracking-wider">並び順</th>
                                                    <th scope="col" class="px-6 py-3 text-left font-medium text-gray-900 uppercase tracking-wider">表示 / 非表示</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr v-for="(project_detail, id) in list.projectDetailInfo.project_details" :key="id">
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <div class="text-sm font-medium text-gray-900">
                                                            <router-link :to="{
                                                                name: 'project_detail_edit',
                                                                params: {
                                                                    project_id: list.projectDetailInfo.project_id,
                                                                    id: project_detail.id
                                                                },
                                                            }"
                                                            ><i class="far fa-edit"></i></router-link>
                                                            {{ project_detail.name }}
                                                        </div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ project_detail.sort_order }}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ project_detail.display == 1 ? '表示' : '非表示' }}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td class="px-4 py-4" colspan="3">
                                                        <BackButton class="mr-[12px]" name="project_index" :page="$store.state.page" />
                                                        <CreateButton name="project_detail_create" />
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
