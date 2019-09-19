<template>
<div> 
  <AdminUsersDialog />
  <div class="table-container">
      <q-table
        title="Treats"
        :data="users"
        :columns="columns"
        row-key="name"
        :dense="$q.screen.lt.sm"    
        :visible-columns="visibleColumns"
        :filter="filter" :loading="loading"
        no-data-label="No hay nada por aqui" no-results-label="No econtramos tu busqueda"
        dark color="accent"
        class="table-master shadow-16" card-class="table-card" table-class="table-content" table-header-class="table-header"
      >
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Usuarios</div>
  
          <q-space ></q-space>
  
          <div v-if="$q.screen.gt.xs" class="col">
            <q-toggle v-model="visibleColumns"  checked-icon="check" unchecked-icon="clear" val="email" label="Email" color="primary" ></q-toggle>
            <q-toggle v-model="visibleColumns"  checked-icon="check" unchecked-icon="clear" val="uid" label="UID" ></q-toggle>
            <q-toggle v-model="visibleColumns"  checked-icon="check" unchecked-icon="clear" val="username" label="Usuario" ></q-toggle>
            <q-toggle v-model="visibleColumns"  checked-icon="check" unchecked-icon="clear" val="acciones" label="Acciones" ></q-toggle>
          </div>
          <q-select
            v-else
            v-model="visibleColumns"
            multiple
            borderless
            dense dark
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            transition-show="scale" transition-hide="scale"
            :options="columns"
            option-value="name"
            style="min-width: 150px"
          >
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
              >
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon" class="q-ml-sm"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label v-html="scope.opt.label" color="accent"/>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

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
          ></q-btn>
        </template>
        
        <template v-slot:body="props"> 
          <q-tr :props="props">
          <q-td key="email" :props="props">
            <q-scroll-area
                v-if="$q.screen.lt.sm"
                horizontal style="height: 50px; width: 100px;"
                :thumb-style="thumbStyle" :content-style="contentStyle" :content-active-style="contentActiveStyle" >          
                    <div class="text-wrap">{{ props.row.email }}</div>
            </q-scroll-area>   
            <div class="text-wrap" v-else>{{ props.row.email }}</div>
          </q-td>
          
          <q-td key="uid" :props="props">
            <q-scroll-area
                v-if="$q.screen.lt.sm"
                horizontal style="height: 50px; width: 70px;"
                :thumb-style="thumbStyle" :content-style="contentStyle" :content-active-style="contentActiveStyle"
               >                                      
                  <div class="text-pre-wrap" >{{ props.row.uid.substr(0,8) }}</div> 
            </q-scroll-area>
            <div class="text-pre-wrap"  v-else>{{ props.row.uid.substr(0,12) }}</div> 
          </q-td>
          
        <q-td key="username" :props="props">
          <q-scroll-area
          v-if="$q.screen.lt.sm"
          horizontal style="height: 50px; width: 70px;">
              <div class="text-pre-wrap" >{{ props.row.username }}</div> 
          </q-scroll-area>
          <div class="text-pre-wrap"  v-else>{{ props.row.username }}</div> 
        </q-td>     
          
        <q-td key="acciones" :props="props">
            <q-scroll-area
            v-if="$q.screen.lt.sm"
            horizontal style="height: 50px; width: 70px;">
                <q-btn flat icon="edit" color="primary" @click="editUser(props.row)" class="q-pa-xs"></q-btn>
                <q-btn flat icon="delete" color="accent" @click="removeUser(props.row)" class="q-pa-xs"></q-btn>
            </q-scroll-area>
              <q-td key="acciones" :props="props"  v-else>
                <q-btn flat icon="edit" color="primary" @click="editUser(props.row)" class="q-pa-xs"></q-btn>
                <q-btn flat icon="delete" color="accent" @click="removeUser(props.row)" class="q-pa-xs"></q-btn>
              </q-td>    
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
      prompt: false,
      filter: '',
      visibleColumns: ['uid', 'email', 'username', 'acciones'],
      columns: [
        {
          name: 'email', icon: 'email',
          // required: true,
          label: 'Email',
          align: 'left',
          field: row => row.email,
          format: val => `${val}`,
          sortable: true,
          classes: 'ellipsis', style: 'width: 80px;'
        },
        { name: 'uid', icon: 'fingerprint', align: 'center', label: 'UID', field: 'uid', sortable: true },
        { name: 'username', icon: 'supervisor_account',  align: 'center', label: 'N-Usuario', field: 'username', sortable: true },
        { name: 'acciones', icon: 'dashboard', align: 'center', label: 'Acciones', field: 'acciones', sortable: false,  classes: 'ellipsis', style: 'width: 70px;'}
      ],
      users: [],
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
          this.prompt = true
          this.$store.commit('toggleUserDialog', {editMode: true, user})
      },
      removeUser (user) {
        db.collection('users').doc(user.uid).delete().then((  )=> {
            this.$q.notify({
                  color: 'primary', textColor: 'white',
                  icon: 'fas fa-broom',
                  position: 'bottom-right',
                  timeout: '2500',
                  message: 'Usuario Eliminado',
                  actions: [{ icon: 'close', color: 'white' }]
            })            
        })
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
    .table-container {
      margin-top: 2rem;
    }
    .table-master {
        // width: 100%;
        background: #000f14;
        border-radius: 10px;
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