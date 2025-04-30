<script setup>
import { useToast } from '@/composables/useToast.js'
import { useReservation } from '@/composables/useReservation.js'
import { computed } from 'vue'
import { useCart } from '@/composables/useCart.js'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['nextStep', 'prevStep'])

const orderInfo = import.meta.env.VITE_ORDER_INFO

const { reservation, isCreating, create } = useReservation()
const { cart } = useCart()
const { add: addToast } = useToast()

reservation.value.books = computed(() => cart.value?.map(element => element.id).join(',') || '')

const { t } = useI18n()

const reserve = () => {
  create()
    .then(() => emit('nextStep'))
    .catch(() => {
      addToast({
        type: 'error',
        body: t('request_error'),
      })
    })
}

const goBack = () => emit('prevStep')
</script>

<template>
  <BContainer size="m">
    <BForm @submit.prevent="reserve">
      <BFormGroup>
        <BFormItem>
          <BFormLabel>
            <input type="radio" name="salutation" value="f" required v-model="reservation.salutation"> {{ $t('mrs') }}
          </BFormLabel>
          <BFormLabel :style="{marginLeft: '20px'}">
            <input type="radio" name="salutation" value="m" required v-model="reservation.salutation"> {{ $t('mr') }}
          </BFormLabel>
          <BFormLabel :style="{marginLeft: '20px'}">
            <input type="radio" name="salutation" value="d" required v-model="reservation.salutation"> {{
            $t('none_diverse') }}
          </BFormLabel>
        </BFormItem>
      </BFormGroup>

      <BFormGroup>
        <BFormItem>
          <BFormLabel for="firstname">{{ $t('firstname') }}</BFormLabel>
        </BFormItem>
        <BFormItem>
          <BFormInput id="firstname" required v-model="reservation.firstname" />
        </BFormItem>
      </BFormGroup>

      <BFormGroup>
        <BFormItem>
          <BFormLabel for="surname">{{ $t('surname') }}</BFormLabel>
        </BFormItem>
        <BFormItem>
          <BFormInput id="surname" required v-model="reservation.surname" />
        </BFormItem>
      </BFormGroup>

      <BFormGroup>
        <BFormItem>
          <BFormLabel for="mail">{{ $t('mail') }}</BFormLabel>
        </BFormItem>
        <BFormItem>
          <BFormInput type="email" id="mail" required v-model="reservation.mail" />
        </BFormItem>
      </BFormGroup>

      <BFormGroup>
        <BFormItem>
          <BFormLabel for="phone">{{ $t('phone') }} ({{ $t('optional') }})</BFormLabel>
        </BFormItem>
        <BFormItem>
          <BFormInput type="tel" id="phone" v-model="reservation.phone" />
        </BFormItem>
      </BFormGroup>

      <BFormGroup>
        <BFormItem>
          <BFormLabel for="notes">{{ $t('notes') }} ({{ $t('optional') }})</BFormLabel>
        </BFormItem>
        <BFormItem>
          <BFormTextarea id="notes" v-model="reservation.notes" />
        </BFormItem>
      </BFormGroup>

      <p v-if="orderInfo" :style="{ marginBottom: '20px' }">{{ orderInfo }}</p>

      <BFormGroup buttons>
        <BButton type="button" design="outline_wide" @click.prevent="goBack" :style="{ marginBottom: '20px' }">
          {{ $t('back') }}
        </BButton>
        <BButton type="button" design="text" v-if="isCreating">
          <BSpinner size="m" />
        </BButton>
        <BButton type="submit" design="primary_wide" v-else>
          {{ $t('reserve') }}
        </BButton>
      </BFormGroup>
    </BForm>
  </BContainer>
</template>
