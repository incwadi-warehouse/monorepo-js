<script setup>
import { useArticle } from '../../composables/useArticle.js'
import { useRecommendation } from '@/composables/useRecommendation.js'

const { formatPrice, formatAuthor } = useArticle()

const { recommendations } = useRecommendation()
</script>

<template>
  <BSlider v-if="recommendations">
    <BSliderItem size="xs" v-for="product in recommendations" :key="product.id">
      <div class="product">
        <div class="image_wrapper">
          <RouterLink :to="{ name: 'product', params: { id: product.id } }">
            <img
              class="image"
              :src="product.cover_l"
              :alt="product.title"
              v-if="product.cover_l"
            />
          </RouterLink>
        </div>

        <p class="author">
          {{ formatAuthor(product.authorFirstname, product.authorSurname) }}
        </p>

        <div :style="{ flexGrow: '1' }">
          <RouterLink
            :to="{ name: 'product', params: { id: product.id } }"
            class="title"
          >
            {{ product.title }}
          </RouterLink>
        </div>

        <BButton
          class="price"
          design="text"
          :style="{ alignSelf: 'flex-start' }"
          @click="$router.push({ name: 'product', params: { id: product.id } })"
        >
          {{ formatPrice(product.price) }} {{ product.currency }}
        </BButton>
      </div>
    </BSliderItem>
  </BSlider>
</template>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  height: 420px;
}
.image_wrapper {
  background: var(--color-neutral-02);
  height: 240px;
  text-align: center;
}
.image {
  width: auto;
  max-height: 100%;
}
.title {
  display: -webkit-box;
  padding: 0;
  overflow: hidden;
  font-weight: bold;
  cursor: pointer;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  color: var(--color-neutral-10);
  hyphens: auto;
}
.title:hover {
  color: var(--color-neutral-06);
}
.author {
  display: -webkit-box;
  padding: 0;
  margin: 10px 0;
  overflow: hidden;
  font-size: 0.8rem;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
.price {
  padding-left: 0;
  font-weight: 600;
}
</style>
