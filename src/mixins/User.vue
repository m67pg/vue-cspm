<script>
import axios from 'axios';

export default {
    created() {
        axios
        .get('/api/user')
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error); 

            this.Http401(error);
        })
    },
};
</script>
