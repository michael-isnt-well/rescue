<template>
  <div class="flex min-h-screen flex-col bg-[var(--color-paper)]">
    <AppHeader />
    <main class="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:py-14">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
