<template>
    <div class="w-full">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white">Other Games</h2>

            <button class="bg-[#290B47] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#4F2B76] transition-colors">
                View More Games
            </button>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
            <div v-for="(game, index) in displayGames" :key="game.id"
                class="relative rounded-2xl overflow-hidden group h-[200px] cursor-pointer" :class="getGridClass(index)"
                @click="goToGame(game.id)">

                <!-- Background Image -->
                <img :src="game.background_image" :alt="game.name"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                <!-- Content -->
                <div class="absolute bottom-0 left-0 w-full p-4 flex items-end justify-between">
                    <h3 class="text-white font-bold text-lg truncate pr-2">{{ game.name }}</h3>

                    <!-- Platform Icons (Mocked for visual match) -->
                    <div class="flex flex-col items-end gap-1 text-gray-300">
                        <img src="/icons/windows-10.svg" alt="PC" class="w-4 h-4" />
                        <img src="/icons/play-station.svg" alt="Xbox" class="w-4 h-4" />
                        <img src="/icons/xbox.svg" alt="PlayStation" class="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-2" v-if="totalPages > 1">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft class="w-5 h-5" />
            </button>

            <button v-for="page in totalPages" :key="page" @click="setPage(page)"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors"
                :class="currentPage === page ? 'bg-[#4F2B76] text-white' : 'text-gray-400 hover:text-white'">
                {{ page }}
            </button>

            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRight class="w-5 h-5" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, Monitor, Gamepad2, Cpu } from 'lucide-vue-next';
import type { Game } from '~/types/rawg';

const props = defineProps<{
    games: Game[];
}>();

const currentPage = ref(1);
const itemsPerPage = 8;

const totalPages = computed(() => Math.ceil(props.games.length / itemsPerPage));

const displayGames = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return props.games.slice(start, end);
});

const getGridClass = (index: number) => {
    // Layout pattern: 3 - 2 - 3
    // 0, 1, 2 -> col-span-2 (1/3 width)
    // 3, 4    -> col-span-3 (1/2 width)
    // 5, 6, 7 -> col-span-2 (1/3 width)

    // Note: The index here is the index within the current page (0 to 7)

    if (index >= 3 && index <= 4) {
        return 'md:col-span-3';
    }
    return 'md:col-span-2';
};

const setPage = (page: number) => {
    currentPage.value = page;
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const goToGame = (id: number) => {
    navigateTo(`/game/${id}`);
};
</script>
