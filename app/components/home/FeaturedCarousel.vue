<template>
    <div class="relative w-full rounded-3xl overflow-hidden h-[400px] md:h-[500px] border border-white/10 group bg-[#15171E]"
        @mouseenter="stopAutoSlide" @mouseleave="startAutoSlide">

        <Transition name="fade" mode="out-in">
            <div :key="currentIndex" class="absolute inset-0 w-full h-full">
                <!-- Background Image -->
                <img :src="currentGame?.background_image" :alt="currentGame?.name"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />

                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/40 to-transparent"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-[#0F1115]/80 via-transparent to-transparent"></div>

                <!-- Content -->
                <div class="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 flex flex-col justify-end h-full">
                    <div class="flex flex-col gap-2 mb-4">
                        <h2 class="text-4xl md:text-6xl font-gaming font-bold text-white drop-shadow-lg line-clamp-1">
                            {{ currentGame?.name }}
                        </h2>

                        <p class="text-gray-300 max-w-xl text-lg line-clamp-2">
                            {{ currentGame?.description_raw || (currentGame && descriptions[currentGame.id]) }}
                        </p>
                    </div>

                    <div class="flex flex-col md:flex-row items-end justify-between w-full gap-4">
                        <!-- Tags -->
                        <div class="flex flex-wrap gap-2">
                            <span v-for="genre in currentGame?.genres?.slice(0, 4)" :key="genre.id"
                                class="px-4 py-2 rounded-lg bg-[#C2C2C233]/40 border border-white text-xs font-medium text-gray-200">
                                {{ genre.name }}
                            </span>
                        </div>

                        <!-- Buttons -->
                        <div class="flex items-center gap-4">
                            <button
                                class="flex items-center gap-2 px-6 py-3 bg-[#C29BEF] text-[#293047] rounded-xl font-bold hover:bg-[#A78BFA] transition-colors">
                                <Plus class="w-5 h-5" />
                                Add to Wishlist
                            </button>
                            <button
                                class="px-6 py-3 bg-[#C29BEF] text-[#293047] rounded-xl font-medium hover:bg-[#A78BFA] transition-colors">
                                View Detail
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Carousel Indicators -->
        <div class="absolute bottom-8 right-1/2 translate-x-1/2 flex gap-2 z-20">
            <span v-for="(_, index) in featuredGames" :key="index" @click="setSlide(index)"
                class="h-1 rounded-full cursor-pointer transition-all duration-300 ease-in-out"
                :class="currentIndex === index ? 'w-20 bg-white' : 'w-10 bg-white/30 hover:bg-white/50'">
            </span>
        </div>

        <!-- Navigation Arrows -->
        <button @click="prevSlide"
            class="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white/70 hover:text-white hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100 duration-300">
            <ChevronLeft class="w-6 h-6" />
        </button>
        <button @click="nextSlide"
            class="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white/70 hover:text-white hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100 duration-300">
            <ChevronRight class="w-6 h-6" />
        </button>
    </div>

    <!-- Style for Fade Transition -->
</template>

<script setup lang="ts">
import { Plus, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import type { Game } from '~/types/rawg';

const props = defineProps<{
    featuredGames: Game[];
}>();

const currentIndex = ref(0);
let intervalId: NodeJS.Timeout | null = null;

// Ensure we have data before trying to access it
const currentGame = computed(() => props.featuredGames?.[currentIndex.value]);

const nextSlide = () => {
    if (props.featuredGames?.length) {
        currentIndex.value = (currentIndex.value + 1) % props.featuredGames.length;
    }
};

const prevSlide = () => {
    if (props.featuredGames?.length) {
        currentIndex.value = (currentIndex.value - 1 + props.featuredGames.length) % props.featuredGames.length;
    }
};

const { getGameDetails } = useRawg();
const descriptions = ref<Record<number, string>>({});

watch(() => currentGame.value, async (newGame) => {
    if (newGame && !newGame.description_raw && !descriptions.value[newGame.id]) {
        try {
            const { data } = await getGameDetails(newGame.id);
            if (data.value?.description_raw) {
                descriptions.value[newGame.id] = data.value.description_raw;
            }
        } catch (error) {
            console.error('Failed to fetch game details:', error);
        }
    }
}, { immediate: true });

const setSlide = (index: number) => {
    currentIndex.value = index;
    resetInterval();
};

const startAutoSlide = () => {
    intervalId = setInterval(nextSlide, 5000); // Auto slide every 5 seconds
};

const stopAutoSlide = () => {
    if (intervalId) clearInterval(intervalId);
};

const resetInterval = () => {
    stopAutoSlide();
    startAutoSlide();
};

onMounted(() => {
    startAutoSlide();
});

onUnmounted(() => {
    stopAutoSlide();
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
