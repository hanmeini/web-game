<template>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 text-white relative">
        <!-- Left Column: About & Requirements -->
        <div class="md:col-span-8 space-y-12">
            <!-- About -->
            <div class="bg-[#1F1F1F]">
                <h3 class="text-2xl font-bold mb-6">About the Game</h3>
                <div class="text-gray-300 leading-relaxed space-y-4 font-light text-lg"
                    v-html="props.game.description_raw || props.game.description"></div>
            </div>

            <!-- System Requirements -->
            <div v-if="pcRequirements">
                <h3 class="text-2xl font-bold mb-6">System Requirements</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Minimum -->
                    <div>
                        <h4 class="font-bold text-lg mb-4 text-white uppercase tracking-wider">Minimum</h4>
                        <div class="text-sm text-gray-400 whitespace-pre-line leading-relaxed requirements-text"
                            v-html="formatRequirements(pcRequirements.minimum)"></div>
                    </div>
                    <!-- Recommended -->
                    <div>
                        <h4 class="font-bold text-lg mb-4 text-white uppercase tracking-wider">Recommended</h4>
                        <div class="text-sm text-gray-400 whitespace-pre-line leading-relaxed requirements-text"
                            v-html="formatRequirements(pcRequirements.recommended)"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Column: Quick Info -->
        <div class="md:col-span-4 relative">
            <div class="space-y-6 sticky top-24">
                <div class="bg-[#15171E] p-8 rounded-3xl border border-white/5 space-y-8">
                    <h3 class="text-2xl font-bold mb-2">Quick Info</h3>

                    <div class="grid grid-cols-2 gap-y-8 gap-x-4">
                        <div>
                            <p class="text-gray-500 mb-1 text-sm">Platforms</p>
                            <p class="font-bold text-white text-lg leading-tight">{{ platformNames }}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 mb-1 text-sm">Genre</p>
                            <p class="font-bold text-white text-lg leading-tight">{{ genreNames }}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 mb-1 text-sm">Release Date</p>
                            <p class="font-bold text-white text-lg">{{ formatDate(props.game.released) }}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 mb-1 text-sm">Developer</p>
                            <p class="font-bold text-white text-lg">{{ developerNames }}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 mb-1 text-sm">Publisher</p>
                            <p class="font-bold text-white text-lg">{{ publisherNames }}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 mb-1 text-sm">Age Rating</p>
                            <p class="font-bold text-yellow-400 text-lg">{{ props.game.esrb_rating?.name || 'Not Rated'
                                }}</p>
                        </div>
                        <div class="col-span-2 border-t border-white/10 pt-4 mt-2">
                            <p class="text-gray-500 mb-3 text-sm">Tags</p>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="tag in displayedTags" :key="tag.id"
                                    class="px-4 py-2 text-sm border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 transition-colors cursor-default">
                                    {{ tag.name }}
                                </span>
                                <span v-if="remainingTagsCount > 0"
                                    class="px-4 py-2 text-sm border border-white/20 rounded-xl text-gray-300 hover:bg-white/10 transition-colors cursor-default">
                                    + {{ remainingTagsCount }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Where to Get -->
                <div v-if="props.game.stores && props.game.stores.length > 0"
                    class="bg-[#15171E] p-8 rounded-3xl border border-white/5">
                    <h3 class="text-2xl font-bold mb-6">Where to Get</h3>
                    <div class="flex gap-4 flex-wrap">
                        <a v-for="storeLink in props.game.stores" :key="storeLink.id" :href="storeLink.url"
                            target="_blank"
                            class="w-16 h-16 bg-white/10 rounded-2xl hover:bg-white/20 hover:scale-105 transition-all flex items-center justify-center group"
                            :title="storeLink.store.name">
                            <img v-if="getStoreIcon(storeLink.store.slug)" :src="getStoreIcon(storeLink.store.slug)"
                                :alt="storeLink.store.name"
                                class="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
                            <Store v-else class="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GameDetails } from '~/types/rawg';

const props = defineProps<{
    game: GameDetails;
}>();

const formattedDescription = computed(() => {
    let desc = props.game.description || props.game.description_raw || 'No description available.';

    // Attempt to remove common multi-language markers
    // RAWG unfortunately doesn't split these cleanly, so this is heuristic.
    // Common pattern is English then Spanish/Russian
    const markers = [
        '<p>Español', '<h3>Español', '<strong>Español',
        '<p>По-русски', '<h3>По-русски', '<strong>По-русски',
        'Español<', 'По-русски<'
    ];

    for (const marker of markers) {
        const index = desc.indexOf(marker);
        if (index > 0) {
            return desc.substring(0, index);
        }
    }

    return desc;
});

const pcRequirements = computed(() => {
    if (!props.game.platforms) return null;
    const pcPlatform = props.game.platforms.find(p => p.platform.slug === 'pc');
    return pcPlatform?.requirements || null;
});

// Helper to format requirements text into a list
const formatRequirements = (reqString?: string) => {
    if (!reqString) return 'Not specified';

    // If it already looks like HTML (has <br> or <li>), return as is
    if (reqString.includes('<br>') || reqString.includes('<li>')) {
        return reqString;
    }

    // Otherwise, try to split by known keywords to make a list
    // Or simply split by newlines if regular text
    let processedString = reqString;

    // Add newlines before known keys if they are missing
    const keys = ['OS:', 'Processor:', 'Memory:', 'Graphics:', 'DirectX:', 'Network:', 'Storage:', 'Sound Card:', 'Additional Notes:', 'VR Support:'];
    keys.forEach(key => {
        // Simple replace: insert newline before key if not present
        // Using split/join to replace all occurrences efficiently without complex regex lookbehind issues
        const parts = processedString.split(key);
        if (parts.length > 1) {
            processedString = parts.map(p => p.trim()).join('\n' + key + ' ');
        }
    });

    // Clean up valid lines
    const lines = processedString
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '' && !line.startsWith('Minimum:') && !line.startsWith('Recommended:')); // Remove headers if merged

    if (lines.length > 0) {
        return `<ul class="list-disc pl-4 space-y-1">${lines.map(line => `<li>${line}</li>`).join('')}</ul>`;
    }

    return reqString;
};

const platformNames = computed(() => {
    return props.game.parent_platforms?.map(p => p.platform.name).join(', ') || 'Unknown';
});

const genreNames = computed(() => {
    return props.game.genres?.map(g => g.name).join(', ') || 'Unknown';
});

const developerNames = computed(() => {
    return props.game.developers?.map(d => d.name).join(', ') || 'Unknown';
});

const publisherNames = computed(() => {
    return props.game.publishers?.map(p => p.name).join(', ') || 'Unknown';
});

const displayedTags = computed(() => {
    return props.game.tags?.slice(0, 5) || [];
});

const remainingTagsCount = computed(() => {
    return Math.max(0, (props.game.tags?.length || 0) - 5);
});

const formatDate = (dateString: string) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Store Icon Helper
import { Store } from 'lucide-vue-next';

// Mapping store slugs to local icons
// Returns path string for local icons, or null/undefined if not found
const getStoreIcon = (slug: string): string | undefined => {
    switch (slug) {
        case 'steam':
            return '/icons/steam.svg';
        case 'epic-games':
            return '/icons/epic-games.svg';
        case 'gog':
        case 'itch':
        case 'microsoft-store':
            return '/icons/windows-10.svg';
        case 'playstation-store':
            return '/icons/play-station.svg';
        case 'xbox-store':
        case 'xbox360':
            return '/icons/xbox.svg';
        default:
            return undefined; // Return undefined to trigger fallback component
    }
};
</script>

<style scoped>
/* Custom styles for requirements text to handle raw HTML formatting better if needed */
.requirements-text :deep(ul) {
    list-style-type: disc;
    padding-left: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.requirements-text :deep(strong) {
    color: white;
    font-weight: 600;
}
</style>
