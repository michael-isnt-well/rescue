<script setup lang="ts">
usePageSeo({
  title: 'Privacy policy',
  description: 'What this site collects, why, and your rights under UK GDPR.',
})
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Privacy policy', path: '/privacy' },
]
</script>

<template>
  <div class="measure">
    <Breadcrumbs :items="crumbs" class="mb-8" />
    <h1 class="display text-[2.2rem] sm:text-[2.6rem]">Privacy policy</h1>
    <div class="prose mt-8">
      <p>
        This is a static content site. It has no accounts, no logins, and no
        comment forms, so I don't ask you for personal information and I don't
        store any.
      </p>
      <h2>Analytics</h2>
      <p>
        If analytics are enabled, they are privacy-friendly and cookieless —
        aggregate page views only, with no cross-site tracking and no personal
        profiles. This section will name the provider once one is in use.
      </p>
      <h2>Outbound links</h2>
      <p>
        This site currently uses no affiliate links or ads. Any outbound link
        (for example to a rescue or an insurer) takes you to a third-party site
        governed by its own privacy policy, not mine. If affiliate links or ads
        are introduced later, this section and the
        <NuxtLink to="/affiliate-disclosure">how this site is funded</NuxtLink>
        page will be updated to say so.
      </p>
      <h2>Your rights</h2>
      <p>
        Under UK GDPR you have rights over any personal data a site holds about
        you. As this site holds none, there is nothing to request, correct, or
        erase. If that ever changes, this page will say so and give a contact
        route.
      </p>
    </div>
  </div>
</template>
