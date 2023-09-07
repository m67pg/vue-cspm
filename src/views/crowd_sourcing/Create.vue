<script>
import Create from '@/mixins/master/CreateOrEdit.vue';

export default {
    mixins: [ Create ],
    data() {
        return {
            title: 'クラウドソーシング新規追加',
            url: '/api/crowd_sourcing',
            router_name: 'crowd_sourcing_index',
            name_class: 'block mt-1 w-56',
            isEdit: false,
            buttonTitle: '登録する',
        }
    },
};
</script>
