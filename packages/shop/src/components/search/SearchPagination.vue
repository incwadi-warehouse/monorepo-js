<script setup>
import { useRouter } from 'vue-router'
import { toRefs } from 'vue'

const props = defineProps({
  pages: Number,
  page: {
    type: Number,
    default: 1,
  },
})

const { page, pages } = toRefs(props)

const router = useRouter()

const route = (p) => {
  if (p < 1 || p > pages.value || p === page.value) return

  router.push({
    name: 'search',
    query: Object.assign({}, router.currentRoute.value.query, { page: p }),
  })
  window.scrollTo(0, 0)
}
</script>

<template>
  <div class="wrapper">
    <ul class="pagination">
      <li class="item back" @click="route(page - 1)">&lt; {{ $t('back') }}</li>
      <li class="item forward" @click="route(page + 1)">
        {{ $t('forward') }} &gt;
      </li>
      <ul class="page">
        <li class="item" @click="route(1)" v-if="1 != page">1</li>
        <li class="item isSelected" @click="route(page)">
          {{ page }}
        </li>
        <li class="item" @click="route(pages)" v-if="pages != page">
          {{ pages }}
        </li>
      </ul>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  text-align: center;
}
.pagination {
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 0;
}
.item {
  display: inline-block;
  border-radius: 5px;
  border: 1px solid var(--color-neutral-02);
  padding: 3px 10px;
  margin: 0 10px;
  cursor: pointer;
}
.item.isSelected {
  border: 1px solid var(--color-primary-10);
  color: var(--color-primary-10);
}
.item:hover {
  border: 1px solid var(--color-primary-10);
}
ul ul {
  padding: 0;
}

@media all and (min-width: 500px) {
  .pagination {
    display: flex;
    justify-content: center;
  }
  .back {
    order: 1;
  }
  .forward {
    order: 3;
  }
  .page {
    order: 2;
  }
}
</style>
