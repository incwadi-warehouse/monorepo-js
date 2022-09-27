<script setup>
import { useArticle } from '../../composables/useArticle.js'
import { useRecommendation } from '@/composables/useRecommendation.js'

const { formatPrice, formatAuthor } = useArticle()

const { recommendations } = useRecommendation()
</script>

<template>
  <b-slider v-if="recommendations">
    <b-slider-item
      size="xs"
      v-for="article in recommendations"
      :key="article.id"
    >
      <div class="article">
        <div class="image_wrapper">
          <router-link :to="{ name: 'article', params: { id: article.id } }">
            <img
              class="image"
              :src="article.cover_l"
              :alt="article.title"
              v-if="article.cover_l"
            />
          </router-link>
        </div>

        <p class="author">
          {{ formatAuthor(article.authorFirstname, article.authorSurname) }}
        </p>

        <div :style="{ flexGrow: '1' }">
          <router-link
            :to="{ name: 'article', params: { id: article.id } }"
            class="title"
          >
            {{ article.title }}
          </router-link>
        </div>

        <b-button
          class="price"
          design="text"
          :style="{ alignSelf: 'flex-start' }"
          @click="$router.push({ name: 'article', params: { id: article.id } })"
        >
          {{ formatPrice(article.price) }} {{ article.currency }}
        </b-button>
      </div>
    </b-slider-item>
  </b-slider>
</template>

<style scoped>
.article {
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
