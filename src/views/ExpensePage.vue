<script setup>
import { ref, onMounted } from 'vue'
import { useExpenseStore } from '@/stores/expense'

import ExpenseCard from '@/components/ExpenseCard.vue'

const expenseStore = useExpenseStore()
const openAddExpense = ref(false)
const isFetchCategory = ref(false)
const expenses = ref([])
const expenseCategories = ref([])
const selectedCategory = []

const toggleAddExpense = () => {
  openAddExpense.value = !openAddExpense.value
  getExpenseCategory()
}

const getExpenseCategory = () => {
  if (expenseStore.expenseCategories) {
    expenseCategories.value = expenseStore.expenseCategories
    return
  }
  fetchCategory()
}

const fetchCategory = () => {
  if (isFetchCategory.value) {
    return
  }
  expenseStore.getAllExpenseCategories({
    success: fetchCategorySuccess,
    fail: fetchCategoryFailed
  })
  isFetchCategory.value = false
}

const fetchCategorySuccess = () => {
  expenseCategories.value = expenseStore.expenseCategories
}

const fetchCategoryFailed = () => {
  console.log('fetch category failed')
}

const fetchExpense = () => {
  expenseStore.getAllExpenses({
    success: fetchExpenseSuccess,
    fail: fetchExpenseFailed
  })
}

const fetchExpenseSuccess = () => {
  expenses.value = expenseStore.expenses
}

const fetchExpenseFailed = () => {
  console.log('fetch expenses failed')
}

onMounted(() => {
  fetchExpense()
})
</script>

<template>
  <v-container class="d-flex justify-center">
    <div class="d-flex flex-column justify-center">
      <v-btn block @click="toggleAddExpense">Add Expense</v-btn>
      <div v-if="openAddExpense">
        <p>test</p>
        <v-combobox
          label="Category"
          :v-model="selectedCategory"
          :items="expenseCategories"
          item-value="id"
          item-title="name"
          :return-object="true"
        ></v-combobox>
        <input type="text" />
      </div>
      <div class="mt-4">
        <expense-card
          class="mt-1"
          v-for="expense in expenses"
          :key="expense.id"
          :expense="expense"
        ></expense-card>
      </div>
    </div>
  </v-container>
</template>
