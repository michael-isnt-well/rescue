<script setup lang="ts">
usePageSeo({
  title: 'About — who writes this and why',
  description:
    'Written by Mike Harper, a UK adopter going through the overseas rescue process with Barnie, a 16-month-old dog from Romania.',
  type: 'profile',
})

const schema = computed(() =>
  buildPerson({
    name: 'Mike Harper',
    path: '/about',
    description:
      'UK-based adopter of Barnie, a rescue dog from Romania, writing practical guidance for people adopting dogs from overseas.',
    image: '/images/mike-and-barnie.svg',
  }),
)

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]
</script>

<template>
  <div class="measure">
    <Breadcrumbs :items="crumbs" class="mb-8" />
    <p class="eyebrow">About</p>
    <h1 class="display mt-3 text-[2.2rem] sm:text-[2.8rem]">Who writes this, and why</h1>

    <img
      src="/images/mike-and-barnie.svg"
      alt="Mike Harper sitting on the floor with Barnie, a tan-and-white rescue dog from Romania"
      width="800"
      height="500"
      loading="lazy"
      decoding="async"
      class="mt-8 w-full rounded-[var(--radius-lg)] border border-[var(--color-line)] object-cover"
    />

    <div class="prose mt-8">
      <p>
        I'm Mike from North Wales. My partner and I are adopting Barnie, a 16-month-old
        boy from a shelter in Romania, through Pawprints to Freedom (a dog rescue charity who do amazing things). As I write
        this he's due to arrive at the end of September 2026, and we're deep in
        the part nobody quite prepares you for — the transport
        timings, and the long wait in between. So I started writing it down.
      </p>
      <p>
        This site is two things. First, a genuine attempt to help other UK
        adopters: evergreen guides on the parts that confused me, and factual
        profiles of the rescues doing this work. Second, an honest journal of
        life with Barnie, published as it happens rather than tidied up
        afterwards.
      </p>
      <h2>Why trust it</h2>
      <p>
        I'm not a vet and I'm not a charity. I say so plainly. Guides carry the
        date they were last reviewed; rescue profiles carry the date they were
        last verified. Right now the site earns nothing — no ads, no affiliate
        income. If that ever changes I'll disclose it clearly, and it will
        never shape what I recommend. (See
        <NuxtLink to="/affiliate-disclosure">how this site is funded</NuxtLink>.)
      </p>
      <p>
        If something here is wrong or out of date, I want to know. There's a
        <NuxtLink to="/takedown">corrections and takedowns</NuxtLink> page for
        exactly that.
      </p>
    </div>

    <JsonLd :schema="schema" />
  </div>
</template>
