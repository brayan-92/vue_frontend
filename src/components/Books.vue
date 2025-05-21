<template>
  <div class="books-container">
    <div class="card-layout">
      <!-- Formulario para agregar libros -->
      <div class="card">
        <div class="card-header">
          <span class="card-icon green">📖</span>
          <h2 class="card-title">Registrar Libro</h2>
        </div>
        
        <form @submit.prevent="addBook" class="form">
          <div class="form-group">
            <label for="nombre" class="form-label">Título del libro</label>
            <input
              id="nombre"
              v-model="form.nombre"
              placeholder="Ej: Cien años de soledad"
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="genero" class="form-label">Género</label>
            <input
              id="genero"
              v-model="form.genero"
              placeholder="Ej: Realismo mágico"
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="añoPublicacion" class="form-label">Año de publicación</label>
            <input
              id="añoPublicacion"
              v-model.number="form.añoPublicacion"
              type="number"
              placeholder="Ej: 1967"
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="autor" class="form-label">Autor</label>
            <select
              id="autor"
              v-model.number="form.author.id"
              required
              class="form-select"
            >
              <option disabled value="0">Selecciona autor</option>
              <option v-for="writer in writers" :key="writer.id" :value="writer.id">
                {{ writer.nombre }} {{ writer.apellido }}
              </option>
            </select>
          </div>
          
          <button
            type="submit"
            class="btn btn-secondary"
            :disabled="form.author.id === 0"
          >
            <span>Agregar Libro</span>
            <span class="btn-icon">+</span>
          </button>
        </form>
      </div>

      <!-- Lista de libros -->
      <div class="card">
        <div class="card-header">
          <span class="card-icon green">📚</span>
          <h2 class="card-title">Libros Registrados</h2>
        </div>
        
        <div v-if="books.length === 0" class="empty-state">
          No hay libros registrados aún.
        </div>
        
        <ul v-else class="list">
          <li v-for="book in books" :key="book.id" class="list-item">
            <div class="list-item-content">
              <div class="avatar green">
                <span class="avatar-icon">📔</span>
              </div>
              <div class="list-item-details">
                <p class="list-item-title">"{{ book.nombre }}"</p>
                <p class="list-item-subtitle">{{ book.genero }} • {{ book.añoPublicacion }}</p>
                <p class="list-item-author">Por {{ book.author.nombre }} {{ book.author.apellido }}</p>
              </div>
            </div>
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
  añoPublicacion: 2023,
  author: {
    id: 0
  }
})

const fetchWriters = async () => {
  try {
    writers.value = await getWriters()
  } catch (error) {
    console.error('Error al obtener escritores:', error)
  }
}

const fetchBooks = async () => {
  try {
    books.value = await getBooks()
  } catch (error) {
    console.error('Error al obtener libros:', error)
  }
}

const addBook = async () => {
  try {
    await createBook(form.value)
    form.value = {
      nombre: '',
      genero: '',
      añoPublicacion: 2023,
      author: { id: 0 }
    }
    await fetchBooks()
  } catch (error) {
    console.error('Error al agregar libro:', error)
  }
}

onMounted(() => {
  fetchWriters()
  fetchBooks()
})
</script>

<style scoped>
.books-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.card-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .card-layout {
    flex-direction: row;
  }
  
  .card {
    width: 50%;
  }
}

.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-icon {
  font-size: 1.5rem;
  margin-right: 0.75rem;
}

.card-icon.green {
  color: var(--color-secondary);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #555;
}

.form-input,
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus,
.form-select:focus {
  border-color: var(--color-secondary);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  outline: none;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-secondary-hover);
}

.btn-icon {
  font-size: 1.25rem;
  line-height: 1;
}

.empty-state {
  text-align: center;
  color: #888;
  padding: 2rem 0;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item-content {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.avatar.green {
  background-color: rgba(16, 185, 129, 0.15);
  color: var(--color-secondary);
}

.list-item-details {
  margin-left: 1rem;
}

.list-item-title {
  font-weight: 500;
  color: #333;
}

.list-item-subtitle {
  font-size: 0.875rem;
  color: #666;
}

.list-item-author {
  font-size: 0.75rem;
  color: #888;
  margin-top: 0.25rem;
}
</style>