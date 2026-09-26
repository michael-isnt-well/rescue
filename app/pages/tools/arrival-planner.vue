<script setup lang="ts">
const route = useRoute()

usePageSeo({
  title: 'Rescue dog arrival checklist — a dated plan for dogs from abroad',
  description:
    'Enter your overseas rescue dog’s arrival date and get a dated checklist: kit, insurance start, microchip, first vet visit, waiting periods and follow-up tests, with a calendar you can import.',
})

const faqs = [
  {
    question: 'What should I do before my rescue dog arrives from abroad?',
    answer:
      'Register with a vet and ask about their policy for imported dogs, get escape-resistant kit and an ID tag, arrange insurance to start on arrival day, collect the pet passport and records from the rescue, and set up a safe space. Plan the handover so your dog goes straight from the van into a fully enclosed space.',
  },
  {
    question: 'Can my rescue dog leave the house in the first 48 hours?',
    answer:
      'No. Rescue dogs are imported under commercial rules, and APHA says a commercially imported dog must be delivered to the address on its paperwork and stay there for at least 48 hours. Collecting from a public place such as a service station or car park is against the law.',
  },
  {
    question: 'When should pet insurance start for an imported rescue dog?',
    answer:
      'On arrival day. Some policies don’t begin until the dog is in your possession, and the policies we checked exclude illness that first shows in the first 14 days, so every day of delay adds risk.',
  },
  {
    question: 'Do I need to update my rescue dog’s microchip?',
    answer:
      'Yes. By law your dog must be microchipped and registered on an approved database, and you must make sure the details are updated to you. Ask your rescue whether they transfer the registration or you need to contact the database. Your dog also needs a collar and tag with your name and address in public.',
  },
  {
    question: 'When should an imported dog be tested for Brucella and Leishmania?',
    answer:
      'Ask your vet. Langford Vets notes that Brucella canis antibodies can take up to 3 months after exposure to become detectable, and only around half of dogs have detectable Leishmania antibodies 5 months after exposure, with some taking up to 2 years. That’s why follow-up tests months after arrival are often suggested.',
  },
]

const schema = computed(() => [
  buildArticle({
    headline: 'Rescue dog arrival planner',
    description:
      'A dated checklist for the weeks before and after an overseas rescue dog arrives, with calendar export.',
    path: route.path,
    datePublished: '2026-09-26',
  }),
  buildHowTo({
    name: 'Prepare for your overseas rescue dog’s arrival',
    description: 'The key steps before and after arrival day.',
    steps: TASKS.filter((t) => t.offset <= 14).map((t) => ({ name: t.title, text: t.detail })),
  }),
])

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
  { name: 'Arrival planner', path: '/tools/arrival-planner' },
]
</script>

<template>
  <div>
    <Breadcrumbs :items="crumbs" class="mb-8 print:hidden" />

    <header>
      <p class="eyebrow">Free tool</p>
      <h1 class="display mt-3 text-[2.2rem] sm:text-[2.8rem]">Rescue dog arrival planner</h1>
      <p class="lede mt-4">
        Enter the day your dog arrives and get a dated plan for everything around it: what to sort
        beforehand, when insurance cover really kicks in, and the follow-up vet checks months later
        that are easy to forget.
      </p>
    </header>

    <section class="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] p-5 sm:p-7">
      <ArrivalPlanner />
    </section>

    <div class="prose mt-12 print:hidden">
      <h2>Why the dates matter</h2>
      <p>
        Most of this is common sense, but three things are genuinely time-sensitive for an imported dog.
        Insurance has <NuxtLink to="/guides/insurance-for-imported-dogs">waiting periods</NuxtLink>, so it
        needs to start on arrival day. The first weeks are when a frightened dog is most likely to bolt, which is
        what the <NuxtLink to="/tools/harness-fit-finder">Harness Finder</NuxtLink> is for. And some infections
        common in dogs from abroad take months to show up on a blood test, so the follow-up checks are worth a
        calendar reminder.
      </p>
      <p>
        Your ticks are saved in this browser. The calendar file works with Google Calendar, Apple Calendar and
        Outlook, and each event links back to the relevant guide.
      </p>
    </div>

    <Faq :items="faqs" heading="Arrival planning: common questions" />

    <p class="mt-10 text-xs text-[var(--color-faint)] print:hidden">
      General guidance, not veterinary advice. Always follow your vet’s and your rescue’s advice for your dog.
    </p>

    <JsonLd :schema="schema" />
  </div>
</template>
