<template>
  <div class="writers-container">
    <div class="card-layout">
      <!-- Formulario para agregar escritores -->
      <div class="card">
        <div class="card-header">
          <span class="card-icon purple">✍️</span>
          <h2 class="card-title">Registrar Escritor</h2>
        </div>
        
        <form @submit.prevent="addWriter" class="form">
          <div class="form-group">
            <label for="nombre" class="form-label">Nombre</label>
            <input
              id="nombre"
              v-model="form.nombre"
              placeholder="Ej: Gabriel"
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="apellido" class="form-label">Apellido</label>
            <input
              id="apellido"
              v-model="form.apellido"
              placeholder="Ej: García Márquez"
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="nacionalidad" class="form-label">Nacionalidad</label>
            <input
              id="nacionalidad"
              v-model="form.nacionalidad"
              placeholder="Ej: Colombiana"
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="edad" class="form-label">Edad</label>
            <input
              id="edad"
              v-model.number="form.edad"
              type="number"
              placeholder="Ej: 45"
              required
              class="form-input"
            />
          </div>
          
          <button type="submit" class="btn btn-primary">
            <span>Agregar Escritor</span>
            <span class="btn-icon">+</span>
          </button>
        </form>
      </div>

      <!-- Lista de escritores -->
      <div class="card">
        <div class="card-header">
          <span class="card-icon purple">📋</span>
          <h2 class="card-title">Escritores Registrados</h2>
        </div>
        
        <div v-if="writers.length === 0" class="empty-state">
          No hay escritores registrados aún.
        </div>
        
        <ul v-else class="list">
          <li v-for="writer in writers" :key="writer.id" class="list-item">
            <div class="list-item-content">
              <div class="avatar purple">
                <span class="avatar-icon">👤</span>
              </div>
              <div class="list-item-details">
                <p class="list-item-title">{{ writer.nombre }} {{ writer.apellido }}</p>
                <p class="list-item-subtitle">{{ writer.nacionalidad }}, {{ writer.edad }} años</p>
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
import { getWriters, createWriter, Writer } from '../services/api'

const writers = ref<Writer[]>([])
const form = ref({ nombre: '', apellido: '', nacionalidad: '', edad: 0 })

const fetchWriters = async () => {
  try {
    writers.value = await getWriters()
  } catch (error) {
    console.error('Error al obtener escritores:', error)
  }
}

const addWriter = async () => {
  try {
    await createWriter(form.value)
    form.value = { nombre: '', apellido: '', nacionalidad: '', edad: 0 }
    await fetchWriters()
  } catch (error) {
    console.error('Error al agregar escritor:', error)
  }
}

onMounted(fetchWriters)
</script>

<style scoped>
.writers-container {
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

.card-icon.purple {
  color: var(--color-primary);
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

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(87, 84, 219, 0.2);
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

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
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

.avatar.purple {
  background-color: rgba(87, 84, 219, 0.15);
  color: var(--color-primary);
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
</style>