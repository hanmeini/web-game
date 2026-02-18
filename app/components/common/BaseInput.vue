<template>
    <div class="space-y-2">
        <label v-if="label" :for="id" class="block text-sm font-medium text-text-neutral-secondary">
            {{ label }}
        </label>
        <div class="relative">
            <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <!-- Direct SVG or Image if string, otherwise Component -->
                <img v-if="typeof icon === 'string'" :src="icon" class="h-5 w-5 text-gray-400" alt="" />
                <component v-else :is="icon" class="h-5 w-5 text-gray-400" />
            </div>
            <input :id="id" :type="type" :value="modelValue"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                :placeholder="placeholder"
                class="block w-full pl-10 pr-3 py-3 bg-[#424242] border border-transparent rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#C29BEF] focus:ring-1 focus:ring-[#C29BEF] transition-colors"
                :class="{ 'pl-3': !icon }" />
            <div v-if="$slots.append" class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                <slot name="append" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    id: string;
    label?: string;
    modelValue: string;
    type?: string;
    placeholder?: string;
    icon?: any; // Component or string  
}>();

defineEmits(['update:modelValue']);
</script>
