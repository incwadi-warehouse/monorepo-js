<script setup>
defineProps({
  showPride: Boolean,
})
</script>

<template>
  <div class="pride" v-if="showPride" />
</template>

<style scoped>
.pride {
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(240, 0, 0, 1) 0%,
    rgba(255, 128, 0, 1) 20%,
    rgba(255, 255, 0, 1) 40%,
    rgba(0, 121, 64, 1) 60%,
    rgba(64, 64, 255, 1) 80%,
    rgba(160, 0, 192, 1) 100%
  );
  width: 100%;
  height: 2px;
  z-index: 3;
}
</style>
