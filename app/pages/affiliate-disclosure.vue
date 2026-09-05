<script setup lang="ts">
usePageSeo({
  title: 'How this site is funded',
  description:
    'This site currently runs no ads and earns no affiliate income. If that changes, it will be disclosed clearly here — and it will never shape the advice.',
})
const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'How this site is funded', path: '/affiliate-disclosure' },
]
</script>

<template>
  <div class="measure">
    <Breadcrumbs :items="crumbs" class="mb-8" />
    <h1 class="display text-[2.2rem] sm:text-[2.6rem]">How this site is funded</h1>
    <div class="prose mt-8">
      <p>
        Right now, nothing funds this site. It carries <strong>no ads</strong>,
        and I earn <strong>no affiliate income or commission</strong> from
        anything I link to or recommend. I'm writing it because I'm going
        through the process myself and wanted the resource to exist.
      </p>
      <h2>What might change later</h2>
      <p>
        Keeping a site like this going takes time. In the future I may
        introduce a small amount of funding — most likely affiliate links to
        pet insurers, and possibly some well-placed advertising — purely to
        cover that time. I'll make that decision based on whether the site is
        genuinely useful and active, not before.
      </p>
      <h2>The commitment, whenever that day comes</h2>
      <ul>
        <li>
          If a page ever contains an affiliate link or an ad, there will be a
          <strong>clear, visible disclosure on that page</strong> — not buried
          here.
        </li>
        <li>
          Money will <strong>never</strong> decide what I recommend. I won't
          rank insurers by what they pay, and I'll say plainly when a better or
          cheaper option isn't a partner.
        </li>
        <li>
          This page will be updated to say exactly what's changed, and when.
        </li>
      </ul>
      <p>
        Until then, take everything here as independent — because it is.
      </p>
    </div>
  </div>
</template>
