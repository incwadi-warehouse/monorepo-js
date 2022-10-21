<script setup>
const logo =
  import.meta.env.VUE_APP_LOGO !== 'false' ? import.meta.env.VUE_APP_LOGO : null
</script>

<template>
  <img :src="logo" alt="incwadi" v-if="logo" />
</template>
