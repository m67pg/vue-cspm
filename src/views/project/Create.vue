<script>
import CreateOrEdit from '@/mixins/project/CreateOrEdit.vue';
import Http422 from '@/mixins/project/Http422.vue';
import axios from 'axios';

export default {
    mixins: [
        CreateOrEdit,
        Http422,
    ],
    data() {
        return {
            title: 'プロジェクト新規追加',
            url: '/api/project',
            isEdit: false,
            buttonTitle: '登録する',
        }
    },
    methods: {
        submit() {
            this.isLoading = true;

            this.reset();
            const request = this.getRequest();

            axios
            .post(this.url, request)
            .then((response) => {
                console.log(response);

                this.$store.commit('saveSuccess', {
                    name: 'project_index',
                    message: response.data.success
                });

                this.$router.push({ name: 'project_index' });
            })
            .catch((error) => {
                console.log(error.response);

                this.Http401(error);
                this.Http422(error);
            })
            .finally(() => {
                this.isLoading = false;
            })
        },
        getUrl() { return this.url + '/create'  },
    },
};
</script>
