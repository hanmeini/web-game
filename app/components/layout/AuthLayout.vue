<template>
    <div class="min-h-screen flex flex-col lg:flex-row bg-background relative">
        <!-- Image Section (Top on mobile, Left on desktop) -->
        <div class="w-full lg:w-1/2 h-[35vh] lg:h-auto lg:min-h-screen lg:p-4 z-0 relative">
            <div class="relative h-full w-full lg:rounded-3xl overflow-hidden">
                <img :src="image" alt="Auth Background" class="absolute inset-0 h-full w-full object-cover" />

                <!-- Tag (VORTEX) -->
                <div class="absolute top-8 w-full flex justify-center lg:justify-end lg:pr-8 z-30">
                    <span v-if="tag"
                        class="inline-block px-4 py-2 rounded-full bg-transparent md:bg-white text-white md:text-black font-bold text-2xl">
                        {{ tag }}
                    </span>
                </div>

                <!-- Gradient and Text Container -->
                <div
                    class="absolute bottom-0 w-full z-20 p-8 lg:p-12 text-white bg-gradient-to-t from-background via-background/80 to-transparent">
                    <!-- Mobile Title (Sign In) -->
                    <span v-if="mobileStep"
                        class="lg:hidden block text-xs text-white font-bold uppercase tracking-widest mb-1 text-center">{{
                            mobileStep }}</span>
                    <h2 v-if="mobileTitle" class="lg:hidden text-4xl font-gaming font-semibold mb-2 text-center">{{
                        mobileTitle }}</h2>
                    <!-- Desktop Title (Thousands...) -->
                    <h2 class="hidden lg:block text-5xl font-gaming font-semibold mb-2 text-left">{{ title }}</h2>

                    <p class="text-base lg:text-lg text-white/90 text-center lg:text-left">{{ subtitle }}</p>
                </div>
            </div>
        </div>

        <!-- Form Section (Bottom on mobile, Right on desktop) -->
        <div
            class="w-full lg:w-1/2 flex items-start lg:items-center justify-center p-6 lg:p-8 bg-background z-10 -mt-6 lg:mt-0 rounded-t-3xl lg:rounded-none">
            <div class="w-full max-w-md space-y-6 pb-8">
                <!-- Mobile only stylistic spacer or handle? Not needed if using negative margin correctly -->
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    image: string;
    title: string;
    subtitle: string;
    tag?: string;
    mobileTitle?: string;
    mobileStep?: string;
}>();
</script>
