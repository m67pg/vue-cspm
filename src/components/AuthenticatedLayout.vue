<script>
import Loader from '@/components/Loader.vue';
import NaviLink from '@/components/NaviLink.vue';
import axios from 'axios';

export default {
    components: {
        Loader,
        NaviLink,
    },
    data() {
        return {
            isLoading: false,
        }
    },
    methods: {
        logout() {
            this.isLoading = true;

            axios
            .post('/api/logout')
            .then((response) => {
                console.log(response.data.message);
                
                this.$router.push({ name: 'login' });
            })
            .finally(() => {
                this.isLoading = false;
            })
        },
    },
};
</script>

<template>
    <Loader v-if="isLoading" />
    <div class="flex" v-else>
        <div class="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r">
            <h2 class="text-2xl font-semibold text-center text-blue-800">CSプロジェクト管理</h2>

            <div class="flex flex-col justify-between mt-[4px]">
                <aside>
                    <ul>
                        <li>
                            <NaviLink
                                :isPage="$route.path === '/' || $route.path.startsWith('/project')"
                                name="home"
                                iclass="far fa-comment-alt"
                            >
                                プロジェクト
                            </NaviLink>
                        </li>
                        <li>
                            <NaviLink
                                :isPage="$route.path.startsWith('/crowd_sourcing')"
                                name="crowd_sourcing_index"
                                iclass="far fa-copyright"
                            >
                                クラウドソーシング
                            </NaviLink>
                        </li>
                        <li>
                            <NaviLink
                                :isPage="$route.path.startsWith('/orderer')"
                                name="orderer_index"
                                iclass="far fa-bell"
                            >
                                発注者
                            </NaviLink>
                        </li>
                        <li>
                            <NaviLink
                                :isPage="$route.path.startsWith('/progress')"
                                name="progress_index"
                                iclass="far fa-play-circle"
                            >
                                進捗
                            </NaviLink>
                        </li>
                        <li>
                            <form @submit.prevent="logout()">
                                <button
                                    class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
                                >
                                    <i class="fas fa-sign-out-alt"></i>
                                    <span class="mx-4 font-medium">ログアウト</span>
                                </button>
                            </form>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>

        <div class="w-full h-full p-4 m-4 overflow-y-auto">
            <div class="flex items-center justify-center p-2 border-4 border-dotted">
                <slot />
            </div>
        </div>
    </div>
</template>
