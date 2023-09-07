<script>
import CreateOrEdit from '@/mixins/project_detail/CreateOrEdit.vue';

export default {
    mixins: [
        CreateOrEdit,
    ],
    data() {
        return {
            title: 'プロジェクト詳細編集',
            url: '/api/project/' + this.projectId() + '/project_detail/' + this.id(),
            isEdit: true,
            buttonTitle: '編集する',
        }
    },
    methods: {
        getUrl() { return this.url + '/edit' },
    },
};
</script>
