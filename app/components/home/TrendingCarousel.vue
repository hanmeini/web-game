<template>
    <div class="w-full group">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white">Trending Games</h2>

            <div class="flex gap-2">
                <button @click="prev"
                    class="p-3 rounded-xl bg-[#C29BEF] text-[#15171E] hover:bg-[#A78BFA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronLeft class="w-5 h-5" />
                </button>
                <button @click="next"
                    class="p-3 rounded-xl bg-[#C29BEF] text-[#15171E] hover:bg-[#A78BFA] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronRight class="w-5 h-5" />
                </button>
            </div>
        </div>

        <!-- Viewport -->
        <div class="relative overflow-hidden w-full -mx-3 p-3">
            <!-- Track -->
            <div class="flex transition-transform duration-500 ease-in-out w-full"
                :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }">

                <div v-for="game in games" :key="game.id" class="flex-shrink-0 px-3 transition-opacity duration-300"
                    :class="[itemsPerPage === 1 ? 'w-full' : 'w-1/4']">

                    <!-- Card -->
                    <NuxtLink :to="`/game/${game.id}`">
                        <div
                            class="group/card relative h-[400px] rounded-[24px] overflow-hidden cursor-pointer border-[3px] transition-all duration-300 hover:border-[#7F56D9] border-transparent hover:shadow-[0_0_30px_-5px_rgba(127,86,217,0.5)] bg-[#15171E]">
                            <!-- Image -->
                            <img :src="game.background_image" :alt="game.name"
                                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />

                            <!-- Overlay -->
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-[#15171E] via-[#15171E]/40 to-transparent opacity-90">
                            </div>

                            <!-- Content -->
                            <div class="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full">
                                <h3
                                    class="text-2xl font-bold text-white mb-3 leading-tight line-clamp-2 drop-shadow-lg">
                                    {{ game.name }}
                                </h3>

                                <!-- Tags -->
                                <div class="flex flex-wrap gap-2 mb-4">
                                    <span v-for="genre in game.genres?.slice(0, 3)" :key="genre.id"
                                        class="px-1.5 py-1 rounded-md border border-white text-[10px] sm:text-xs font-medium text-gray-200 backdrop-blur-md bg-[#C2C2C233]/40">
                                        {{ genre.name }}
                                    </span>
                                </div>

                                <!-- Platforms -->
                                <div class="flex items-center gap-3 text-white/80">
                                    <template v-for="platform in game.parent_platforms" :key="platform.platform.id">
                                        <template v-if="platform.platform.slug === 'pc'">
                                            <img src="/icons/windows-10.svg" alt="" class="w-5 h-5" />
                                        </template>
                                        <template v-else-if="platform.platform.slug === 'playstation'">
                                            <img src="/icons/play-station.svg" class="w-5 h-5" />
                                        </template>
                                        <template v-else-if="platform.platform.slug === 'xbox'">
                                            <img src="/icons/xbox.svg" class="w-5 h-5" />
                                        </template>
                                        <template v-else-if="['ios', 'android'].includes(platform.platform.slug)">
                                            <Smartphone class="w-5 h-5" />
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Indicators -->
        <div class="flex justify-center gap-2 mt-4">
            <button v-for="idx in totalPages" :key="idx" @click="goToPage(idx - 1)"
                class="h-1 rounded-full transition-all duration-300"
                :class="isPageActive(idx - 1) ? 'w-20 bg-white' : 'w-10 bg-white/20 hover:bg-white/40'">
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-vue-next';
import type { Game } from '~/types/rawg';

const props = defineProps<{
    games: Game[];
}>();

const currentIndex = ref(0);
const itemsPerPage = ref(4);

const updateItemsPerPage = () => {
    if (window.innerWidth < 768) {
        itemsPerPage.value = 1;
    } else {
        itemsPerPage.value = 4;
    }
};

onMounted(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateItemsPerPage);
});

const maxIndex = computed(() => {
    // We scroll item by item, but stop when the last page is full
    // Max index is start of last "page" if we want to stop there?
    // Or simpler: max index = length - itemsPerPage
    return Math.max(0, props.games.length - itemsPerPage.value);
});

const totalPages = computed(() => {
    return Math.ceil(props.games.length / itemsPerPage.value);
});

const next = () => {
    if (currentIndex.value < maxIndex.value) {
        currentIndex.value += 1;
    } else {
        currentIndex.value = 0;
    }
};

const prev = () => {
    if (currentIndex.value > 0) {
        currentIndex.value -= 1;
    } else {
        currentIndex.value = maxIndex.value;
    }
};

const goToPage = (pageIndex: number) => {
    currentIndex.value = pageIndex * itemsPerPage.value;
    if (currentIndex.value > maxIndex.value) currentIndex.value = maxIndex.value;
};

// Check if a page indicator should be active
// A page is active if the current index is within that page's range
const isPageActive = (pageIndex: number) => {
    const start = pageIndex * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    // Simple check: is the start of the current view roughly aligned with this page?
    // Or just simple division
    return Math.floor(currentIndex.value / itemsPerPage.value) === pageIndex;
};
</script>
