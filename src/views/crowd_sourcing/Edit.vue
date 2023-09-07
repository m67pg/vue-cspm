<script>
import Edit from '@/mixins/master/CreateOrEdit.vue';

export default {
    mixins: [ Edit ],
    data() {
        return {
            title: 'クラウドソーシング編集',
            url: '/api/crowd_sourcing/',
            router_name: 'crowd_sourcing_index',
            name_class: 'block mt-1 w-56',
             isEdit: true,
             buttonTitle: '編集する',
       }
    },
    methods: {
        setResponse(response) {
            this.setForm(response.data.data.crowd_sourcing);
        },
    },
};
</script>
