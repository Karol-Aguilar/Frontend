<!-- filepath: c:/Users/karol/Desktop/Tarea/tarea/src/components/Login.vue -->
<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" style="width: 350px">
      <h2 class="text-center mb-4">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" id="email" v-model="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input type="password" id="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
      <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3020/login', { // Asegúrate de que la URL sea correcta
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });
        const data = await response.json();
        if (response.ok) {
          alert('Login successful');
          localStorage.setItem('token', data.token);
          this.$router.push('/personajes');
        } else {
          this.error = data.error || 'Login failed';
        }
      } catch (error) {
        console.error('Error:', error);
        this.error = 'An error occurred';
      }
    }
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
}
.card {
  width: 100%;
  max-width: 400px;
}
</style>