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
        This is a static content site with no accounts, no logins, and no
        tracking of individuals. The only place it collects personal
        information is the contact form — and only what you choose to type
        into it.
      </p>
      <h2>The contact form</h2>
      <p>
        When you send a message through the
        <NuxtLink to="/takedown">corrections form</NuxtLink>, the details you
        enter (your name, email, an optional page link, and your message) are
        delivered to me by email via a third-party form service,
        <strong>Web3Forms</strong>, which processes the submission on my behalf.
        I use your email only to reply. I won't add you to any mailing list —
        there isn't one. Web3Forms' handling of the data in transit is governed
        by their own privacy policy.
      </p>
      <h2>Analytics</h2>
      <p>
        This site uses <strong>Cloudflare Web Analytics</strong> — a
        privacy-friendly, cookieless analytics tool that counts aggregate page
        views only. It sets no cookies, builds no personal profiles, and does
        not track you across other sites. Because it collects no personal data
        and uses no cookies, it needs no cookie banner.
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
        Under UK GDPR you have rights over any personal data held about you. In
        practice the only personal data here is what you send via the contact
        form. If you'd like me to delete a message you've sent, just reply to it
        or get in touch and I'll remove it.
      </p>
    </div>
  </div>
</template>
