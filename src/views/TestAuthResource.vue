<script setup>
import { ref } from 'vue'
import { get } from '@/utils/http'
import { api } from '@/config/index'

const message = ref()

const fetchAuthResource = async () => {
  try {
    const response = await get({
      url: api.test.AuthResource
    })

    message.value = response.data.message
  } catch (error) {
    console.error('Error fetching Auth Resource:', error)
  }
}
</script>

<template>
  <p>Test Auth Resource page</p>
  <p>Message: {{ message }}</p>
  <button @click="fetchAuthResource">Fetch Auth Resource</button>
</template>
