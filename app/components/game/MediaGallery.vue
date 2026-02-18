<template>
    <div class="w-full py-8">
        <!-- Media Grid / Carousel -->
        <div class="relative group pr-12"> <!-- Added padding for arrows -->

            <!-- Carousel Container -->
            <div class="overflow-hidden rounded-2xl">
                <div class="flex transition-transform duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }">

                    <div v-for="(item, index) in allMedia" :key="item.id"
                        class="flex-shrink-0 w-1/3 px-2 aspect-video relative cursor-pointer group/item">

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
                class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#C29BEF] text-[#1F1F1F] p-3 rounded-xl hover:bg-[#A78BFA] transition-all shadow-lg opacity-100 disabled:opacity-0 disabled:cursor-not-allowed translate-x-0">
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
import { Play, ChevronRight } from 'lucide-vue-next';

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

const itemsPerView = 3;
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
    return currentIndex.value >= allMedia.value.length - itemsPerView;
});

const currentSlide = computed(() => {
    // Current slide index based on chunks of itemsPerView
    // Simple logic: we are moving one by one via index, but dots represent pages?
    // Let's implement dots as pages for simplicity.
    return Math.floor(currentIndex.value / itemsPerView);
});

const next = () => {
    if (currentIndex.value + itemsPerView < allMedia.value.length) {
        currentIndex.value += 1; // Move one item at a time for smooth scrolling
    } else {
        currentIndex.value = 0; // Loop back? Optional. Let's just stop at end or loop. Instructions didn't specify. Assuming typical carousel loop or stop.
        // Let's stop at end based on the disabled button, but if user clicks.. wait, disabled logic handles it.
    }
};

const prev = () => {
    if (currentIndex.value > 0) {
        currentIndex.value -= 1;
    }
};

const goToSlide = (slideIndex: number) => {
    currentIndex.value = slideIndex * itemsPerView;
};

</script>
