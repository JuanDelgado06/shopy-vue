<template>
    <div>
        <AdminUsersDialog />
        <div class="table-container">
            <q-table
                title="Usuarios"
                :grid="$q.screen.xs"
                :data="users"
                :columns="columns"
                :loading="loading"
                :filter="filter"
                :rows-per-page-options="[1, 5, 10, 20, 30]"
                no-data-label="No hay nada por aqui"
                no-results-label="No econtramos tu busqueda"
                row-key="name"
                wrap-cells
                bordered
                dark color="accent"
                class="table-master shadow-16" card-class="table-card" table-class="table-content" table-header-class="table-header"
                >

                <template v-slot:top-right>
                    <q-input outlined dense debounce="300" v-model="filter" placeholder="Buscar" dark>
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                    </q-input>
                </template>

                <template slot="data" slot-scope="props">
                    <td>{{ props.item.uid }}</td>
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.username }}</td>
                    <td>
                        <q-btn @click="editUser(props.item)">
                            <q-icon name="home" />
                        </q-btn>
                        <q-btn @click="removeUser(props.item)">
                            <q-icon name="delete" />
                        </q-btn>
                    </td>
                </template>

            </q-table>
        </div>
    </div>
</template>

<script>
import AdminUsersDialog from '@/components/administrations/AdminUsersDialog'
import {db} from '@/main'
export default {
    name: 'AdminUsers',
    components: { AdminUsersDialog },
    data () {
    return {
      filter: '',
      columns: [
        {
          name: 'email',
          required: true,
          label: 'Email',
          align: 'center',
          field: row => row.email,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'uid', align: 'center', label: 'UID', field: 'uid', sortable: true },
        { name: 'username', label: 'Nombre de Usuario', field: 'username', sortable: true },
        { name: 'acciones', label: 'Acciones', field: 'acciones', sortable: false }
      ],
      users: [ ],
      loading: false
    }
  },
  mounted() {
      this.loading = true
      db.collection('users').onSnapshot(snapshot => {
          this.users = []
            snapshot.forEach( user => {
                const userData = user.data()
                this.users.push({
                    uid: userData.uid,
                    email: userData.email,
                    username: userData.username || '------'
                })
            })
            this.loading = false
        })
  },
  methods: {
      editUser (user) {

      },
      removeUser (user) {

      }
  },
}
</script>

<style lang="scss">
    @import '@/styles/master';
    .subtitle {
        margin: 0;
    }
    .table-master {
        background: #000f14;
        border-radius: 10px;
        margin-top: 20px;
    }
    .table-card {
        margin: 5px;
        background: $c-color3;
        color: $c-default;
        border: 1px solid $c-color6;
    }
    .table-content {
        background: $c-color5;
    }
    .table-header {
        background: $c-color3;
        color: $c-color7;
    }
</style>