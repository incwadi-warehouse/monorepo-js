<script setup>
import { useTitle } from '@baldeweg/ui'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import Cookies from 'js-cookie'
import { useConf } from 'shared'
import SearchScrollToTop from '../components/search/SearchScrollToTop.vue'
import SearchReservations from '../components/search/SearchReservations.vue'
import SearchBookResultHeading from '../components/search/SearchBookResultHeading.vue'
import SearchCart from '../components/search/SearchCart.vue'
import SearchBookResult from '../components/search/SearchBookResult.vue'
import SearchAuthorResult from '../components/search/SearchAuthorResult.vue'
import SearchFilter from '../components/search/SearchFilter.vue'
import SearchSearchbar from './../components/search/SearchSearchbar.vue'
import { useSearch } from './../composables/useSearch.js'
import BookCreate from '@/components/book/BookCreate.vue'
import BookEdit from '@/components/book/BookEdit.vue'

useTitle({ title: 'Search' })

const props = defineProps({
  auth: Object,
  query: Object,
  id: String,
})

const { modal } = useSearch(props)

const router = useRouter()

const closeModal = (event) => {
  if (event === 'overlay') return

  modal.value = null
  router.push({ name: 'search' })
}

// Beach
const showBeach = ref(false)

const { getConf } = useConf(
  Cookies.get('token'),
  import.meta.env.VUE_APP_CONF_API,
  'user',
  props.auth.state.me.id
)

getConf('beach').then((res) => {
  showBeach.value = res
})
</script>

<template v-if="auth.state.me">
  <SearchReservations />

  <SearchCart />

  <SearchBookResultHeading @catalogue="modal = 'create'" />

  <SearchSearchbar @filter="modal = 'filter'" />

  <SearchBookResult />

  <SearchAuthorResult />

  <BContainer size="m" v-if="showBeach">
    <svg
      width="100%"
      height="50%"
      viewBox="0 0 500 250"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <path
        class="beach"
        d="m 271.44781,224.85463 h 5.21238 v 5.19502 h -5.21238 z m 0.009,-0.003 h 106.35678 v 5.20709 H 271.45644 Z M 260,215.63327 h 101.03893 v 5.20709 H 260 Z m 99.66255,0.1774 30.81982,-8.08614 1.37637,5.02965 -30.81981,8.08614 z M 271.45644,224.85144 264.57441,250 h 5.50583 l 6.51228,-23.80103 z m 106.35678,0 L 384.69525,250 h -5.50584 l -6.51227,-23.80101 z M 45.523798,46 C 45.523798,31.67273 34.04609,19.96506 20,19.96461 v 8.67761 C 29.44791,28.64268 37.016417,36.36292 37.016417,46 Z M 62.542709,19.96546 C 48.496513,19.96546 37.018531,31.67285 37.018077,46 h 8.507381 c 4.47e-4,-9.63696 7.569233,-17.35693 17.017251,-17.35693 z m 94.034161,122.2481 h 6.38141 V 250 h -6.38141 z m 0,-87.47892 h 6.38141 v 9.37274 h -6.38141 z m 3.19071,9.37275 a 79.767588,78.106165 0 0 0 -0.0654,0.003 c 0.0223,-10e-5 0.0442,-0.002 0.0665,-0.002 0.18385,0 0.36585,0.0114 0.5484,0.0183 a 79.767588,78.106165 0 0 0 -0.54944,-0.0193 z m 0.97321,0.0335 c 4.76654,0.32171 9.07564,2.98947 12.65167,6.95227 3.8175,4.23039 7.02412,10.03356 9.7061,17.06029 5.36396,14.05349 8.57605,33.06443 8.57605,54.05905 v 0.001 h 47.86055 A 79.767588,78.106165 0 0 0 160.74079,64.1409 Z m -2.2175,0.0275 A 79.767588,78.106165 0 0 0 80,142.21356 h 47.86158 v -0.001 c 0,-20.99462 3.21418,-40.00557 8.57814,-54.05903 2.68197,-7.02673 5.88651,-12.8299 9.70401,-17.0603 3.50704,-3.88634 7.72212,-6.52088 12.37956,-6.9248 z m 1.24532,6.49155 c -2.73399,0 -5.59479,1.42897 -8.61137,4.77181 -3.01657,3.34283 -5.96375,8.50124 -8.45037,15.01611 -4.97322,13.02975 -8.15436,31.43172 -8.15436,51.76466 v 10e-4 h 50.43015 v -10e-4 c 0,-20.33294 -3.17803,-38.73491 -8.15126,-51.76466 -2.48661,-6.51487 -5.43692,-11.67328 -8.45349,-15.01611 -3.01658,-3.34284 -5.8753,-4.77181 -8.6093,-4.77181 z m 310.66744,13.60045 -4.70035,4.60245 -56.4042,-55.2294 4.70035,-4.60244 z M 465.7357,29.031 l 4.70033,4.60245 -56.40418,55.22939 -4.70035,-4.60244 z m 14.03188,26.66151 v 6.50885 H 400 V 55.69251 Z M 436.56015,19.89385 h 6.6473 V 98 h -6.6473 z m 29.9129,39.05308 a 26.589194,26.035387 0 0 1 -26.5892,26.03538 26.589194,26.035387 0 0 1 -26.58919,-26.03538 26.589194,26.035387 0 0 1 26.58919,-26.03539 26.589194,26.035387 0 0 1 26.5892,26.03539 z"
      />
    </svg>
  </BContainer>

  <SearchScrollToTop />

  <SearchFilter :auth="auth" @close="modal = null" v-if="modal == 'filter'" />

  <BookEdit
    :book-id="id"
    :me="auth.state.me"
    @close="closeModal"
    v-if="modal == 'update'"
  />

  <KeepAlive>
    <BookCreate
      :me="auth.state.me"
      @close="closeModal"
      v-if="modal == 'create'"
    />
  </KeepAlive>
</template>

<style scoped>
.beach {
  fill: var(--color-primary-10);
}
</style>
