<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

let originalAppStyle = ''
let originalHeaderStyle = ''

onMounted(() => {
  const app = document.getElementById('app')
  const header = document.querySelector('header')
  if (app) {
    originalAppStyle = app.getAttribute('style') || ''
    app.style.display = 'block'
    app.style.maxWidth = '100%'
    app.style.padding = '0'
    app.style.margin = '0'
  }
  if (header) {
    originalHeaderStyle = (header as HTMLElement).getAttribute('style') || ''
    ;(header as HTMLElement).style.display = 'none'
  }
})

onUnmounted(() => {
  const app = document.getElementById('app')
  const header = document.querySelector('header')
  if (app) app.setAttribute('style', originalAppStyle)
  if (header) (header as HTMLElement).setAttribute('style', originalHeaderStyle)
})

const formData = ref({ email: '', topic: '', message: '' })
const submitted = ref(false)
const sending = ref(false)
const error = ref(false)

async function submitForm() {
  sending.value = true
  error.value = false
  try {
    const data = new FormData()
    data.append('email', formData.value.email)
    data.append('topic', formData.value.topic)
    data.append('message', formData.value.message)
    data.append('_subject', 'MasterAI Support Request')
    data.append('_captcha', 'false')
    data.append('_template', 'table')
    const res = await fetch('https://formsubmit.co/ajax/help@rpgmaster.ai', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    if (res.ok) {
      submitted.value = true
    } else {
      error.value = true
    }
  } catch {
    error.value = true
  } finally {
    sending.value = false
  }
}

const faqs = ref([
  { q: 'How do I delete my account?', a: 'You can delete your account directly from the app: go to Settings → Account → Delete Account.', open: false },
  { q: 'How do I restore a purchase?', a: 'Open the app, go to the token shop, and tap "Restore Purchases". If the issue persists, contact us using the form above with your purchase receipt.', open: false },
  { q: 'The app crashed. What should I do?', a: 'Make sure you have the latest version from the App Store or Google Play. If the crash continues, send us a bug report with your device model and what you were doing when it happened.', open: false },
  { q: 'How do I contact support?', a: 'Use the form above, or email us directly at help@rpgmaster.ai. You can also reach our community on Discord for quick help from other players.', open: false }
])

function toggleFaq(i: number) { faqs.value[i].open = !faqs.value[i].open }
</script>

<template>
  <div class="sp-page">
    <header class="sp-header">
      <div class="sp-logo">MASTER<span>AI</span></div>
      <a href="/" class="sp-back">← Back to site</a>
    </header>

    <main class="sp-main">
      <h1>Support</h1>
      <p class="sp-subtitle">Need help with MasterAI? Send us a message and we'll get back to you as soon as possible.</p>

      <section class="sp-section">
        <h2>Contact Us</h2>
        <form v-if="!submitted" @submit.prevent="submitForm">
          <div class="sp-field">
            <label for="email">Your email</label>
            <input type="email" id="email" v-model="formData.email" placeholder="your@email.com" required />
          </div>
          <div class="sp-field">
            <label for="topic">Topic</label>
            <select id="topic" v-model="formData.topic" required>
              <option value="" disabled>Select a topic...</option>
              <option value="Account Issue">Account Issue</option>
              <option value="Payment / Tokens">Payment / Tokens</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Account Deletion">Account Deletion</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="sp-field">
            <label for="message">Message</label>
            <textarea id="message" v-model="formData.message" placeholder="Describe your issue in detail..." required></textarea>
          </div>
          <p v-if="error" class="sp-error">Something went wrong. Please try emailing us directly at help@rpgmaster.ai</p>
          <button type="submit" class="sp-btn" :disabled="sending">{{ sending ? 'Sending...' : 'Send Message' }}</button>
        </form>
        <div v-if="submitted" class="sp-success">
          <div class="sp-success-icon">✓</div>
          <h3>Ticket Opened</h3>
          <p>Your message has been sent to our support team.<br/>We'll reply to your email as soon as possible.</p>
        </div>
      </section>

      <section class="sp-section">
        <h2>Frequently Asked Questions</h2>
        <div v-for="(faq, i) in faqs" :key="i" class="sp-faq" @click="toggleFaq(i)">
          <div class="sp-faq-q"><span>{{ faq.q }}</span><span class="sp-faq-icon">{{ faq.open ? '−' : '+' }}</span></div>
          <div class="sp-faq-a" :class="{ open: faq.open }">{{ faq.a }}</div>
        </div>
      </section>

      <section class="sp-section">
        <h2>Other Ways to Reach Us</h2>
        <div class="sp-contacts">
          <a href="mailto:help@rpgmaster.ai" class="sp-card">
            <span class="sp-card-icon">✉️</span>
            <strong>Email</strong>
            <span class="sp-card-detail">help@rpgmaster.ai</span>
          </a>
          <a href="https://discord.gg/bPrEUFtjnp" target="_blank" class="sp-card">
            <span class="sp-card-icon">💬</span>
            <strong>Discord</strong>
            <span class="sp-card-detail">Community support</span>
          </a>
        </div>
      </section>
    </main>

    <footer class="sp-footer">© 2026 MasterAI S.R.L.S. — <a href="/privacy">Privacy Policy</a> · <a href="/tos">Terms of Service</a></footer>
  </div>
</template>

<style scoped>
.sp-page {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  overflow-y: auto;
  background: #0e0e12;
  color: #d4d0c8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  z-index: 999;
}
.sp-page a { color: #c9a84c; text-decoration: none; background: none !important; }
.sp-page a:hover { text-decoration: underline; background: none !important; }

.sp-header {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(201,168,76,0.1);
}
.sp-logo { font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #c9a84c; letter-spacing: 1px; }
.sp-logo span { color: #8B2500; }
.sp-back { font-size: 13px; color: #6b6560 !important; }

.sp-main { max-width: 620px; margin: 0 auto; padding: 48px 24px 80px; }
.sp-main h1 { font-family: Georgia, serif; font-size: 28px; font-weight: 700; color: #e8e4dc; margin-bottom: 8px; text-align: left; }
.sp-subtitle { color: #7a7468; font-size: 15px; margin-bottom: 40px; }
.sp-section { margin-bottom: 48px; }
.sp-section h2 { font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #e8e4dc; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 1px solid rgba(201,168,76,0.12); text-align: left; }

.sp-field { margin-bottom: 18px; }
.sp-field label { display: block; font-size: 13px; color: #8a8078; margin-bottom: 6px; font-weight: 500; }
.sp-field input, .sp-field textarea, .sp-field select {
  width: 100%; padding: 12px 14px; background: #16161c;
  border: 1px solid #2a2a32; border-radius: 8px;
  color: #d4d0c8; font-size: 15px; font-family: inherit;
  transition: border-color 0.3s;
}
.sp-field input:focus, .sp-field textarea:focus, .sp-field select:focus { outline: none; border-color: rgba(201,168,76,0.5); }
.sp-field textarea { resize: vertical; min-height: 120px; }
.sp-field select option { background: #16161c; }

.sp-btn {
  display: block; width: 100%; padding: 14px;
  background: #c9a84c; color: #0e0e12;
  font-family: Georgia, serif; font-size: 14px; font-weight: 700;
  letter-spacing: 1px; border: none; border-radius: 8px;
  cursor: pointer; transition: all 0.3s;
}
.sp-btn:hover { background: #dbb960; box-shadow: 0 4px 16px rgba(201,168,76,0.2); }
.sp-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.sp-error { color: #e05555; font-size: 13px; margin-bottom: 12px; }

.sp-success {
  text-align: center; padding: 40px 20px;
  background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.2); border-radius: 12px;
}
.sp-success-icon { font-size: 48px; margin-bottom: 16px; color: #4caf50; }
.sp-success h3 { font-family: Georgia, serif; font-size: 20px; color: #c9a84c; margin-bottom: 8px; }
.sp-success p { color: #7a7468; font-size: 14px; }

.sp-faq { padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; }
.sp-faq:last-child { border-bottom: none; }
.sp-faq-q { display: flex; justify-content: space-between; align-items: center; font-weight: 600; color: #e8e4dc; font-size: 15px; }
.sp-faq-icon { color: #c9a84c; font-size: 18px; }
.sp-faq-a { color: #7a7468; font-size: 14px; line-height: 1.7; max-height: 0; overflow: hidden; transition: max-height 0.3s, padding 0.3s; }
.sp-faq-a.open { max-height: 200px; padding-top: 10px; }

.sp-contacts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.sp-card {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 20px; background: #16161c; border: 1px solid #2a2a32;
  border-radius: 10px; text-decoration: none !important; color: #d4d0c8 !important;
  transition: border-color 0.3s;
}
.sp-card:hover { border-color: rgba(201,168,76,0.3); background: #16161c !important; }
.sp-card-icon { font-size: 24px; margin-bottom: 4px; }
.sp-card strong { color: #e8e4dc; font-size: 14px; }
.sp-card-detail { font-size: 12px; color: #6b6560; }

.sp-footer { text-align: center; padding: 24px; border-top: 1px solid rgba(201,168,76,0.06); font-size: 12px; color: #3a3530; }

@media (max-width: 480px) {
  .sp-contacts { grid-template-columns: 1fr; }
  .sp-main h1 { font-size: 24px; }
}
</style>
