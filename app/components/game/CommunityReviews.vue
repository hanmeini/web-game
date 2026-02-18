<template>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 text-white relative">
        <!-- Left Column: Reviews -->
        <div class="md:col-span-8">
            <div class="mb-8">
                <h3 class="text-xl font-bold text-white mb-6">Community Reviews</h3>

                <div class="flex items-center gap-4">
                    <span class="text-white text-sm whitespace-nowrap">In the last 1 year</span>
                    <div class="h-px bg-white flex-1"></div>
                    <button
                        class="flex items-center gap-2 bg-[#2D1B69] hover:bg-[#3D2B79] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <Filter class="w-4 h-4" />
                        Filter By
                    </button>
                </div>
            </div>

            <div class="space-y-6">
                <div v-for="review in reviews" :key="review.id"
                    class="bg-[#15171E] p-6 rounded-2xl border border-white/5 hover:border-[#C29BEF]/30 transition-colors">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center gap-3">
                            <div :class="[
                                'w-10 h-10 rounded-md flex items-center justify-center',
                                review.isRecommended ? 'bg-[#290B47] text-white' : 'bg-[#7F1D1D] text-white'
                            ]">
                                <ThumbsUp v-if="review.isRecommended" class="w-5 h-5" />
                                <ThumbsDown v-else class="w-5 h-5" />
                            </div>
                            <div>
                                <h4 class="font-bold text-white">{{ review.isRecommended ? 'Recommended' :
                                    'NotRecommended' }}</h4>
                                <p class="text-white text-xs">Posted on {{ formatDate(review.date) }}</p>
                            </div>
                        </div>
                        <button class="text-white hover:text-gray-300">
                            <MoreVertical class="w-5 h-5" />
                        </button>
                    </div>

                    <p class="text-white text-sm leading-relaxed mb-6">{{ review.content }}</p>

                    <div v-if="review.content.length > 200" class="mb-4">
                        <button class="text-[#C29BEF] text-sm hover:underline flex items-center gap-1">
                            Show More
                            <ChevronDown class="w-4 h-4" />
                        </button>
                    </div>

                    <div class="flex items-center justify-between pt-4 border-t border-white/5">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden">
                                <img v-if="review.userAvatar" :src="review.userAvatar" :alt="review.userName"
                                    class="w-full h-full object-cover" />
                                <User v-else class="w-4 h-4 text-white mx-auto mt-2" />
                            </div>
                            <div>
                                <p class="text-white text-sm font-medium">{{ review.userName }}</p>
                                <p class="text-white text-xs">{{ review.helpfulCount }} people found this helpful</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-4">
                            <span class="text-white text-xs hidden sm:block">Was this review helpful?</span>
                            <div class="flex gap-2">
                                <button
                                    class="p-2 rounded-lg bg-[#C29BEF] hover:bg-[#2D1B69] text-black transition-colors">
                                    <ThumbsUp class="w-4 h-4" />
                                </button>
                                <button
                                    class="p-2 rounded-lg bg-[#C29BEF] hover:bg-[#2D1B69] text-black transition-colors">
                                    <ThumbsDown class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 text-center">
                <button class="text-[#C29BEF] hover:text-white transition-colors text-sm font-medium">
                    Browse all {{ totalReviews }} reviews
                </button>
            </div>
        </div>

        <!-- Right Column: Sidebar -->
        <div class="md:col-span-4 space-y-6">
            <!-- Add Review -->
            <div class="bg-[#15171E] p-6 rounded-2xl border border-white/5">
                <h3 class="font-bold text-lg text-white mb-2">Add Your Review</h3>
                <p class="text-white text-sm mb-6">Share your experience about this game.</p>
                <button @click="showModal = true"
                    class="w-full bg-[#2D1B69] hover:bg-[#3D2B79] text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2 group">
                    <Plus class="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Add Review
                </button>
            </div>

            <!-- Review Summary -->
            <div class="bg-[#15171E] p-6 rounded-2xl border border-white/5">
                <h3 class="font-bold text-lg text-white mb-4">Review Summary</h3>
                <p class="text-white text-sm mb-6">Total reviews received in the last year.</p>

                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <div class="w-12 h-12 rounded-xl bg-[#290B47] flex items-center justify-center text-white">
                            <ThumbsUp class="w-6 h-6" />
                        </div>
                        <p class="text-2xl font-bold text-white">187k</p>
                        <p class="text-white text-xs">Recommend this game</p>
                    </div>
                    <div class="space-y-2">
                        <div class="w-12 h-12 rounded-xl bg-[#7F1D1D] flex items-center justify-center text-white">
                            <ThumbsDown class="w-6 h-6" />
                        </div>
                        <p class="text-2xl font-bold text-white">16k</p>
                        <p class="text-white text-xs">Not recommend this game</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Write a Review Modal -->
        <Teleport to="body">
            <Transition name="modal">
                <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    @click.self="showModal = false">
                    <!-- Backdrop -->
                    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

                    <!-- Modal Card -->
                    <div
                        class="relative w-full max-w-md bg-[#0A0A0A] backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                        <!-- Game Banner -->
                        <div class="relative h-44 overflow-hidden">
                            <img v-if="gameImage" :src="gameImage" :alt="gameName" class="w-full h-full object-cover" />
                            <div v-else class="w-full h-full bg-gradient-to-br from-[#2D1B69] to-[#15171E]"></div>

                            <!-- Close Button -->
                            <button @click="showModal = false"
                                class="absolute top-3 right-3 w-9 h-9 rounded-lg bg-[#2D1B69] hover:bg-[#3D2B79] text-white flex items-center justify-center transition-colors">
                                <X class="w-5 h-5" />
                            </button>
                        </div>

                        <!-- Modal Body -->
                        <div class="px-6 py-6">
                            <h3 class="text-xl font-bold text-white mb-1">Write a Review</h3>
                            <p class="text-gray-400 text-sm mb-5">Tell us what you think about <span
                                    class="font-bold text-white">{{ gameName }}</span>.</p>

                            <!-- Divider -->
                            <div class="h-px bg-white/10 mb-5"></div>

                            <!-- Rating Selection -->
                            <p class="text-sm font-medium text-gray-300 mb-4">How would you rate this game?</p>
                            <div
                                class="flex md:flex-row flex-col gap-3 mb-6 items-center justify-center bg-black p-3 rounded-xl">
                                <button @click="modalRating = 'recommended'" :class="[
                                    'w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-normal transition-all',
                                    modalRating === 'recommended'
                                        ? 'bg-background-button-success-default text-text-button-success shadow-md shadow-green-500/20'
                                        : 'bg-background-button-success-default text-text-button-success'
                                ]">
                                    <ThumbsUp class="w-4 h-4" />
                                    Recommended
                                </button>
                                <button @click="modalRating = 'not_recommended'" :class="[
                                    'w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-normal transition-all',
                                    modalRating === 'not_recommended'
                                        ? 'bg-background-button-danger-default text-text-button-danger shadow-md shadow-pink-500/20'
                                        : 'bg-background-button-danger-default border-pink-300 text-text-button-danger hover:border-pink-400'
                                ]">
                                    <ThumbsDown class="w-4 h-4" />
                                    Not Recommended
                                </button>
                            </div>

                            <!-- Review Textarea -->
                            <textarea v-model="modalContent" rows="4"
                                placeholder="Describe your experience while playing the game..."
                                class="w-full bg-background-form border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white focus:outline-none focus:border-[#C29BEF] focus:ring-2 focus:ring-[#C29BEF]/20 resize-none transition-all mb-4"></textarea>

                            <!-- Show Username Checkbox -->
                            <label class="flex items-center gap-2.5 mb-6 cursor-pointer select-none group">
                                <input v-model="modalShowUsername" type="checkbox"
                                    class="w-4 h-4 rounded border-white/20 bg-[#0A0A0A] text-[#C29BEF] focus:ring-[#C29BEF] focus:ring-offset-0 cursor-pointer" />
                                <span class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Show my
                                    username on this review</span>
                            </label>

                            <!-- Submit Button -->
                            <button @click="submitReview"
                                class="w-full py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-[#9B6FD0] to-[#C29BEF] hover:from-[#A87DD8] hover:to-[#D0AFF7] transition-all shadow-lg shadow-[#C29BEF]/25 hover:shadow-[#C29BEF]/40 active:scale-[0.98]">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Filter, ThumbsUp, ThumbsDown, MoreVertical, Plus, User, ChevronDown, X } from 'lucide-vue-next';

const props = defineProps<{
    gameName?: string;
    gameImage?: string;
}>();

// Modal State
const showModal = ref(false);
const modalRating = ref<'recommended' | 'not_recommended' | null>(null);
const modalContent = ref('');
const modalShowUsername = ref(false);

const submitReview = () => {
    // For now just close the modal (no backend)
    console.log('Review submitted:', {
        rating: modalRating.value,
        content: modalContent.value,
        showUsername: modalShowUsername.value,
    });
    // Reset & close
    modalRating.value = null;
    modalContent.value = '';
    modalShowUsername.value = false;
    showModal.value = false;
};

// Mock Data
const totalReviews = '203,421';

const reviews = [
    {
        id: 1,
        isRecommended: true,
        date: '2025-06-10',
        content: "The Last of Us delivers one of the most emotionally gripping stories I've ever experienced. The relationship between Joel and Ellie is beautifully written. Combat is intense, stealth feels rewarding, and the environments are hauntingly gorgeous. Definitely a must-play.",
        userName: 'Stefan Arnold',
        userAvatar: 'https://i.pravatar.cc/150?u=stefan',
        helpfulCount: 34
    },
    {
        id: 2,
        isRecommended: false,
        date: '2025-04-14',
        content: "I really wanted to enjoy this game, but the constant crashes and lack of optimization ruined the experience. The story had potential, but the gameplay felt repetitive and clunky. Hoping future patches improve things, but for now, I can't recommend it.",
        userName: 'Liam V.',
        userAvatar: 'https://i.pravatar.cc/150?u=liam',
        helpfulCount: 22
    },
    {
        id: 3,
        isRecommended: true,
        date: '2025-02-14',
        content: "The Last of Us offers one of the most emotionally gripping stories I've ever experienced in a game. Joel and Ellie's journey is intense, heartbreaking, and beautifully told, with strong voice acting and cinematic quality that pulls you in. Gameplay-wise, it's a perfect mix of stealth, action, and survival mechanics.",
        userName: 'Darren Cole',
        userAvatar: 'https://i.pravatar.cc/150?u=darren',
        helpfulCount: 24
    }
];

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.25s ease;
}

.modal-enter-active>div:last-child,
.modal-leave-active>div:last-child {
    transition: transform 0.25s ease, opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from>div:last-child {
    transform: scale(0.95) translateY(10px);
    opacity: 0;
}

.modal-leave-to>div:last-child {
    transform: scale(0.95) translateY(10px);
    opacity: 0;
}
</style>
