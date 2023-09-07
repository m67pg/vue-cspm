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
                if (errors.crowd_sourcing_id && errors.crowd_sourcing_id.length > 0) {
                    this.form.errors.crowd_sourcing_id = errors.crowd_sourcing_id[0];
                }
                if (errors.orderer_id && errors.orderer_id.length > 0) {
                    this.form.errors.orderer_id = errors.orderer_id[0];
                }
                if (errors.progress_id && errors.progress_id.length > 0) {
                    this.form.errors.progress_id = errors.progress_id[0];
                }
                if (errors.publication_on && errors.publication_on.length > 0) {
                    this.form.errors.publication_on = errors.publication_on[0];
                }
                if (errors.application_deadline_on && errors.application_deadline_on.length > 0) {
                    this.form.errors.application_deadline_on = errors.application_deadline_on[0];
                }
                if (errors.contract_amount_excluding_tax && errors.contract_amount_excluding_tax.length > 0) {
                    this.form.errors.contract_amount_excluding_tax = errors.contract_amount_excluding_tax[0];
                }
                if (errors.display && errors.display.length > 0) {
                    this.form.errors.display = errors.display[0];
                }
            }
        },
    },
}
</script>
