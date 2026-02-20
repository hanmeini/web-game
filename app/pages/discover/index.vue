<template>
    <div class="space-y-12 pb-20">
        <!-- Hero Section -->
        <div class="mb-8">
            <DiscoverHero :searchQuery="searchQuery" @update:searchQuery="val => searchQuery = val"
                @search="handleSearch" @toggleFilters="scrollToFilters" />
        </div>

        <!-- Categories -->
        <div class="container mx-auto px-6 md:px-10">
            <DiscoverCategories @selectGenre="handleGenreSelect" />
        </div>

        <div id="filters-section" class="scroll-mt-24 container mx-auto px-6 md:px-10">
            <!-- First Grid (Top 12 Games) -->
            <DiscoverGrid :games="firstGridGames" :loading="pending" :totalGames="totalGames" :currentPage="page"
                v-model:ordering="ordering" v-model:platform="selectedPlatform" :platforms="platforms"
                :hidePagination="true" @changePage="changePage" />
        </div>

        <!-- Upcoming Games Interstitial (Full Width) -->
        <div>
            <DiscoverUpcoming />
        </div>

        <div class="container mx-auto px-6 md:px-10">
            <!-- Second Grid (Remaining Games + Pagination) -->
            <DiscoverGrid :games="secondGridGames" :loading="pending" :totalGames="totalGames" :currentPage="page"
                v-model:ordering="ordering" v-model:platform="selectedPlatform" :platforms="platforms"
                @changePage="changePage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import DiscoverHero from '~/components/discover/DiscoverHero.vue';
import DiscoverCategories from '~/components/discover/DiscoverCategories.vue';
import DiscoverGrid from '~/components/discover/DiscoverGrid.vue';
import DiscoverUpcoming from '~/components/discover/DiscoverUpcoming.vue';
import { useRawg } from '~/composables/useRawg';
import type { Game } from '~/types/rawg';

useSeoMeta({
    title: 'Discover Games',
    description: 'Explore our vast collection of games. Filter by genre, platform, and more to find your perfect match.',
    ogTitle: 'Discover Games - GameVault',
    ogDescription: 'Explore our vast collection of games. Filter by genre, platform, and more to find your perfect match.',
})

const { getDiscoverGames, getPlatforms } = useRawg();

// State
const games = ref<Game[]>([]);
const page = ref(1);
const totalGames = ref(0);
const pending = ref(false);

// Filters
const searchQuery = ref('');
const selectedGenre = ref<string | null>(null);
const selectedPlatform = ref<number | null>(null);
const ordering = ref('-added');

// Platforms Data
const platforms = ref<{ id: number; name: string; slug: string }[]>([]);

// Split Games Logic
const firstGridGames = computed(() => games.value.slice(0, 12));
const secondGridGames = computed(() => games.value.slice(12));

// Fetch Data
const fetchGames = async () => {
    pending.value = true;
    try {
        const response = await getDiscoverGames({
            page: page.value,
            pageSize: 24, // increased to ensure enough items for split
            search: searchQuery.value,
            genres: selectedGenre.value || undefined,
            parent_platforms: selectedPlatform.value ? selectedPlatform.value.toString() : undefined,
            ordering: ordering.value,
        });

        if (response) {
            games.value = response.results;
            totalGames.value = response.count;
        }
    } catch (error) {
        console.error('Failed to fetch games:', error);
    } finally {
        pending.value = false;
        // Scroll to top of grid when page changes
        const element = document.getElementById('filters-section');
        if (element && page.value > 1) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

// Actions
const handleSearch = () => {
    page.value = 1;
    fetchGames();
};

const scrollToFilters = () => {
    const element = document.getElementById('filters-section');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const handleGenreSelect = (slug: string | null) => {
    selectedGenre.value = slug;
    page.value = 1;
    fetchGames();
};

const changePage = (newPage: number) => {
    page.value = newPage;
    fetchGames();
};

// Initial Load
onMounted(async () => {
    fetchGames();

    // Fetch platforms
    const { data: platformsData } = await getPlatforms();
    if (platformsData.value) {
        platforms.value = platformsData.value.results;
    }
});

// Watchers
watch([ordering, selectedPlatform], () => {
    fetchGames();
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
