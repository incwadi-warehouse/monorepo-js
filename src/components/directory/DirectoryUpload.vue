<script setup>
import { useDirectory } from './../../composables/useDirectory.js'

const emit = defineEmits([])

const { isUploading, isDragging, uploadImage } = useDirectory(emit)
</script>

<template>
  <b-spinner size="l" v-if="isUploading" />
  <b-form enctype="multipart/form-data" @submit.prevent v-else>
    <b-form-group>
      <b-form-item>
        <b-form-label for="image">{{ $t('upload_image') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-helpline>
          {{ $t('allowed_extensions') }}: jpg, jpeg, png, webp &bull;
          {{ $t('max_size') }}: 10MB
        </b-form-helpline>
      </b-form-item>
      <b-form-item class="upload" :class="{ isDragging }">
        <p class="text">
          {{ $t('drop_the_file_in_this_area_or_click_here') }}
        </p>
        <div
          class="droparea"
          @dragover="isDragging = true"
          @dragenter="isDragging = true"
          @dragleave="isDragging = false"
          @dragend="isDragging = false"
          @drop="isDragging = false"
        >
          <b-form-input
            type="file"
            id="image"
            @change="uploadImage"
            event
            accept="image/jpeg, image/jpg, image/png, image/webp, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            class="input"
          />
        </div>
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<style scoped>
.upload {
  position: relative;
  height: 300px;
  border: 1px solid var(--color-neutral-04);
  border-radius: 20px;
}
.upload.isDragging,
.upload:hover {
  border: 1px solid var(--color-primary-10);
}
.text {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
}
.droparea {
  position: absolute;
  width: 100%;
  height: 100%;
}
.input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.001;
}
</style>
