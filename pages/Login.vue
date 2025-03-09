<!-- filepath: c:/Users/karol/Desktop/Tarea/tarea/src/components/Login.vue -->
<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-4" max-width="400">
      <v-card-title class="text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary" block>Login</v-btn>
        </v-form>
        <v-alert v-if="error" type="error" class="mt-3">{{ error }}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
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
        const response = await fetch('http://localhost:3020/api/login', { // Asegúrate de que la URL sea correcta
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
          this.$router.push('/personajes'); // Redirige a la página de personajes
        } else {
          this.error = data.error || 'Login failed';
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        this.error = 'An error occurred';
      }
    }
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>