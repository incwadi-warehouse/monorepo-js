<script setup>
import { useProduct } from '../../composables/useProduct.js'

const { articles, formatPrice, formatAuthor, image } = useProduct()
</script>

<template>
  <div v-if="articles">
    <BList v-for="article in articles" :key="article.id" divider>
      <template #image>
        <RouterLink :to="{ name: 'product', params: { id: article.id } }">
          <img
            width="100"
            :src="image(article.id, '100x100')"
            :alt="article.title"
          />
        </RouterLink>
      </template>

      <template #title>
        <RouterLink
          :to="{ name: 'product', params: { id: article.id } }"
          :style="{ wordBreak: 'initial', hyphens: 'auto' }"
        >
          {{ article.title }}
        </RouterLink>
      </template>

      <template #options>
        <BButton
          design="text"
          @click="$router.push({ name: 'product', params: { id: article.id } })"
        >
          {{ formatPrice(article.price) }} {{ article.currency }}
        </BButton>
      </template>

      <template #meta>
        {{ formatAuthor(article.authorFirstname, article.authorSurname) }}
        &bull;
        {{ article.genre }}
        &bull;
        {{ article.format_name }}
        &bull;
        {{ article.releaseYear ? article.releaseYear : $t('without_year') }}
      </template>
    </BList>
  </div>
</template>
