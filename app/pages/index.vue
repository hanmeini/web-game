<template>
    <div class="space-y-12 bg-[#1F1F1F] p-6 md:p-10">
        <!-- Header - Featured Section -->
        <section v-if="featuredGames.length > 0">
            <FeaturedCarousel :featuredGames="featuredGames" />
        </section>

        <!-- Trending Section -->
        <section v-if="trendingGames">
            <TrendingCarousel :games="trendingGames" />
        </section>

        <!-- Latest Reviews Section -->
        <section v-if="reviewGames.length > 0">
            <LatestReviews :games="reviewGames" />
        </section>

        <!-- Other Games Section -->
        <section v-if="otherGames.length > 0">
            <OtherGames :games="otherGames" />
        </section>

        <!-- Loading State -->
        <section v-else class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C29BEF]"></div>
        </section>
    </div>
</template>

<script setup lang="ts">
import FeaturedCarousel from '~/components/home/FeaturedCarousel.vue';
import TrendingCarousel from '~/components/home/TrendingCarousel.vue';
import LatestReviews from '~/components/home/LatestReviews.vue';
import OtherGames from '~/components/home/OtherGames.vue';

useSeoMeta({
    title: 'Home',
    description: 'Welcome to GameVault! Discover trending games, check out upcoming releases, and find your next favorite adventure.',
    ogTitle: 'Home - GameVault',
    ogDescription: 'Welcome to GameVault! Discover trending games, check out upcoming releases, and find your next favorite adventure.',
})

const { getFeaturedGames, getGames } = useRawg();
const { data: featuredGamesData } = await getFeaturedGames(5);
const featuredGames = computed(() => featuredGamesData.value?.results || []);
const { data: trendingGamesData } = await getGames();
const trendingGames = computed(() => trendingGamesData.value?.results || []);
const reviewGames = computed(() => trendingGames.value.slice(0, 4));
const otherGames = computed(() => trendingGames.value);

</script>
