<script setup>
const emit = defineEmits(['close'])
</script>

<template>
  <BContainer size="m">
    <p>{{ $t('request_successful') }}</p>
  </BContainer>

  <BContainer size="m">
    <BButton design="primary_wide" @click="$emit('close')">
      {{ $t('ok') }}
    </BButton>
  </BContainer>
</template>
