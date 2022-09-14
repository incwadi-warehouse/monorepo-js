<script setup>
const catalog = import.meta.env.VUE_APP_CATALOG
const settings = import.meta.env.VUE_APP_SETTINGS
const orders = import.meta.env.VUE_APP_ORDERS
</script>

<template>
  <b-flex-row class="wrapper">
    <div class="apps">
      <a :href="catalog">{{ $t('catalog') }}</a>
    </div>
    <div class="apps">
      <a :href="settings">{{ $t('settings') }}</a>
    </div>
    <div class="apps">
      <a :href="orders">{{ $t('orders') }}</a>
    </div>
  </b-flex-row>
</template>

<style scoped>
.wrapper {
  justify-content: space-between;
  gap: 10px;
}
.apps {
  border: 1px solid var(--color-neutral-02);
  border-radius: 20px;
  width: 100%;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
}
</style>
