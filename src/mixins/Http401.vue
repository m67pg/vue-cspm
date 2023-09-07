<script>
export default {
    methods: {
        Http401(error) {
            console.log(error.response);
            
            if (error.response && error.response.status === 401) {
                this.$router.push({ name: 'login' });
            }
        },
    },
}
</script>
