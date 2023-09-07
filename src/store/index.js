import { createStore } from 'vuex'
import createdPersistedState from 'vuex-persistedstate'

export default createStore({
    plugins: [createdPersistedState()],
    state: {
        form: {
            keyword: null,
            crowd_sourcing_id: null,
            orderer_id: null,
            progress_id: null,
        },
        button: null,
        success: {
            name: null,
            message: null,
        },
        page: null,
    },
    mutations: {
        saveForm(state, form) {
            state.form.keyword = form.keyword;
            state.form.crowd_sourcing_id = form.crowd_sourcing_id;
            state.form.orderer_id = form.orderer_id;
            state.form.progress_id = form.progress_id;
        },
        saveButton(state, button) {
            state.form.button = button;
        },
        saveSuccess(state, success) {
            state.success.name = success.name;
            state.success.message = success.message;
        },
        resetSuccess(state) {
            state.success.name = null;
            state.success.message = null;
        },
        savePage(state, page) {
            state.page = page;
        },
    }
})