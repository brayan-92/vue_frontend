<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-indigo-700">✍️ Registrar Escritor</h2>
      <form @submit.prevent="addWriter" class="flex flex-col space-y-4">
        <input
          v-model="form.nombre"
          placeholder="Nombre"
          required
          class="input-field"
        />
        <input
          v-model="form.apellido"
          placeholder="Apellido"
          required
          class="input-field"
        />
        <input
          v-model="form.nacionalidad"
          placeholder="Nacionalidad"
          required
          class="input-field"
        />
        <input
          v-model.number="form.edad"
          type="number"
          placeholder="Edad"
          required
          class="input-field"
        />
        <button
          type="submit"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl shadow transition duration-300"
        >
          ➕ Agregar Escritor
        </button>
      </form>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">📚 Escritores Registrados</h3>
        <ul class="space-y-1 text-sm text-gray-700">
          <li v-for="w in writers" :key="w.id">
            {{ w.nombre }} {{ w.apellido }} ({{ w.nacionalidad }}, {{ w.edad }} años)
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getWriters, createWriter, Writer } from '../services/api'

const writers = ref<Writer[]>([])
const form = ref({ nombre: '', apellido: '', nacionalidad: '', edad: 0 })

const fetchWriters = async () => {
  writers.value = await getWriters()
}

const addWriter = async () => {
  await createWriter(form.value)
  form.value = { nombre: '', apellido: '', nacionalidad: '', edad: 0 }
  fetchWriters()
}

onMounted(fetchWriters)
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none;
}
</style>
