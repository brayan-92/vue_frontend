<template>
  <div class="app-container">
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-logo">
          <span class="logo-emoji">📚</span>
          <h1 class="logo-text">Mi Biblioteca</h1>
        </div>
        <div class="navbar-links">
          <router-link to="/" class="nav-link">Escritores</router-link>
          <router-link to="/books" class="nav-link">Libros</router-link>
        </div>
      </div>
    </nav>
    
    <main class="main-content">
      <div class="content-container">
        <router-view />
      </div>
    </main>
    
    <footer class="footer">
      <div class="footer-container">
        © 2025 Mi Biblioteca - Aplicación de gestión literaria
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// No se necesita lógica adicional en este componente
</script>

<style>
/* Estilos globales */
:root {
  --color-primary: #5754db;
  --color-primary-hover: #4643d0;
  --color-secondary: #10b981;
  --color-secondary-hover: #0ea06e;
  --color-background: #f7f9fc;
  --color-text: #333333;
  --color-text-light: #6b7280;
  --color-border: #e2e8f0;
  --color-white: #ffffff;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--color-text);
  background-color: var(--color-background);
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Estilos para la barra de navegación */
.navbar {
  background-color: var(--color-white);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md) var(--spacing-xl);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.logo-emoji {
  font-size: 1.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
}

.navbar-links {
  display: flex;
  gap: var(--spacing-lg);
}

.nav-link {
  text-decoration: none;
  color: var(--color-text-light);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  transition: background-color 0.2s, color 0.2s;
}

.nav-link:hover {
  background-color: rgba(87, 84, 219, 0.1);
  color: var(--color-primary);
}

.router-link-active {
  color: var(--color-primary);
  font-weight: 500;
}

/* Estilos para el contenido principal */
.main-content {
  flex-grow: 1;
  padding: var(--spacing-xl) var(--spacing-md);
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Estilos para el pie de página */
.footer {
  background-color: var(--color-white);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-lg) var(--spacing-md);
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--color-text-light);
  font-size: 0.875rem;
}
</style>