<template>
  <BContainer size="m">
    <p>{{ $t('cart_is_empty') }}</p>
  </BContainer>

  <BContainer size="m">
    <BButton design="outline_wide" @click="$emit('close')">{{ $t('browse') }}</BButton>
  </BContainer>
</template>
