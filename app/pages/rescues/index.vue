<script setup lang="ts">
const { data: rescues } = await useAsyncData('rescues-index', () =>
  queryCollection('rescues')
    .order('name', 'ASC')
    .select(
      'name',
      'path',
      'description',
      'countries',
      'regionsCovered',
      'adoptionFeeMin',
      'adoptionFeeMax',
      'homeCheckType',
      'lastVerifiedAt',
    )
    .all(),
)

usePageSeo({
  title: 'UK rescues rehoming dogs from overseas',
  description:
    'Factual, verifiable profiles of UK-based rescues rehoming dogs from Romania, Cyprus, Bulgaria, Greece and Spain — fees, home checks and policies at a glance.',
})

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Rescues', path: '/rescues' },
]
</script>

<template>
  <div>
    <Breadcrumbs :items="crumbs" class="mb-8" />
    <header>
      <p class="eyebrow">Rescues</p>
      <h1 class="display mt-3 text-[2.2rem] sm:text-[2.8rem]">Overseas rescues rehoming to the UK</h1>
      <p class="lede mt-4">
        One page per rescue — the facts, structured the same way, each with the
        date it was last verified.
      </p>
    </header>

    <div class="mt-12 grid gap-5 sm:grid-cols-2">
      <RescueCard v-for="rescue in rescues" :key="rescue.path" :rescue="rescue" />
    </div>
  </div>
</template>
