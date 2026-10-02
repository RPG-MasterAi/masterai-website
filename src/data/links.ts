// Store and community links — single source of truth for the whole site.
// Verified 2026-09-30. The App Store URL has no country code on purpose:
// Apple redirects each visitor to their own country store.
export const STORE = {
  android: 'https://play.google.com/store/apps/details?id=ai.rpgmaster.masterai',
  ios: 'https://apps.apple.com/app/id6744970225'
}

export const DISCORD = 'https://discord.gg/bPrEUFtjnp'

// Pages that exist. A menu entry is added here only when its page is live.
export const SITE_NAV = [
  { to: '/adventures', label: 'Adventures' },
  { to: '/classes', label: 'Classes' },
  { to: '/roadmap', label: 'Roadmap' }
]
