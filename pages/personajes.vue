<template>
  <v-container class="mt-5">
    <v-row>
      <v-col>
        <v-btn color="primary" @click="showCreateModal = true">Agregar Personaje</v-btn>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="personajes" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="editPersonaje(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deletePersonaje(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Modal para crear/editar personaje -->
    <v-dialog v-model="isModalOpen" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ showCreateModal ? 'Agregar Personaje' : 'Editar Personaje' }}</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="showCreateModal ? createPersonaje() : updatePersonaje()">
            <v-text-field
              v-model="form.nombre"
              label="Nombre"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.foto"
              label="Foto URL"
              required
            ></v-text-field>
            <v-btn type="submit" color="primary">{{ showCreateModal ? 'Agregar' : 'Actualizar' }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      personajes: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Foto', value: 'foto' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      form: {
        nombre: '',
        foto: ''
      },
      showCreateModal: false,
      showEditModal: false,
      editId: null
    };
  },
  computed: {
    isModalOpen() {
      return this.showCreateModal || this.showEditModal;
    }
  },
  methods: {
    async fetchPersonajes() {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3020/api/personajes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      this.personajes = await response.json();
    },
    async createPersonaje() {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3020/api/personajes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(this.form)
      });
      const newPersonaje = await response.json();
      this.personajes.push(newPersonaje);
      this.closeModal();
    },
    async updatePersonaje() {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3020/api/personajes/${this.editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(this.form)
      });
      const updatedPersonaje = await response.json();
      const index = this.personajes.findIndex(p => p.id === this.editId);
      this.$set(this.personajes, index, updatedPersonaje);
      this.closeModal();
    },
    async deletePersonaje(id) {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:3020/api/personajes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      this.personajes = this.personajes.filter(p => p.id !== id);
    },
    editPersonaje(personaje) {
      this.form = { ...personaje };
      this.editId = personaje.id;
      this.showEditModal = true;
    },
    closeModal() {
      this.showCreateModal = false;
      this.showEditModal = false;
      this.form = { nombre: '', foto: '' };
      this.editId = null;
    }
  },
  mounted() {
    this.fetchPersonajes();
  }
};
</script>

<style scoped>
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
</style>
