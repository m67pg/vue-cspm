<script>
import axios from 'axios';

export default {
    props: {
        data: Object,
    },
    methods: {
        isPrevLabel: function(label) { return label === '&laquo; Previous' || label === '&laquo; 前へ'; },
        isNextLabel: function(label) { return label === 'Next &raquo;' || label === '次へ &raquo;'; },
        linkUrl: function(url) { return url.replace(axios.defaults.baseURL + '/api', '').replace('/index', ''); },
    } 
};
</script>

<template>
    <nav v-show="data.links.length > 3" role="navigation" aria-label="Pagination Navigation" class="flex items-center justify-between">
        <div class="flex justify-between flex-1 sm:hidden">
            <span v-if="data.prev_page_url === null" class="relative inline-flex items-center px-4 py-2 text-sm font-normal text-gray-500 bg-white border border-gray-300 cursor-default leading-5 rounded-md">≪ 前へ</span>
            <a v-else :href="data.prev_page_url" class="relative inline-flex items-center px-4 py-2 text-sm font-normal text-gray-700 bg-white border border-gray-300 leading-5 rounded-md hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">≪ 前へ</a>

            <span v-if="data.next_page_url === null" class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-normal text-gray-500 bg-white border border-gray-300 cursor-default leading-5 rounded-md">次へ ≫</span>
            <a v-else :href="data.next_page_url" class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-normal text-gray-700 bg-white border border-gray-300 leading-5 rounded-md hover:text-gray-500 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">次へ ≫</a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700 leading-5">
                    <span class="font-normal">{{ data.total }}</span><span class="text-sm"> 件中 </span>
                    <span class="font-normal">{{ data.from }}</span><span class="text-sm"> ～ </span>
                    <span class="font-normal">{{ data.to }}</span><span class="text-sm"> 件の結果を表示 </span>
                </p>
            </div>
            <div>
                <span class="relative z-0 inline-flex shadow-sm rounded-md">
                    <div v-for="(link, p) in data.links" :key="p">
                        <span v-if="isPrevLabel(link.label) && link.url === null" aria-disabled="true" aria-label="≪ 前へ">
                            <span class="relative inline-flex items-center px-2 py-2 text-sm font-normal text-gray-500 bg-white border border-gray-300 cursor-default rounded-l-md leading-5" aria-hidden="true">
                                <svg class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd">
                                    </path>
                                </svg>
                            </span>
                        </span>
                        <a v-else-if="isPrevLabel(link.label) && link.url !== null" :href="linkUrl(link.url)" rel="prev" class="relative inline-flex items-center px-2 py-2 text-sm font-normal text-gray-500 bg-white border border-gray-300 rounded-l-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="≪ 前へ">
                            <svg class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd">
                                </path>
                            </svg>
                        </a>

                        <span v-if="!isPrevLabel(link.label) && !isNextLabel(link.label) && link.active" aria-current="page">
                            <span class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-normal text-gray-500 bg-white border border-gray-300 cursor-default leading-5">{{ link.label }}</span>
                        </span>
                        <a v-else-if="!isPrevLabel(link.label) && !isNextLabel(link.label) && !link.active" :href="linkUrl(link.url)" class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-normal text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150" aria-label="Go to page {{ link.label }}">{{ link.label }}</a>

                        <span v-if="isNextLabel(link.label) && link.url === null" aria-disabled="true" aria-label="次へ ≫">
                            <span class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-normal text-gray-500 bg-white border border-gray-300 cursor-default rounded-r-md leading-5" aria-hidden="true">
                                <svg class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd">
                                    </path>
                                </svg>
                            </span>
                        </span>
                        <a v-else-if="isNextLabel(link.label) && link.url !== null" :href="linkUrl(link.url)" rel="next" class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-normal text-gray-500 bg-white border border-gray-300 rounded-r-md leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="次へ ≫">
                            <svg class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd">
                                </path>
                            </svg>
                        </a>
                    </div>
                </span>
            </div>
        </div>
    </nav>
</template>
