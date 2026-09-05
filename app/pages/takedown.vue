<script setup lang="ts">
usePageSeo({
  title: 'Corrections & takedowns',
  description:
    'How to report an inaccuracy or request changes to a rescue profile or guide on this site.',
})
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Corrections & takedowns', path: '/takedown' },
]
</script>

<template>
  <div class="measure">
    <Breadcrumbs :items="crumbs" class="mb-8" />
    <h1 class="display text-[2.2rem] sm:text-[2.6rem]">Corrections &amp; takedowns</h1>
    <div class="prose mt-8">
      <p>
        I want every guide and rescue profile here to be accurate. If something
        is wrong, out of date, or if you represent a rescue and want your
        profile corrected or removed, use the form below and I'll respond
        quickly. If you're getting in touch about a specific page, popping its
        link in helps. For rescues, a message from an address on your
        organisation's domain helps me verify the request.
      </p>
    </div>

    <div class="mt-8">
      <ContactForm
        access-key="1ef98639-1053-4292-a02e-d374a38abb87"
        subject="Correction / takedown — Rescue Journey"
      />
    </div>

    <div class="prose mt-12">
      <h2>What happens next</h2>
      <p>
        Factual corrections are usually made within a few days. If a profile is
        removed, the page won't simply vanish — it'll show a short "no longer
        listed" note so existing links don't break.
      </p>
    </div>
  </div>
</template>
