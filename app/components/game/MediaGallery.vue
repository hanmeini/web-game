<template>
    <div class="w-full py-8">
        <!-- Mobile Header with Title and Controls -->
        <div class="flex md:hidden items-center justify-between mb-4 px-1">
            <h2 class="text-xl font-bold text-white">Gallery</h2>
            <div class="flex items-center gap-2">
                <button @click="prev" :disabled="currentIndex === 0"
                    class="bg-[#240243] p-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3b0b61] transition-colors">
                    <ChevronLeft class="w-5 h-5" />
                </button>
                <button @click="next" :disabled="isAtEnd"
                    class="bg-[#240243] p-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3b0b61] transition-colors">
                    <ChevronRight class="w-5 h-5" />
                </button>
            </div>
        </div>

        <!-- Media Grid / Carousel -->
        <div class="relative group md:pr-12"> <!-- Adjusted padding for desktop only -->

            <!-- Carousel Container -->
            <div class="overflow-hidden rounded-2xl">
                <div class="flex transition-transform duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }">

                    <div v-for="(item, index) in allMedia" :key="item.id"
                        class="flex-shrink-0 w-full md:w-1/3 px-2 aspect-video relative cursor-pointer group/item">

                        <div
                            class="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 group-hover/item:border-[#C29BEF] transition-colors">
                            <img :src="item.image" :alt="item.name"
                                class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" />

                            <!-- Overlay -->
                            <div class="absolute inset-0 bg-black/20 group-hover/item:bg-black/40 transition-colors">
                            </div>

                            <!-- Play Button for Videos -->
                            <div v-if="item.type === 'video'" class="absolute inset-0 flex items-center justify-center">
                                <div
                                    class="bg-white/20 backdrop-blur-sm p-3 rounded-full group-hover/item:bg-white/30 transition-all group-hover/item:scale-110">
                                    <Play class="w-8 h-8 text-white fill-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Navigation Button (Next) -->
            <button @click="next" :disabled="isAtEnd"
                class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#C29BEF] text-[#1F1F1F] p-3 rounded-xl hover:bg-[#A78BFA] transition-all shadow-lg opacity-100 disabled:opacity-0 disabled:cursor-not-allowed translate-x-0">
                <ChevronRight class="w-6 h-6" />
            </button>
        </div>

        <!-- Pagination Indicators -->
        <div class="flex justify-center gap-2 mt-6">
            <button v-for="i in Math.ceil(allMedia.length / itemsPerView)" :key="i" @click="goToSlide(i - 1)"
                class="h-1 rounded-full transition-all duration-300"
                :class="currentSlide === (i - 1) ? 'w-20 bg-white' : 'w-10 bg-white/20 hover:bg-white/40'">
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Play, ChevronRight, ChevronLeft } from 'lucide-vue-next';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
    gameId: number;
}>();

const { getGameScreenshots, getGameTrailers } = useRawg();

// Combined media type
interface MediaItem {
    id: number | string;
    type: 'video' | 'image';
    image: string;
    videoUrl?: string; // For actual playback logic later
    name?: string;
}


const itemsPerView = ref(3); // Default to desktop

const updateItemsPerView = () => {
    if (typeof window !== 'undefined') {
        itemsPerView.value = window.innerWidth < 768 ? 1 : 3;
    }
};

onMounted(() => {
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
});

onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateItemsPerView);
    }
});

const currentIndex = ref(0);

// Use async data fetching to handle the promises correctly
const { data: screenshots } = await getGameScreenshots(props.gameId);
const { data: trailers } = await getGameTrailers(props.gameId);

const allMedia = computed(() => {
    const items: MediaItem[] = [];

    // Add Trailers first
    if (trailers.value?.results) {
        trailers.value.results.forEach((trailer: any) => {
            items.push({
                id: `trailer-${trailer.id}`,
                type: 'video',
                image: trailer.preview,
                videoUrl: trailer.data?.max,
                name: trailer.name || 'Trailer'
            });
        });
    }

    // Add Screenshots
    if (screenshots.value?.results) {
        screenshots.value.results.forEach((screenshot: any) => {
            items.push({
                id: `shot-${screenshot.id}`,
                type: 'image',
                image: screenshot.image,
                name: 'Screenshot'
            });
        });
    }

    return items;
});

const isAtEnd = computed(() => {
    return currentIndex.value >= allMedia.value.length - itemsPerView.value;
});

const currentSlide = computed(() => {
    return Math.floor(currentIndex.value / itemsPerView.value);
});

const next = () => {
    if (currentIndex.value + itemsPerView.value < allMedia.value.length) {
        currentIndex.value += 1;
    } else {
        currentIndex.value = 0;
    }
};

const prev = () => {
    if (currentIndex.value > 0) {
        currentIndex.value -= 1;
    }
};

const goToSlide = (slideIndex: number) => {
    currentIndex.value = slideIndex * itemsPerView.value;
};

</script>
