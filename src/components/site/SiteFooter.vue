<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { DISCORD, SITE_NAV, STORE } from '@/data/links'
</script>

<template>
  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">MASTER<span class="red">AI</span></div>
        <p class="footer-tag">The ultimate AI-powered RPG.<br />Your imagination is the only limit.</p>
      </div>
      <div>
        <h4 class="footer-head">Explore</h4>
        <div class="footer-col">
          <RouterLink v-for="item in SITE_NAV" :key="item.to" :to="item.to" class="footer-link">
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
      <div>
        <h4 class="footer-head">Connect</h4>
        <div class="footer-col">
          <a :href="DISCORD" class="footer-link">Discord</a>
          <a :href="STORE.android" class="footer-link">Google Play</a>
          <a :href="STORE.ios" class="footer-link">App Store</a>
          <RouterLink to="/support" class="footer-link">Support</RouterLink>
          <a href="mailto:info@rpgmaster.ai" class="footer-link">Contact</a>
        </div>
      </div>
      <div>
        <h4 class="footer-head">Legal</h4>
        <div class="footer-col">
          <RouterLink to="/privacy" class="footer-link">Privacy Policy</RouterLink>
          <RouterLink to="/tos" class="footer-link">Terms of Service</RouterLink>
        </div>
      </div>
    </div>
    <div class="gold-divider-wide" />
    <div class="copyright">
      <p>© 2026 MasterAI — RPGMaster.ai. All rights reserved.</p>
      <!-- Company details required by Italian law; same wording as the old site (TheWelcome.vue, "Company info"). -->
      <p class="company">
        MASTERAI S.R.L.S. · Via degli Aceri 77, 00172 Rome ·
        Italy Tax Code / VAT Number: 17291571002 · Share Capital: €500.00 fully paid
      </p>
      <!-- Attribution required by the CC-BY-4.0 licence of the SRD 5.1 (class, subclass and rules names). -->
      <p class="srd">
        This work includes material taken from the System Reference Document 5.1 ("SRD 5.1") by Wizards of
        the Coast LLC, available at
        <a href="https://dnd.wizards.com/resources/systems-reference-document" class="srd-link">dnd.wizards.com</a>.
        The SRD 5.1 is licensed under the
        <a href="https://creativecommons.org/licenses/by/4.0/legalcode" class="srd-link">Creative Commons Attribution 4.0 International License</a>.
        MasterAI is not affiliated with or endorsed by Wizards of the Coast.
      </p>
    </div>
  </footer>
</template>

<!-- `footer.site-footer` outranks the homepage reset (`.home *`: margin and padding 0), which also reaches
     this footer: every rule that sets a margin or a padding starts with it. -->
<style scoped>
footer.site-footer {
  padding: 60px 20px 40px;
  border-top: 1px solid rgba(201, 168, 76, 0.1);
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Crimson Text', Georgia, serif;
}
footer.site-footer .footer-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 40px; margin-bottom: 40px;
}
footer.site-footer .footer-brand { font-family: 'Cinzel Decorative', serif; font-size: 20px; font-weight: 900; color: #c9a84c; margin: 0 0 16px; }
.red { color: #8b2500; }
.footer-tag { font-size: 13px; line-height: 1.7; color: #6b6b6b; margin: 0; }
footer.site-footer .footer-head {
  font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 3px; color: #6b6b6b;
  text-transform: uppercase; margin: 0 0 16px; font-weight: 400;
}
.footer-col { display: flex; flex-direction: column; gap: 10px; }
.footer-link { color: #6b6b6b; font-size: 13px; transition: color 0.3s; text-decoration: none; }
.footer-link:hover { color: #c9a84c; background-color: transparent; }
.gold-divider-wide {
  width: 100%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.3) 20%, rgba(201, 168, 76, 0.3) 80%, transparent);
}
footer.site-footer .copyright { text-align: center; padding-top: 24px; }
.copyright p { font-size: 12px; color: #555; letter-spacing: 1px; margin: 0; }
footer.site-footer .copyright .company { margin-top: 8px; font-size: 11px; line-height: 1.6; }
footer.site-footer .copyright .srd { max-width: 760px; margin: 16px auto 0; font-size: 11px; line-height: 1.6; letter-spacing: 0; color: #4a4a4a; }
.srd-link { color: #6b6b6b; text-decoration: underline; }
.srd-link:hover { color: #c9a84c; background-color: transparent; }
</style>
