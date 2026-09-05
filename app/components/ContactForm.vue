<script setup lang="ts">
/**
 * Native contact form that posts to Web3Forms — no backend, no email exposed,
 * site stays fully static. Spam is handled by a honeypot field plus Web3Forms'
 * own filtering. The access key is safe to ship in page source (it can't read
 * submissions). Generic and reusable: pass the key and a subject per use.
 */
const props = defineProps<{
  accessKey: string
  subject?: string
}>()

const form = reactive({
  name: '',
  email: '',
  pageUrl: '',
  message: '',
  botcheck: '', // honeypot — real users never fill this
})

const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMsg = ref('')

async function onSubmit() {
  if (form.botcheck) return // bot tripped the honeypot
  status.value = 'submitting'
  errorMsg.value = ''
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: props.accessKey,
        subject: props.subject || 'New message — Rescue Journey',
        from_name: 'Rescue Journey',
        name: form.name,
        email: form.email,
        page_url: form.pageUrl,
        message: form.message,
        botcheck: form.botcheck,
      }),
    })
    const data = await res.json()
    if (data.success) {
      status.value = 'success'
    } else {
      status.value = 'error'
      errorMsg.value = data.message || 'Something went wrong — please try again.'
    }
  } catch {
    status.value = 'error'
    errorMsg.value = 'Network error — please try again in a moment.'
  }
}
</script>

<template>
  <div>
    <!-- Success state -->
    <div
      v-if="status === 'success'"
      class="rounded-[var(--radius-lg)] border border-[var(--color-brand)] bg-[var(--color-brand-soft)] p-6"
      role="status"
      aria-live="polite"
    >
      <p class="font-semibold text-[var(--color-brand-dark)]">Thank you — message sent.</p>
      <p class="mt-1 text-sm text-[var(--color-ink)]">
        I read every message and will get back to you as soon as I can.
      </p>
    </div>

    <!-- Form -->
    <form v-else class="space-y-4" @submit.prevent="onSubmit">
      <!-- Honeypot: visually hidden, off the tab order, ignored by humans -->
      <input
        v-model="form.botcheck"
        type="checkbox"
        name="botcheck"
        tabindex="-1"
        autocomplete="off"
        class="hidden"
        aria-hidden="true"
      />

      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block">
          <span class="text-sm font-medium">Your name</span>
          <input
            v-model="form.name"
            type="text"
            name="name"
            autocomplete="name"
            class="mt-1 w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-sm focus:border-[var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-soft)]"
          />
        </label>
        <label class="block">
          <span class="text-sm font-medium">Your email <span class="text-[var(--color-warn)]">*</span></span>
          <input
            v-model="form.email"
            type="email"
            name="email"
            required
            autocomplete="email"
            class="mt-1 w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-sm focus:border-[var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-soft)]"
          />
        </label>
      </div>

      <label class="block">
        <span class="text-sm font-medium">Page this is about (optional)</span>
        <input
          v-model="form.pageUrl"
          type="url"
          name="page_url"
          placeholder="https://rescuejourney.co.uk/rescues/…"
          class="mt-1 w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-sm focus:border-[var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-soft)]"
        />
      </label>

      <label class="block">
        <span class="text-sm font-medium">Message <span class="text-[var(--color-warn)]">*</span></span>
        <textarea
          v-model="form.message"
          name="message"
          required
          rows="6"
          class="mt-1 w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-paper)] px-3 py-2 text-sm focus:border-[var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-soft)]"
        />
      </label>

      <p v-if="status === 'error'" class="text-sm text-[var(--color-warn)]" role="alert">
        {{ errorMsg }}
      </p>

      <div class="flex items-center gap-3">
        <button type="submit" class="btn btn-primary" :disabled="status === 'submitting'">
          {{ status === 'submitting' ? 'Sending…' : 'Send message' }}
        </button>
        <span class="text-xs text-[var(--color-muted)]">
          Your email is only used to reply. See the
          <NuxtLink to="/privacy" class="underline">privacy policy</NuxtLink>.
        </span>
      </div>
    </form>
  </div>
</template>
