<script>
export default {
    methods: {
        Http422(error) {
            console.log(error.response);
            
            if (error.response && error.response.status === 422) {
                const errors = error.response.data.errors;
                if (errors.name && errors.name.length > 0) {
                    this.form.errors.name = errors.name[0];
                }
                if (errors.message && errors.message.length > 0) {
                    this.form.errors.message = errors.message[0];
                }
                if (errors.sort_order && errors.sort_order.length > 0) {
                    this.form.errors.sort_order = errors.sort_order[0];
                }
                if (errors.display && errors.display.length > 0) {
                    this.form.errors.display = errors.display[0];
                }
            }
        },
    },
}
</script>
