<script>
import AuthenticatedLayout from '@/components/AuthenticatedLayout.vue';
import BackButton from '@/components/BackButton.vue';
import Loader from '@/components/Loader.vue';
import ProjectShow from './partials/ProjectShow.vue';
import Http401 from '@/mixins/Http401.vue';
import User from '@/mixins/User.vue';
import axios from 'axios';
import moment from 'moment';

export default {
    components: {
        AuthenticatedLayout,
        BackButton,
        Loader,
        ProjectShow,
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
                    current_progress: Object,
                    project: Object,
                    project_details: Array,
                    project_progresses: Array,
                },
            },
            details: null,

            rows: 0,
            label: {
                name: '名前',
                crowd_sourcing_name: 'クラウドソーシング',
                orderer_name: '発注者',
                progress_name: '進捗',
            },
        }
    },
    mounted() {
        this.isLoading = true;

        axios
        .get('/api/project/' + this.id())
        .then((response) => {
            console.log(response);

            const data = response.data.data;
            this.data.projectInfo.current_progress = data.projectInfo.current_progress;
            this.data.projectInfo.project = data.projectInfo.project;
            this.data.projectInfo.project_details = data.projectInfo.project_details;
            this.data.projectInfo.project_progresses = data.projectInfo.project_progresses;

            this.details = this.data.projectInfo.project_details.length;
            this.rows = Math.floor(this.details / 2);
            if (!this.isEven()) this.rows++;
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
        isEven() { return this.details % 2 === 0; },
        getRow(row, col) { return col === 2 ? row + row - 1 : row + row - 2; },
        getName(row, col) { return this.data.projectInfo.project_details[ this.getRow(row, col) ].name; },
        getMessage(row, col) { return this.data.projectInfo.project_details[ this.getRow(row, col) ].message.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>'); },
        id() { return this.$route.params && this.$route.params['id'] ? this.$route.params['id'] : ''; },
        momentFormat(momentInput) { return moment(momentInput).format('YYYY-MM-DD HH:mm:ss'); },
    },
}
</script>

<template>
    <Loader v-if="isLoading" />
    <AuthenticatedLayout v-else>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">プロジェクト情報の表示</h3>
            </div>
            <div class="border-t border-gray-200">
                <dl>
                    <ProjectShow :even="false" :label="label.name">{{ data.projectInfo.project.name }}</ProjectShow>
                    <ProjectShow :even="true" :label="label.crowd_sourcing_name">{{ data.projectInfo.project.crowd_sourcing_name }}</ProjectShow>
                    <ProjectShow :even="false" :label="label.orderer_name">{{ data.projectInfo.project.orderer_name }}</ProjectShow>
                    <ProjectShow :even="true" :label="label.progress_name">
                        <p style="margin-bottom:8px;">{{ data.projectInfo.current_progress.name }}</p>
                        <p v-for="(project_progress, id) in data.projectInfo.project_progresses" :key="id" >{{ momentFormat(project_progress.created_at) }} : {{ project_progress.name }}</p>
                    </ProjectShow>
                    <template v-for="row in rows" :key="row">
                        <div :class="row % 2 === 0  ? 'bg-white' : 'bg-gray-50'" class="px-4 py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                            <dd class="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
                                <div class="text-sm font-medium" style="color:blue">{{ getName(row, 1) }}</div>
                                <br>
                                <div v-html="getMessage(row, 1)" />
                            </dd>
                            <dd v-if="row < rows || isEven()" class="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
                                <div class="text-sm font-medium" style="color:blue">{{ getName(row, 2) }}</div>
                                <br>
                                <div v-html="getMessage(row, 2)" />
                            </dd>
                        </div>
                    </template>
                </dl>
            </div>
            <div class="mt-4 px-2 py-4">
                <BackButton class="mr-[12px]" name="project_index" />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
