<template>
    <div v-if="games.length > 0" class="relative w-full bg-[#240243] py-12 md:py-16 my-12">
        <div class="container mx-auto px-6 md:px-12">
            <!-- Header -->
            <div class="mb-8 md:mb-12">
                <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">Upcoming Games</h2>
                <p class="text-gray-400">Be the first to know the next big thing in gaming.</p>
            </div>

            <!-- Carousel Content -->
            <div class="relative group" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">

                <div class="relative min-h-[1000px] md:min-h-[400px]">
                    <transition-group name="fade" tag="div">
                        <div v-for="(game, index) in games" :key="game.id" v-show="currentIndex === index"
                            class="absolute inset-0 w-full flex flex-col md:flex-row items-center gap-8 md:gap-12">

                            <!-- Left: Image (Rounded Card) -->
                            <div
                                class="w-full md:w-[55%] h-[500px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-black/30 bg-[#15171E]">
                                <img :src="game.background_image || '/images/placeholder-game.jpg'" :alt="game.name"
                                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            </div>

                            <!-- Right: Content -->
                            <div class="w-full md:w-[45%] flex flex-col justify-center text-left">
                                <h3 class="text-2xl md:text-4xl font-bold text-white leading-tight mb-4">
                                    {{ game.name }}
                                </h3>

                                <p class="text-gray-300 text-sm md:text-base line-clamp-3 leading-relaxed mb-6">
                                    Be ready to return to the world of {{ game.name }} in this ambitious new title.
                                    Experience a rich, living world with dynamic missions and the next evolution of
                                    open-world storytelling.
                                </p>

                                <div class="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 border-t border-white/10 pt-6">
                                    <div>
                                        <span
                                            class="block text-white text-xs font-medium uppercase tracking-wider mb-1">Release
                                            Date</span>
                                        <span class="font-bold text-white">{{ formatDate(game.released) }}</span>
                                    </div>
                                    <div>
                                        <span
                                            class="block text-white text-xs font-medium uppercase tracking-wider mb-1">Developer</span>
                                        <span class="font-bold text-white line-clamp-1">
                                            {{ game.developers?.[0]?.name || 'Unknown' }}
                                        </span>
                                    </div>
                                    <div class="col-span-2">
                                        <span
                                            class="block text-white text-xs font-medium uppercase tracking-wider mb-1">Platforms</span>
                                        <div class="flex flex-wrap gap-2 text-white font-medium text-sm">
                                            {{game.parent_platforms?.map(p => p.platform.name).join(', ') || 'TBA'}}
                                        </div>
                                    </div>
                                    <div class="col-span-2">
                                        <span
                                            class="block text-white text-xs font-medium uppercase tracking-wider mb-1">Genre</span>
                                        <div class="text-white font-medium text-sm">
                                            {{game.genres?.map(g => g.name).slice(0, 3).join(', ') || 'Action'}}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    class="w-full md:w-auto self-start flex items-center justify-center gap-2 px-8 py-3 bg-[#C29BEF] hover:bg-[#A78BFA] text-[#240243] rounded-xl font-bold transition-all shadow-lg hover:shadow-[#C29BEF]/25 hover:-translate-y-0.5">
                                    <img src="/icons/play.svg" class="w-5 h-5 fill-current" />
                                    Watch Trailer
                                </button>
                            </div>
                        </div>
                    </transition-group>
                </div>

                <!-- Navigation Controls -->
                <button @click="prevSlide"
                    class="hidden md:block absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 p-3 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all">
                    <ChevronLeft class="w-8 h-8" />
                </button>

                <button @click="nextSlide"
                    class="hidden md:block absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 p-3 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all">
                    <ChevronRight class="w-8 h-8" />
                </button>

                <!-- Indicators -->
                <div
                    class="flex justify-center gap-2 mt-8 md:mt-0 md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-12">
                    <button v-for="(g, index) in games" :key="g.id" @click="currentIndex = index"
                        class="h-1 rounded-full transition-all duration-300"
                        :class="[currentIndex === index ? 'w-12 bg-white' : 'w-8 bg-white/20 hover:bg-white/40']">
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ChevronLeft, ChevronRight, Play } from 'lucide-vue-next';
import { useRawg } from '~/composables/useRawg';
import type { Game } from '~/types/rawg';

const { getUpcomingGames } = useRawg();

const games = ref<Game[]>([]); // Initialize as empty array
const currentIndex = ref(0);
let autoplayInterval: NodeJS.Timeout | null = null;

const formatDate = (dateString?: string) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
};

const nextSlide = () => {
    if (games.value.length === 0) return;
    currentIndex.value = (currentIndex.value + 1) % games.value.length;
};

const prevSlide = () => {
    if (games.value.length === 0) return;
    currentIndex.value = (currentIndex.value - 1 + games.value.length) % games.value.length;
};

const startAutoplay = () => {
    stopAutoplay();
    if (games.value.length > 1) {
        autoplayInterval = setInterval(nextSlide, 4000);
    }
};

const stopAutoplay = () => {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
};

onMounted(async () => {
    try {
        const data = await getUpcomingGames(5);
        if (data && data.results) {
            games.value = data.results;
            startAutoplay();
        }
    } catch (e) {
        console.error("Failed to fetch upcoming games", e);
    }
});

onUnmounted(() => {
    stopAutoplay();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
