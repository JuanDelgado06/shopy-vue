<template>
    <div>
        <AdminUsersDialog />
        <q-page-container>
            <q-table
                title="Usuarios" separator="vertical"
                :dense="$q.screen.lt.md"    
                :data="users" :columns="columns"
                :loading="loading"
                :filter="filter"
                :rows-per-page-options="[1, 2, 5, 10, 20, 30]"
                no-data-label="No hay nada por aqui" no-results-label="No econtramos tu busqueda"
                row-key="name"
                dark color="accent"
                class="table-master shadow-16" card-class="table-card" table-class="table-content" table-header-class="table-header"
                >

                <template v-slot:top-right="props">
                    <q-input outlined dense debounce="300" v-model="filter" placeholder="Buscar" dark>
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>                        
                    <q-btn
                        flat round dense
                        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                        @click="props.toggleFullscreen"
                        class="q-ml-md"
                        />                    
                </template>

                <template v-slot:body="props">
                        <q-tr :props="props">

                        <q-td key="email" :props="props">
                            <q-scroll-area
                                v-if="$mq.resize && $mq.below('629px')"
                                horizontal style="height: 50px; width: 100px;"
                                :thumb-style="thumbStyle" :content-style="contentStyle" :content-active-style="contentActiveStyle" >          
                                    <div class="text-wrap">{{ props.row.email }}</div>
                            </q-scroll-area>   
                            <div class="text-wrap" v-else>{{ props.row.email }}</div>
                        </q-td>

                        <q-td key="uid" :props="props">
                        <q-scroll-area
                            v-if="$mq.resize && $mq.below('629px')"
                            horizontal style="height: 50px; width: 70px;"
                            :thumb-style="thumbStyle" :content-style="contentStyle" :content-active-style="contentActiveStyle" >                                      
                                <div class="text-pre-wrap" >{{ props.row.uid.substr(0,8) }}</div> 
                        </q-scroll-area>
                        <div class="text-pre-wrap"  v-else>{{ props.row.uid.substr(0,12) }}</div> 
                        </q-td>
                        
                        <q-td key="username" :props="props">
                            <q-scroll-area
                                v-if="$mq.resize && $mq.below('629px')"
                                horizontal style="height: 50px; width: 70px;"  
                                :thumb-style="thumbStyle" :content-style="contentStyle" :content-active-style="contentActiveStyle" >                                      
                                    <div class="text-pre-wrap" >{{ props.row.username }}</div> 
                            </q-scroll-area>
                            <div class="text-pre-wrap"  v-else>{{ props.row.username }}</div> 
                        </q-td>

                        <q-td key="acciones" :props="props">
                             <q-btn flat icon="edit" color="primary" @click="editUser(props.row)" class="q-pa-xs"></q-btn>
                             <q-btn flat icon="delete" color="accent" @click="removeUser(props.row)" class="q-pa-xs"></q-btn>
                        </q-td>
                        </q-tr>
                </template>
            </q-table>
        </q-page-container>
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
            align: 'left', 
            field: row => row.email,
            format: val => `${val}`,
            sortable: true,
            classes: 'ellipsis', style: 'width: 80px'
        },
        { name: 'uid', align: 'left', label: 'UID', field: 'uid', sortable: true, classes: 'ellipsis', style: 'width: 70px'},
        { name: 'username', align: 'center', label: 'N-Usuario', field: 'username', sortable: true, classes: 'ellipsis', style: 'width: 70px'},
        { name: 'acciones', align: 'center', label: 'Acciones', field: 'acciones', sortable: false , classes: 'ellipsis', style: 'width: 80px'}
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
  computed: {
    contentStyle () {
      return {
        color: '#d3d3d3'
      }
    },
    contentActiveStyle () {
      return {
        // backgroundColor: '#eee',
        color: '#d3d3d3'
      }
    },
    thumbStyle () {
      return {
        right: '1px',
        borderRadius: '5px',
        backgroundColor: '#52C5F2',
        width: '5px',
        opacity: 0.75
      }
    }
  }
}
</script>

<style lang="scss">
    @import '@/styles/master';
    .subtitle {
        margin: 0;
    }
    .table-master {
        // width: 100%;
        background: #000f14;
        border-radius: 10px;
        margin-top: 40px;
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