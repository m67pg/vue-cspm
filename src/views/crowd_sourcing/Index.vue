<script>
import Index from '@/mixins/master/Index.vue';

export default {
    mixins: [ Index ],
    data() {
        return {
            title: 'クラウドソーシング一覧',
            url: '/api/crowd_sourcing',
            router_name: 'crowd_sourcing_index',
            router_create_name: 'crowd_sourcing_create',
            router_edit_name: 'crowd_sourcing_edit',
        }
    },
    methods: {
        set(response) {
            const list = response.data.list;
            this.masters = list.crowd_sourcings.data;

            this.data.from = list.crowd_sourcings.from;
            this.data.links = list.crowd_sourcings.links;
            this.data.next_page_url = list.crowd_sourcings.next_page_url;
            this.data.prev_page_url = list.crowd_sourcings.prev_page_url;
            this.data.to = list.crowd_sourcings.to;
            this.data.total = list.crowd_sourcings.total;
        },
    },
};
</script>
