<script setup>
defineProps({
  id: String,
})
</script>

<template>
  <BContainer size="m">
    <h2>{{ $t('delete') }}</h2>

    <BFormGroup>
      <BFormItem>
        <BButton
          type="button"
          design="outline_danger"
          @click="$emit('remove', id)"
          :style="{ marginRight: '10px' }"
        >
          {{ $t('delete') }}
        </BButton>
      </BFormItem>
    </BFormGroup>
  </BContainer>
</template>
