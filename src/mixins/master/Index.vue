<script>
import AuthenticatedLayout from '@/components/AuthenticatedLayout.vue';
import CreateButton from '@/components/CreateButton.vue';
import EditLink from '@/components/EditLink.vue';
import Loader from '@/components/Loader.vue';
import MessageSuccess from '@/components/MessageSuccess.vue';
import Pagination from '@/components/Pagination.vue';
import Http401 from '@/mixins/Http401.vue';
import Http422 from '@/mixins/master/Http422.vue';
import User from '@/mixins/User.vue';
import axios from 'axios';

export default {
    components: {
        AuthenticatedLayout,
        CreateButton,
        EditLink,
        Loader,
        MessageSuccess,
        Pagination,
    },
    mixins: [
        Http401,
        Http422,
        User,
    ],
   data() {
        return {
            isLoading: false,
            page: this.$route.query.page,

            masters: Array,
            data: {
                from: Number,
                links: Array,
                next_page_url: String,
                prev_page_url: String,
                to: Number,
                total: Number,
            },
        }
    },
    mounted() {
        this.isLoading = true;

        axios
        .get(this.page ? this.url + '?page=' + this.page : this.url)
        .then((response) => {
            console.log(response.data.list);

            this.set(response);
        })
        .catch((error) => {
            console.log(error); 

            this.Http401(error);
        })
        .finally(() => {
            this.isLoading = false;
        })
    },
};
</script>

<template>
    <Loader v-if="isLoading" />
    <AuthenticatedLayout v-else>
        <div class="py-2 w-2/3">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-2 bg-white">
                        <h2 class="font-semibold text-2xl text-gray-800 leading-tight py-4">
                            {{ title }}
                        </h2>

                        <MessageSuccess :name="router_name" />

                        <div class="flex flex-col py-2">
                            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3 text-left font-medium text-gray-900 uppercase tracking-wider">名前</th>
                                                    <th scope="col" class="px-6 py-3 text-left font-medium text-gray-900 uppercase tracking-wider">並び順</th>
                                                    <th scope="col" class="px-6 py-3 text-left font-medium text-gray-900 uppercase tracking-wider">表示 / 非表示</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                <tr v-for="(master, id) in masters" :key="id">
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <div class="text-sm font-medium text-gray-900">
                                                            <EditLink :name="router_edit_name" :id="master.id" />
                                                            {{ master.name }}
                                                        </div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ master.sort_order }}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ master.display == 1 ? '表示' : '非表示' }}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td class="px-4 py-4" colspan="3">
                                                        <div class="py-1.5 float-left">
                                                            <CreateButton :name="router_create_name" />
                                                        </div>
                                                        <div>
                                                            <Pagination :data="data" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
