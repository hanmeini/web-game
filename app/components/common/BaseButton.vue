<template>
    <button :type="type"
        class="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl font-gaming font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
        :class="[
            variantClasses[variant],
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'
        ]" :disabled="disabled">
        <slot />
    </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'social';

const props = withDefaults(defineProps<{
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariant;
    disabled?: boolean;
}>(), {
    type: 'button',
    variant: 'primary'
});

const variantClasses = {
    primary: 'bg-background-button-secondary-default text-background shadow-lg shadow-background-button-secondary-default/20 hover:bg-background-button-secondary-hover', // Using the light purple from tokens as "Primary" action
    secondary: 'bg-background-button-primary-default text-text-white hover:bg-background-button-primary-hover',
    outline: 'border border-border-neutral text-text-primary hover:bg-background-surface-primary',
    ghost: 'text-text-primary hover:bg-background-surface-primary',
    social: 'bg-background-surface-neutral border border-border-neutral text-text-primary hover:bg-background-surface-primary'
};
</script>
