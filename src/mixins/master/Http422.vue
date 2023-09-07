<script>
export default {
    methods: {
        Http422(error) {
            console.log(error.response);
            
            if (error.response && error.response.status === 422) {
                if (error.response.data.errors.name && error.response.data.errors.name.length > 0) {
                    this.form.errors.name = error.response.data.errors.name[0];
                }
                if (error.response.data.errors.sort_order && error.response.data.errors.sort_order.length > 0) {
                    this.form.errors.sort_order = error.response.data.errors.sort_order[0];
                }
            }
        },
    },
}
</script>
