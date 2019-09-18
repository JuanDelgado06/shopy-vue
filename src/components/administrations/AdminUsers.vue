<template>
    <div>
        <AdminUsersDialog />
        <div class="table-container">
            <q-table
                title="Usuarios"
                 :grid="$q.screen.lt.sm"
                :data="users"
                :columns="columns"
                :loading="loading"
                :filter="filter"
                :rows-per-page-options="[1, 5, 10, 20, 30]"
                no-data-label="No hay nada por aqui"
                no-results-label="No econtramos tu busqueda"
                row-key="name"
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
                
                <template v-slot:body="props">
                        <q-tr :props="props">
                        <q-td key="email" :props="props">
                            {{ props.row.email }}
                        </q-td>
                        <q-td key="uid" :props="props">
                            {{ props.row.uid }}
                        </q-td>
                        <q-td key="username" :props="props">
                            <div class="text-pre-wrap">{{ props.row.username }}</div>
                        </q-td>
                        <!-- <q-td key="acciones" :props="props"> -->
                        <q-td>
                             <q-btn flat icon="edit" color="primary" @click="editUser(props.row)" class="q-pa-xs"></q-btn>
                             <q-btn flat icon="delete" color="accent" @click="removeUser(props.row)" class="q-pa-xs"></q-btn>
                        </q-td>
                        </q-tr>
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
        { name: 'username', align: 'center', label: 'Nombre de Usuario', field: 'username', sortable: true },
        { name: 'acciones', align: 'center', label: 'Acciones', field: 'acciones', sortable: false }
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
        width: 100%;
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