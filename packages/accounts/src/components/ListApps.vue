<script setup>
const catalog = import.meta.env.VUE_APP_CATALOG
const settings = import.meta.env.VUE_APP_SETTINGS
const orders = import.meta.env.VUE_APP_ORDERS
</script>

<template>
  <ul>
    <li>
      <a :href="catalog">{{ $t('catalog') }}</a>
    </li>
    <li>
      <a :href="settings">{{ $t('settings') }}</a>
    </li>
    <li>
      <a :href="orders">{{ $t('orders') }}</a>
    </li>
  </ul>
</template>
