<script>
import Edit from '@/mixins/master/CreateOrEdit.vue';

export default {
    mixins: [ Edit ],
    data() {
        return {
            title: '発注者編集',
            url: '/api/orderer/',
            router_name: 'orderer_index',
            name_class: 'block mt-1 w-56',
            isEdit: true,
            buttonTitle: '編集する',
        }
    },
    methods: {
        setResponse(response) {
            this.setForm(response.data.data.orderer);
        },
    },
};
</script>
