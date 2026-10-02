<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import Home from './components/Home.vue'

// The homepage and the content pages (route meta `fullBleed`) have their own
// full-screen layout and navbar: the classic header stays on the other pages
// (privacy, tos, account-deletion, support, about).
const route = useRoute()
</script>

<template>
  <header v-if="route.path !== '/' && !route.meta.fullBleed">
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="125" height="125" />

    <div class="wrapper">
      <Home msg="MasterAi" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <!-- The content pages fade instead of bouncing: a scale-from-zero on a long page looks broken. -->
  <router-view v-slot="{ Component }">
    <transition :name="route.meta.fullBleed ? 'page-fade' : 'bounce'" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
