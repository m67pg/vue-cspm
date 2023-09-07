<script>
import Create from '@/mixins/master/CreateOrEdit.vue';

export default {
    mixins: [ Create ],
    data() {
        return {
            title: '進捗新規追加',
            url: '/api/progress',
            router_name: 'progress_index',
            name_class: 'block mt-1 w-72',
            isEdit: false,
            buttonTitle: '登録する',
        }
    },
};
</script>
