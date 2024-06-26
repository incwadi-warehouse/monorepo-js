<script setup>
import { computed } from 'vue'
import { useOrder } from '@/composables/useOrder.js'
import { useI18n } from 'vue-i18n'


const props = defineProps({
  order: Object,
})

const { t } = useI18n()

const { toLocaleDateString } = useOrder()

const printCustomer = () => {
  var content = document.getElementById('print_customer')
  var WinPrint = window.open(
    '',
    '',
    'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
  )
  WinPrint.document.write(content.innerHTML)
  WinPrint.document.close()
  WinPrint.focus()
  WinPrint.print()
  WinPrint.close()
}

const currency = (number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(number)
}

const sum = computed(() => {
  return props.order.books.reduce((prev, cur) => {
    return prev + cur.price
  }, 0)
})

const salutation = computed(() => {
  if (props.order.salutation == 'f') {
    return t('mrs')
  }
  if (props.order.salutation == 'm') {
    return t('mr')
  }

  return t('none_divers')
})
</script>

<template>
  <BContainer size="m">
    <h2>{{ $t('print') }}</h2>

    <BButton design="outline" @click="printCustomer">{{ $t('print') }}</BButton>
  </BContainer>

  <div id="print_customer" :style="{ display: 'none' }">
    <h2>
      {{ $t('order_from') }} {{ toLocaleDateString(props.order.createdAt) }}
    </h2>

    <p>{{ $t('salutation') }}: {{ salutation }}</p>
    <p>{{ $t('firstname') }}: {{ props.order.firstname }}</p>
    <p>{{ $t('surname') }}: {{ props.order.surname }}</p>
    <p>{{ $t('mail') }}: {{ props.order.mail }}</p>
    <p>{{ $t('phone') }}: {{ props.order.phone }}</p>
    <p>{{ $t('notes') }}: {{ props.order.notes }}</p>

    <h2>
      {{ $t('products') }}
    </h2>

    <table cellpadding="10">
      <thead>
        <tr>
          <th>{{ $t('title') }}</th>
          <th>{{ $t('author') }}</th>
          <th>{{ $t('genre') }}</th>
          <th>{{ $t('price') }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(product, index) in props.order.books" :key="index">
          <td>
            {{ product.title }}
          </td>
          <td>{{ product.author.surname }}, {{ product.author.firstname }}</td>
          <td>{{ product.genre.name }}</td>
          <td>{{ currency(product.price) }}</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colspan="3">
            {{ $t('grand_total') }}
          </td>
          <td>{{ currency(sum) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
