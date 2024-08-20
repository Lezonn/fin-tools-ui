<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/')
}

const isPathActive = (path) => {
  return route.path === path
}
</script>

<template>
  <header class="d-flex justify-center position-fixed w-100">
    <nav>
      <ul>
        <li>
          <router-link to="/" :class="{ 'navbar-active': isPathActive('/') }">Home</router-link>
          <router-link
            v-if="authStore.isAuthenticated"
            to="/expenses"
            :class="{ 'navbar-active': isPathActive('/expenses') }"
            >Expense</router-link
          >
          <router-link
            v-if="!authStore.isAuthenticated"
            to="/login"
            :class="{ 'navbar-active': isPathActive('/login') }"
            >Login</router-link
          >
          <router-link @click="logout" v-if="authStore.isAuthenticated" to="/logout"
            >Logout</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

header {
  top: 0;
  z-index: 1000;
}

nav {
  display: flex;
  border-radius: 50px;
  height: 56px;
  align-items: center;
  transition: all 0.3s ease-out;
  margin-top: $--spacing-xs;

  ul > li > a {
    font-weight: 600;
    position: relative;
    color: $--color-dark-light;
    margin: $--spacing-xxs;
    padding: $--spacing-xxs;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 5px;
      width: 100%;
      height: 2px;
      background: rgba(0, 0, 0, 0.5);
      transform: scaleX(0);
      transition: transform 0.3s ease;
      transform-origin: right;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
}

.navbar-active {
  color: red;
}
</style>
