<script>
import Create from '@/mixins/master/CreateOrEdit.vue';

export default {
    mixins: [ Create ],
    data() {
        return {
            title: '発注者新規追加',
            url: '/api/orderer',
            router_name: 'orderer_index',
            name_class: 'block mt-1 w-56',
            isEdit: false,
            buttonTitle: '登録する',
        }
    },
};
</script>
