<script setup>
import { ref } from 'vue'

const openAddExpense = ref(false)
const isFetchCategory = ref(false)

const toggleAddExpense = () => {
  if (!isFetchCategory.value) {
    isFetchCategory.value = true
    fetchCategory()
  }
  openAddExpense.value = !openAddExpense.value
}

const fetchCategory = async () => {}
</script>

<template>
  <v-container class="d-flex justify-center">
    <div class="d-flex flex-column justify-center">
      <button @click="toggleAddExpense">Add Expense</button>
      <div v-if="openAddExpense">
        <p>test</p>
        <v-combobox
          clearable
          label="Combobox"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        ></v-combobox>
        <input type="text" />
      </div>
    </div>
  </v-container>
</template>
