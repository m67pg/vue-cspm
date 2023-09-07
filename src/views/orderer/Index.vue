<script>
import Index from '@/mixins/master/Index.vue';

export default {
    mixins: [ Index ],
    data() {
        return {
            title: '発注者一覧',
            url: '/api/orderer',
            router_name: 'orderer_index',
            router_create_name: 'orderer_create',
            router_edit_name: 'orderer_edit',
        }
    },
    methods: {
        set(response) {
            const list = response.data.list;
            this.masters = list.orderers.data;

            this.data.from = list.orderers.from;
            this.data.links = list.orderers.links;
            this.data.next_page_url = list.orderers.next_page_url;
            this.data.prev_page_url = list.orderers.prev_page_url;
            this.data.to = list.orderers.to;
            this.data.total = list.orderers.total;
        },
    },
};
</script>
