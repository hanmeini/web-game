<template>
    <div class="w-full">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white">Search by Categories</h2>

            <div class="flex gap-2">
                <button @click="prev"
                    class="w-10 h-10 rounded-xl bg-[#240243] hover:bg-[#3b0b61] text-[#C29BEF] flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronLeft class="w-5 h-5" />
                </button>
                <button @click="next"
                    class="w-10 h-10 rounded-xl bg-[#C29BEF] hover:bg-[#A78BFA] text-[#240243] flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronRight class="w-5 h-5" />
                </button>
            </div>
        </div>

        <!-- Carousel -->
        <div class="relative overflow-hidden w-full">
            <div class="flex transition-transform duration-500 ease-in-out w-full"
                :style="{ transform: `translateX(-${currentIndex * 100}%)` }">

                <!-- Iterate over chunks (pages) -->
                <div v-for="(page, pageIndex) in chunkedCategories" :key="pageIndex"
                    class="w-full flex-shrink-0 flex flex-col md:flex-row gap-4 px-1">

                    <!-- Items in the page -->
                    <div v-for="category in page" :key="category.slug" class="w-full md:w-1/3 flex-shrink-0">

                        <div @click="$emit('select', category.slug)"
                            class="group relative h-[120px] md:h-[220px] rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-[#C29BEF] transition-all duration-300 hover:shadow-lg hover:shadow-[#C29BEF]/20">

                            <!-- Background Image -->
                            <img :src="category.image" :alt="category.name"
                                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                            <!-- Overlay -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                            </div>

                            <!-- Content -->
                            <div class="absolute bottom-0 left-0 w-full p-5">
                                <h3 class="text-xl font-bold text-white group-hover:text-[#C29BEF] transition-colors">{{
                                    category.name }}</h3>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Pagination Indicators -->
        <div class="flex justify-center gap-2 mt-6">
            <button v-for="(_, index) in chunkedCategories" :key="index" @click="goToPage(index)"
                class="h-1 rounded-full transition-all duration-300"
                :class="currentIndex === index ? 'w-20 bg-white' : 'w-10 bg-white/20 hover:bg-white/40'">
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useRawg } from '~/composables/useRawg';

defineEmits<{
    (e: 'select', slug: string): void;
}>();

const { getGenres } = useRawg();

// State
const categories = ref<{ id: number; name: string; slug: string; image: string }[]>([]);
const currentIndex = ref(0);
const itemsPerPage = ref(3); // 3 items per slide (vertical on mobile, horizontal on desktop)

// Fetch Genres
onMounted(async () => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    try {
        const data = await getGenres();
        if (data && data.results) {
            categories.value = data.results.map(g => ({
                id: g.id,
                name: g.name,
                slug: g.slug,
                image: g.image_background
            }));
        }
    } catch (error) {
        console.error('Failed to fetch genres:', error);
    }
});

onUnmounted(() => {
    window.removeEventListener('resize', updateItemsPerPage);
});

const updateItemsPerPage = () => {
    // We always want 3 items per slide essentially, but layout changes.
    // If we wanted 2 columns on tablet, we'd change this.
    // For now, let's keep it 3 to match mobile 3-stack and desktop 3-col.
    if (window.innerWidth < 1024) itemsPerPage.value = 3;
    else itemsPerPage.value = 3;
};

// Start chunking logic
const chunkedCategories = computed(() => {
    const chunks = [];
    for (let i = 0; i < categories.value.length; i += itemsPerPage.value) {
        chunks.push(categories.value.slice(i, i + itemsPerPage.value));
    }
    return chunks;
});

const maxIndex = computed(() => Math.max(0, chunkedCategories.value.length - 1));

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
    currentIndex.value = pageIndex;
};
</script>
