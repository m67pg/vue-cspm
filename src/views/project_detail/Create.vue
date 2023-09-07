<script>
import CreateOrEdit from '@/mixins/project_detail/CreateOrEdit.vue';

export default {
    mixins: [
        CreateOrEdit,
    ],
    data() {
        return {
            title: 'プロジェクト詳細新規追加',
            url: '/api/project/' + this.projectId() + '/project_detail',
            isEdit: false,
            buttonTitle: '登録する',
        }
    },
    methods: {
        getUrl() { return this.url + '/create'  },
    },
};
</script>
