<script setup>
import { useBook } from '@/composables/useBook.js'
import { useFilter } from '@/composables/useFilter.js'
import SearchDirection from './SearchDirection.vue'

defineProps({
  books: Object,
  filter: Object,
  hasInventory: Boolean,
  showCover: Boolean,
})

const image = (id) => {
  return (
    import.meta.env.VUE_APP_API +
    '/api/public/book/cover/' +
    id +
    '_100x100.jpg'
  )
}

const formatAuthor = (author) => {
  if (null === author) return ''
  if (author.firstname === '') {
    return author.surname
  }
  return author.surname + ', ' + author.firstname
}

const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString()
}

const formatPrice = (price) => {
  return Number.parseFloat(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const { find, found, notfound } = useBook()
const { filter } = useFilter()

const bookFound = (id) => {
  found(id).then(() => {
    find({ options: filter })
  })
}

const bookNotFound = (id) => {
  notfound(id).then(() => {
    find({ options: filter })
  })
}
</script>

<template>
  <table :aria-label="$t('books')">
    <thead>
      <tr>
        <th scope="col" v-if="showCover">{{ $t('cover') }}</th>
        <th scope="col">
          <SearchDirection
            col="title"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('title') }}
          </SearchDirection>
        </th>
        <th scope="col">
          <SearchDirection
            col="author"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('author') }}
          </SearchDirection>
        </th>
        <th scope="col">
          <SearchDirection
            col="genre"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('genre') }}
          </SearchDirection>
        </th>
        <th scope="col">
          <SearchDirection
            col="added"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('added') }}
          </SearchDirection>
        </th>
        <th scope="col" v-if="filter.availability.includes('sold')">
          <SearchDirection
            col="sold"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('sold') }}
          </SearchDirection>
        </th>
        <th scope="col" v-if="filter.availability.includes('removed')">
          <SearchDirection
            col="removed"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('removed') }}
          </SearchDirection>
        </th>
        <th scope="col">
          <SearchDirection
            col="format"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('format') }}
          </SearchDirection>
        </th>
        <th scope="col">
          <SearchDirection
            col="releaseYear"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('year') }}
          </SearchDirection>
        </th>
        <th scope="col">
          <SearchDirection
            col="price"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('price') }}
          </SearchDirection>
        </th>
        <th scope="col"></th>
        <th scope="col" v-if="hasInventory"></th>
        <th scope="col" v-if="hasInventory"></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in books.books" :key="item.id">
        <td
          v-if="showCover"
          :style="{ cursor: 'pointer' }"
          @click="
            $router.push({
              name: 'book.update',
              params: { id: item.id },
            })
          "
        >
          <img :src="image(item.id)" width="100" alt="Cover" />
        </td>
        <td
          :style="{ cursor: 'pointer' }"
          @click="
            $router.push({
              name: 'book.update',
              params: { id: item.id },
            })
          "
        >
          {{ item.title }}
        </td>
        <td>{{ formatAuthor(item.author) }}</td>
        <td>{{ item.genre.name }}</td>
        <td>{{ formatDate(item.added) }}</td>
        <td v-if="filter.availability.includes('sold')">
          {{ item.sold ? formatDate(item.soldOn) : '' }}
        </td>
        <td v-if="filter.availability.includes('removed')">
          {{ item.removed ? formatDate(item.removedOn) : '' }}
        </td>
        <td>{{ item.format ? item.format.name : null }}</td>
        <td>{{ item.releaseYear }}</td>
        <td>{{ formatPrice(item.price) }}</td>
        <td>
          <b-dropdown>
            <template #selector>
              <b-icon type="meatballs" />
            </template>
            <b-dropdown-item
              icon="pencil"
              @click="
                $router.push({
                  name: 'book.update',
                  params: { id: item.id },
                })
              "
            >
              {{ $t('edit') }}
            </b-dropdown-item>
            <b-dropdown-item
              icon="dollar"
              @click="$emit('sell', item.id)"
              v-if="!item.sold"
            >
              {{ $t('sell') }}
            </b-dropdown-item>
            <b-dropdown-item
              icon="bin"
              @click="$emit('remove', item.id)"
              v-if="!item.removed"
            >
              {{ $t('remove') }}
            </b-dropdown-item>
            <b-dropdown-item
              icon="cart"
              @click="$emit('add-to-cart', item)"
              v-if="!item.reserved"
            >
              {{ $t('cart') }}
            </b-dropdown-item>
          </b-dropdown>
        </td>
        <td v-if="hasInventory">
          <b-button design="text" @click.prevent="bookFound(item.id)">
            <b-icon
              type="check"
              color="var(--color-primary-10)"
              v-if="item.inventory"
            />
            <b-icon type="check" v-else />
          </b-button>
        </td>
        <td v-if="hasInventory">
          <b-button design="text" @click.prevent="bookNotFound(item.id)">
            <b-icon
              type="close"
              color="var(--color-primary-10)"
              v-if="false === item.inventory"
            />
            <b-icon type="close" v-else />
          </b-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
thead {
  position: sticky;
  top: var(--masthead-top-height);
  background: var(--color-neutral-00);
  z-index: 2;
  cursor: pointer;
}
th:first-child {
  min-width: 200px;
}
td:first-child {
  position: sticky;
  left: 20px;
  z-index: 1;
  background: var(--color-neutral-00);
}
</style>
