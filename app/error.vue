<template>
    <div class="min-h-screen bg-[#1F1F1F] flex items-center justify-center px-6 relative overflow-hidden">

        <!-- Ambient glow effects -->
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C29BEF]/10 rounded-full blur-[150px] pointer-events-none">
        </div>
        <div
            class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#6C5DD3]/10 rounded-full blur-[120px] pointer-events-none">
        </div>

        <div class="relative z-10 text-center max-w-lg mx-auto">
            <!-- Error Code -->
            <h1
                class="text-[150px] md:text-[200px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 select-none">
                {{ error?.statusCode || '???' }}
            </h1>

            <!-- Glitch-style overlay code -->
            <h2
                class="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C29BEF] to-[#6C5DD3] -mt-20 md:-mt-24 mb-6">
                {{ errorTitle }}
            </h2>

            <!-- Description -->
            <p class="text-gray-400 text-base md:text-lg mb-10 leading-relaxed">
                {{ errorDescription }}
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button @click="handleError"
                    class="px-8 py-3.5 bg-gradient-to-r from-[#C29BEF] to-[#6C5DD3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C29BEF]/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    <Home class="w-5 h-5" />
                    Back to Home
                </button>

                <button @click="goBack"
                    class="px-8 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    <ArrowLeft class="w-5 h-5" />
                    Go Back
                </button>
            </div>

            <!-- Game-themed decoration -->
            <div class="mt-16 flex items-center justify-center gap-3 text-gray-600">
                <div class="h-px w-12 bg-gradient-to-r from-transparent to-gray-600"></div>
                <Gamepad2 class="w-5 h-5" />
                <span class="text-sm">Lost in the void</span>
                <div class="h-px w-12 bg-gradient-to-l from-transparent to-gray-600"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Home, ArrowLeft, Gamepad2 } from 'lucide-vue-next';

const props = defineProps<{
    error: {
        statusCode: number;
        message: string;
    };
}>();

const errorTitle = computed(() => {
    switch (props.error?.statusCode) {
        case 404:
            return 'Page Not Found';
        case 403:
            return 'Access Denied';
        case 500:
            return 'Server Error';
        case 503:
            return 'Service Unavailable';
        default:
            return 'Something Went Wrong';
    }
});

const errorDescription = computed(() => {
    switch (props.error?.statusCode) {
        case 404:
            return "The page you're looking for doesn't exist or has been moved. Maybe the game was uninstalled?";
        case 403:
            return "You don't have permission to access this area. This zone is locked.";
        case 500:
            return "Our servers hit a critical error. The devs are respawning — please try again later.";
        case 503:
            return "The service is temporarily unavailable. We're performing maintenance — check back soon.";
        default:
            return "An unexpected error occurred. Don't worry, no save data was lost.";
    }
});

const handleError = () => clearError({ redirect: '/' });

const goBack = () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        clearError({ redirect: '/' });
    }
};
</script>
