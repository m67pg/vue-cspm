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
            title: 'プロジェクト編集',
            url: '/api/project/',
            isEdit: true,
            buttonTitle: '編集する',
        }
    },
    methods: {
        submit() {
            this.isLoading = true;

            this.reset();
            const request = this.getRequest();
            request['display'] = this.form.display;

            axios
            .put(this.url + this.id(), request)
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
        getUrl() { return this.url + this.id() + '/edit'  },
        id() { return this.$route.params && this.$route.params['id'] ? this.$route.params['id'] : ''; },
    },
};
</script>
