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
        profile corrected or removed, please get in touch and I'll respond
        quickly.
      </p>
      <h2>How to reach me</h2>
      <p>
        Email <a href="mailto:hello@example.com">hello@example.com</a> with the
        page URL and what needs changing. For rescues, a quick note from an
        address on your organisation's domain helps me verify the request.
      </p>
      <h2>What I'll do</h2>
      <p>
        Factual corrections are usually made within a few days. If a profile is
        removed, the page won't simply vanish — it'll show a short "no longer
        listed" note so existing links don't break.
      </p>
    </div>
  </div>
</template>
