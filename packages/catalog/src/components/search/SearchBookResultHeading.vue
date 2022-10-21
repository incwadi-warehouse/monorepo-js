<template>
  <b-container size="l">
    <b-button
      design="primary"
      :style="{ float: 'right' }"
      @click.prevent="$emit('catalogue')"
      >{{ $t('catalog') }}</b-button
    >
    <h1>{{ $t('search') }}</h1>
  </b-container>
</template>
