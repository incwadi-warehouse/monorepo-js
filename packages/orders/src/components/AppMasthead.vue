<script setup>
import AppLogo from '@/components/AppLogo.vue'

defineProps({
  auth: Object,
  orders: Object,
})

const catalog = import.meta.env.VUE_APP_CATALOG
const hasLogo = import.meta.env.VUE_APP_LOGO === 'false' ? false : true

const accounts = import.meta.env.VUE_APP_ACCOUNTS

const openProfile = () => {
  window.location = accounts
}
</script>

<template>
  <BMasthead>
    <BMastheadItem position="start" v-if="auth.state.isAuthenticated">
      <span @click="$emit('open-drawer')">
        <b-icon type="hamburger" />
      </span>
    </BMastheadItem>

    <BMastheadItem position="center">
      <a :href="catalog">
        <AppLogo v-if="hasLogo" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 200 200"
          class="logo"
          v-else
        >
          <path
            d="M 27.435547 9.8710938 C 17.706307 9.8710935 9.8710935 17.706307 9.8710938 27.435547 L 9.8710938 172.56445 C 9.8710935 182.29369 17.706307 190.12891 27.435547 190.12891 L 172.56445 190.12891 C 182.29369 190.12891 190.12891 182.29369 190.12891 172.56445 L 190.12891 27.435547 C 190.12891 17.706307 182.29369 9.8710938 172.56445 9.8710938 L 27.435547 9.8710938 z M 55 40 L 145 40 L 145 160 L 100 124 L 55 160 L 55 40 z "
          />
        </svg>
      </a>
    </BMastheadItem>

    <BMastheadItem position="end" v-if="auth.state.isAuthenticated">
      <BDropdown position="bottom" class="action">
        <template #selector>
          <span @click.prevent>
            <b-icon type="profile" />
          </span>
        </template>

        <BDropdownItem no-hover v-if="auth.state.me">
          {{ $t('hello') }}, {{ auth.state.me.username }}!
        </BDropdownItem>

        <BDropdownDivider />

        <BDropdownItem @click.prevent="openProfile()">
          {{ $t('settings') }}
        </BDropdownItem>
        <BDropdownItem @click.prevent="auth.logout()">
          {{ $t('logout') }}
        </BDropdownItem>
      </BDropdown>

      <span
        class="action"
        @click.prevent="$router.push({ name: 'order.list' })"
      >
        <BBadge :content="orders && orders.length" hide-empty>
          <BIcon type="euro" />
        </BBadge>
      </span>
    </BMastheadItem>
  </BMasthead>
</template>

<style scoped>
.logo {
  fill: var(--color-primary-10);
}
.action {
  float: right;
  margin-left: 20px;
}
</style>
