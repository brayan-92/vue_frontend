<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-emerald-700">📖 Registrar Libro</h2>
      <form @submit.prevent="addBook" class="flex flex-col space-y-4">
        <input
          v-model="form.nombre"
          placeholder="Título del libro"
          required
          class="input-field"
        />
        <input
          v-model="form.genero"
          placeholder="Género"
          required
          class="input-field"
        />
        <input
          v-model.number="form.añoPublicacion"
          type="number"
          placeholder="Año de publicación"
          required
          class="input-field"
        />
        <select
          v-model.number="form.author.id"
          required
          class="input-field bg-white"
        >
          <option disabled value="0">Selecciona autor</option>
          <option v-for="w in writers" :key="w.id" :value="w.id">
            {{ w.nombre }} {{ w.apellido }}
          </option>
        </select>
        <button
          type="submit"
          class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-xl shadow transition duration-300"
        >
          ➕ Agregar Libro
        </button>
      </form>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">📚 Libros Registrados</h3>
        <ul class="space-y-1 text-sm text-gray-700">
          <li v-for="b in books" :key="b.id">
            "{{ b.nombre }}" por {{ b.author.nombre }} {{ b.author.apellido }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getBooks, createBook, getWriters, Book, Writer } from '../services/api'

const books = ref<Book[]>([])
const writers = ref<Writer[]>([])

const form = ref({
  nombre: '',
  genero: '',
  añoPublicacion: 0,
  author: {
    id: 0
  }
})

const fetchWriters = async () => {
  writers.value = await getWriters()
}

const fetchBooks = async () => {
  books.value = await getBooks()
}

const addBook = async () => {
  await createBook(form.value)
  form.value = {
    nombre: '',
    genero: '',
    añoPublicacion: 0,
    author: { id: 0 }
  }
  fetchBooks()
}

onMounted(() => {
  fetchWriters()
  fetchBooks()
})
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none;
}
</style>
