<script>
import Edit from '@/mixins/master/CreateOrEdit.vue';

export default {
    mixins: [ Edit ],
    data() {
        return {
            title: '進捗編集',
            url: '/api/progress/',
            router_name: 'progress_index',
            name_class: 'block mt-1 w-72',
            isEdit: true,
            buttonTitle: '編集する',
        }
    },
    methods: {
        setResponse(response) {
            this.setForm(response.data.data.progress);
        },
    },
};
</script>
