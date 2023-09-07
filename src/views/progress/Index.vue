<script>
import Index from '@/mixins/master/Index.vue';

export default {
    mixins: [ Index ],
    data() {
        return {
            title: '進捗一覧',
            url: '/api/progress',
            router_name: 'progress_index',
            router_create_name: 'progress_create',
            router_edit_name: 'progress_edit',
        }
    },
    methods: {
        set(response) {
            const list = response.data.list;
            this.masters = list.progresses.data;

            this.data.from = list.progresses.from;
            this.data.links = list.progresses.links;
            this.data.next_page_url = list.progresses.next_page_url;
            this.data.prev_page_url = list.progresses.prev_page_url;
            this.data.to = list.progresses.to;
            this.data.total = list.progresses.total;
        },
    },
};
</script>
