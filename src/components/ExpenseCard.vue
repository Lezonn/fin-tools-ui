<script setup>
import { computed } from 'vue'

const props = defineProps({
  expense: Object
})

const title = computed(() => {
  const date = new Date(props.expense.expense_date * 1000)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  })

  const expenseAmount = formatter.format(props.expense.amount)

  return date.getUTCDay() + '/' + date.getUTCMonth() + ' - ' + expenseAmount
})
</script>

<template>
  <v-card
    class="card"
    :title="title"
    :subtitle="expense.expense_category_name"
    :text="expense.note"
  ></v-card>
</template>

<style>
.card {
  width: 500px;
}
</style>
