<template>
  <div class="p-8 space-y-8">
    <section>
      <h2 class="text-3xl font-bold mb-4 text-text-primary">Semantic Tokens Demo</h2>
      <p class="text-text-neutral-secondary mb-8">
        This demo showcases the UI/UX tokens defined in tailwind.config.ts.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Buttons -->
        <div class="space-y-4">
          <h3 class="text-xl font-gaming text-text-neutral-primary border-b border-border-neutral pb-2">Buttons</h3>

          <div class="flex flex-wrap gap-4">
            <button
              class="px-6 py-2 rounded-game font-gaming transition-colors bg-background-button-primary-default hover:bg-background-button-primary-hover active:bg-background-button-primary-pressed text-white">
              Primary
            </button>

            <button
              class="px-6 py-2 rounded-game font-gaming transition-colors bg-background-button-secondary-default text-white">
              Secondary
            </button>

            <button
              class="px-6 py-2 rounded-game font-gaming transition-colors bg-background-button-outlined-default border border-border-neutral hover:bg-background-button-outlined-hover text-text-neutral-primary">
              Outlined
            </button>

            <button
              class="px-6 py-2 rounded-game font-gaming transition-colors bg-background-button-danger-default hover:bg-background-button-danger-hover text-black">
              Danger
            </button>

            <button
              class="px-6 py-2 rounded-game font-gaming transition-colors bg-background-button-success-default hover:bg-background-button-success-hover text-black">
              Success
            </button>
          </div>
        </div>

        <!-- Surfaces -->
        <div class="space-y-4">
          <h3 class="text-xl font-gaming text-text-neutral-primary border-b border-border-neutral pb-2">Surfaces</h3>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-game bg-background-surface-neutral border border-border-neutral">
              <span class="text-text-neutral-primary block mb-2">Neutral Surface</span>
              <span class="text-text-neutral-secondary text-sm">bg-background-surface-neutral</span>
            </div>

            <div class="p-4 rounded-game bg-background-surface-primary border border-border-primary">
              <span class="text-text-primary block mb-2">Primary Surface</span>
              <span class="text-text-neutral-secondary text-sm">bg-background-surface-primary</span>
            </div>
          </div>
        </div>

        <!-- Borders -->
        <div class="space-y-4">
          <h3 class="text-xl font-gaming text-text-neutral-primary border-b border-border-neutral pb-2">Borders</h3>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 border-2 border-border-button-outlined-default text-text-neutral-secondary rounded-game">
              button-outlined-default
            </div>
            <div class="p-4 border-2 border-border-primary text-text-neutral-secondary rounded-game">
              border-primary
            </div>
            <div class="p-4 border-2 border-border-danger text-text-neutral-secondary rounded-game">
              border-danger
            </div>
            <div class="p-4 border-2 border-border-success text-text-neutral-secondary rounded-game">
              border-success
            </div>
            <div class="p-4 border-2 border-border-warning text-text-neutral-secondary rounded-game">
              border-warning
            </div>
            <div class="p-4 border-2 border-border-info text-text-neutral-secondary rounded-game">
              border-info
            </div>
            <div class="p-4 border-2 border-border-form-default text-text-neutral-secondary rounded-game">
              form-default
            </div>
          </div>
        </div>

        <!-- Fills & Tags -->
        <div class="space-y-4">
          <h3 class="text-xl font-gaming text-text-neutral-primary border-b border-border-neutral pb-2">Fills & Tags
          </h3>

          <div class="flex flex-wrap gap-4">
            <div class="w-12 h-12 rounded-game bg-background-fill-primary"></div>
            <div class="w-12 h-12 rounded-game bg-background-fill-success"></div>
            <div class="w-12 h-12 rounded-game bg-background-fill-warning"></div>
            <div class="w-12 h-12 rounded-game bg-background-fill-danger"></div>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-game bg-background-tag-primary text-text-primary text-sm font-gaming">Primary
              Tag</span>
            <span class="px-3 py-1 rounded-game bg-background-tag-success text-text-success text-sm font-gaming">Success
              Tag</span>
            <span class="px-3 py-1 rounded-game bg-background-tag-warning text-text-warning text-sm font-gaming">Warning
              Tag</span>
            <span class="px-3 py-1 rounded-game bg-background-tag-danger text-text-danger text-sm font-gaming">Danger
              Tag</span>
          </div>
        </div>
      </div>

      <!-- Icons -->
      <div class="space-y-4">
        <h3 class="text-xl font-gaming text-text-neutral-primary border-b border-border-neutral pb-2">Icons</h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-icon-primary"></div>
            <span class="text-text-neutral-secondary">icon-primary</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-icon-danger"></div>
            <span class="text-text-neutral-secondary">icon-danger</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-icon-success"></div>
            <span class="text-text-neutral-secondary">icon-success</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-icon-warning"></div>
            <span class="text-text-neutral-secondary">icon-warning</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-icon-neutral-primary"></div>
            <span class="text-text-neutral-secondary">icon-neutral-primary</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-icon-button-primary"></div>
            <span class="text-text-neutral-secondary">icon-button-primary</span>
          </div>
        </div>

        <!-- Text -->
        <div class="space-y-4">
          <h3 class="text-xl font-gaming text-text-neutral-primary border-b border-border-neutral pb-2">Text</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div class="p-2 border border-border-neutral rounded">
              <span class="text-text-primary">text-primary</span>
            </div>
            <div class="p-2 border border-border-neutral rounded">
              <span class="text-text-secondary">text-secondary</span>
            </div>
            <div class="p-2 border border-border-neutral rounded">
              <span class="text-text-danger">text-danger</span>
            </div>
            <div class="p-2 border border-border-neutral rounded">
              <span class="text-text-success">text-success</span>
            </div>
            <div class="p-2 border border-border-neutral rounded">
              <span class="text-text-warning">text-warning</span>
            </div>
            <div class="p-2 border border-border-neutral rounded">
              <span class="text-text-info">text-info</span>
            </div>
            <div class="p-2 border border-border-neutral rounded">
              <span class="text-text-neutral-primary">text-neutral-primary</span>
            </div>
            <div class="p-2 border border-border-neutral rounded">
              <span class="text-text-neutral-secondary">text-neutral-secondary</span>
            </div>
            <div class="p-2 border border-border-neutral rounded bg-background-black/10">
              <span class="text-text-disabled">text-disabled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
