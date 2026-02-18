<template>
    <div class="w-full">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white">Latest Reviews</h2>

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

        <!-- Carousel -->
        <div class="relative w-full overflow-hidden">
            <div class="flex transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${currentIndex * 100}%)` }">

                <div v-for="(review, index) in reviews" :key="index" class="w-full flex-shrink-0">
                    <div
                        class="bg-background-surface-neutral rounded-[32px] p-4 md:p-6 flex flex-col md:flex-row items-center gap-8 border border-white/5">
                        <!-- Game Image -->
                        <div class="w-full md:w-3/5 h-[300px] md:h-[400px] rounded-2xl overflow-hidden relative group">
                            <img :src="review.game.background_image" :alt="review.game.name"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <!-- Optional Overlay for better text contrast if needed, mostly for aesthetics here -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        <!-- Review Content -->
                        <div class="w-full md:w-2/5 flex flex-col justify-center">

                            <!-- Rating Badge -->
                            <div class="flex items-center gap-3 mb-6">
                                <div class="p-3 bg-[#290B47] rounded-xl text-white">
                                    <ThumbsUp class="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold text-white">Recommended</h3>
                                </div>
                            </div>

                            <!-- Review Text -->
                            <p class="text-white text-lg leading-relaxed mb-8 line-clamp-4">
                                "{{ review.content }}"
                            </p>

                            <!-- User Info -->
                            <div class="flex items-center gap-4 mb-8">
                                <img :src="review.user.avatar" :alt="review.user.name"
                                    class="w-12 h-12 rounded-sm object-cover" />
                                <div>
                                    <h4 class="text-white">{{ review.user.name }}</h4>
                                    <p class="text-white text-sm">{{ review.helpful_count }} people found this
                                        helpful</p>
                                </div>
                            </div>

                            <!-- CTA -->
                            <div class="mt-auto flex justify-center">
                                <button
                                    class="text-[#C29BEF] hover:text-[#A78BFA] text-lg transition-colors">
                                    View Detail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Indicators -->
        <div class="flex justify-center gap-2 mt-6">
            <button v-for="(_, index) in reviews" :key="index" @click="currentIndex = index"
                class="h-1 rounded-full transition-all duration-300"
                :class="currentIndex === index ? 'w-20 bg-white' : 'w-10 bg-white/20 hover:bg-white/40'">
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, ThumbsUp } from 'lucide-vue-next';
import type { Game } from '~/types/rawg';

// Creating a defined interface for our enhanced review object
interface Review {
    game: Game;
    content: string;
    user: {
        name: string;
        avatar: string;
    };
    helpful_count: number;
}

const props = defineProps<{
    games: Game[];
}>();

const currentIndex = ref(0);

// Mocking review data based on passed games
const reviews = computed<Review[]>(() => {
    // Basic mock content to cycle through
    const mockContent = [
        "Crash-landed on an alien ocean planet, Subnautica challenges players to survive in a vast, mysterious underwater world. Explore vibrant coral reefs, treacherous deep-sea trenches, and discover fascinating (and sometimes terrifying) sea creatures.",
        "An absolute masterpiece of storytelling and gameplay. The world feels alive, the characters are deep and memorable, and the combat is incredibly satisfying. A must-play for any RPG fan.",
        "Fast-paced, chaotic, and incredibly fun. The movement mechanics are smooth, and the variety of weapons keeps every match feeling fresh. Best played with friends for maximum enjoyment!",
        "Visually stunning with a soundtrack to match. The atmosphere this game creates is unmatched. While the difficulty curve is steep, the sense of accomplishment is well worth the struggle."
    ];

    const mockUsers = [
        { name: "Stefan Arnold", avatar: "https://i.pravatar.cc/150?u=stefan" },
        { name: "Sarah Connor", avatar: "https://i.pravatar.cc/150?u=sarah" },
        { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
        { name: "Alice Smith", avatar: "https://i.pravatar.cc/150?u=alice" }
    ];

    return props.games.slice(0, 4).map((game, index) => ({
        game: game,
        content: mockContent[index % mockContent.length] || "No review content available.",
        user: mockUsers[index % mockUsers.length] || { name: "Anonymous", avatar: "" },
        helpful_count: Math.floor(Math.random() * 50) + 10
    }));
});

const next = () => {
    currentIndex.value = (currentIndex.value + 1) % reviews.value.length;
};

const prev = () => {
    currentIndex.value = (currentIndex.value - 1 + reviews.value.length) % reviews.value.length;
};
</script>
