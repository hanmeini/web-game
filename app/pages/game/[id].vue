<template>
    <div v-if="game" class="min-h-screen bg-[#1F1F1F] text-white font-body relative">
        <!-- Hero Section -->
        <GameHeroSection :game="game" />

        <!-- Media Gallery -->
        <div class="px-6 -mt-20 relative z-20 pb-12">
            <GameMediaGallery :gameId="game.id" />
        </div>

        <!-- Info Section -->
        <div class="container mx-auto px-6 pb-20 relative z-10">
            <GameInfoSection :game="game" />
        </div>

        <!-- More Like This -->
        <div class="container mx-auto px-6 pb-20 relative z-10">
            <GameMoreLikeThis :gameId="game.id" :genres="game.genres?.map(g => g.slug)"
                :tags="game.tags?.map(t => t.slug)" />
        </div>

        <!-- Community Reviews -->
        <div class="container mx-auto px-6 pb-20 relative z-10">
            <GameCommunityReviews :gameName="game.name" :gameImage="game.background_image" />
        </div>

    </div>

    <!-- Loading State -->
    <div v-else class="flex justify-center items-center h-screen bg-[#1F1F1F]">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#C29BEF]"></div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;
const { getGameDetails } = useRawg();

// Fetch game details
const { data: game, error } = await getGameDetails(parseInt(id));

if (error.value) {
    console.error('Error fetching game details:', error.value);
}
</script>
