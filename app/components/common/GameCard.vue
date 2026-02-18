<template>
    <div
        class="group relative bg-[#15171E] rounded-2xl overflow-hidden border border-white/5 hover:border-[#C29BEF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#C29BEF]/10 hover:-translate-y-1">
        <!-- Image Cover -->
        <div class="aspect-[3/4] w-full overflow-hidden relative">
            <img :src="image" :alt="title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

            <!-- Hover Overlay -->
            <div
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                    class="p-3 bg-[#C29BEF] rounded-full text-[#293047] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ArrowRight class="w-6 h-6" />
                </button>
            </div>
        </div>

        <!-- Content -->
        <div
            class="p-4 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/80 to-transparent pt-12 pb-4 px-4">
            <h3 class="text-xl font-bold text-white mb-2 line-clamp-1">{{ title }}</h3>

            <div class="flex items-center justify-between">
                <!-- Tags -->
                <div class="flex gap-1.5 flex-wrap">
                    <span v-for="tag in tags.slice(0, 2)" :key="tag"
                        class="px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-gray-300 border border-white/10">
                        {{ tag }}
                    </span>
                </div>

                <!-- Platforms (Icons Mock) -->
                <div class="flex gap-2 text-gray-400">
                    <!-- Simple svg placeholders for logos if needed, or lucide icons -->
                    <Gamepad2 class="w-4 h-4" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight, Gamepad2 } from 'lucide-vue-next';

defineProps<{
    title: string;
    image: string;
    tags: string[];
}>();
</script>
