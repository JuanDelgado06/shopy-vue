<template>
<div> 
  <!-- <AdminUsersDialog /> -->
  <q-dialog v-model="prompt"  persistent transition-show="scale"  transition-hide="rotate">
                <q-card class="modal">
                <q-card-section>
                    <div class="text-h6" align="center">Editar Usuario</div>
                </q-card-section>
        
                <q-card-section>
                    <q-input dense v-model="userForEdit.email"   label="Email" dark disable class="q-pa-xs">
                         <template v-slot:append>
                            <q-icon name="fas fa-envelope" /> 
                        </template>      
                    </q-input>
                </q-card-section>
                <q-card-section>
                    <q-input dense v-model="userForEdit.username" label="Nombre de Usuario" dark autofocus class="q-pa-xs">
                        <template v-slot:append>
                            <q-icon name="fas fa-user-shield" />
                        </template>   
                    </q-input>
                </q-card-section>
                <q-card-section>
                    <q-input dense v-model="userForEdit.role" label="Rol del Usuario" dark class="q-pa-xs">
                        <template v-slot:append>
                            <q-icon name="fas fa-user-tag " />
                        </template>   
                    </q-input>
                </q-card-section>
        
                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancelar" @click="close" v-close-popup ></q-btn>
                    <q-btn flat label="Actualizar Usuario" @click="update" v-if="userDialogEditMode"></q-btn>
                    <!-- <q-btn flat label="Guardar Usuario" @click="add" v-else v-close-popup></q-btn> -->
                </q-card-actions>
                </q-card>
        </q-dialog>
  <!-- Contenedor de la tabla de usuarios -->
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
          <div class="col-2 q-table__title"  v-if="$mq.resize && $mq.above('584px')">Usuarios</div>
  
          <q-space v-if="$mq.resize && $mq.above('584px')"></q-space>
  
          <div v-if="$q.screen.gt.xs" class="col">
            <q-toggle v-model="visibleColumns"  checked-icon="check" unchecked-icon="clear" val="email" label="Email" color="primary" ></q-toggle>
            <q-toggle v-model="visibleColumns"  checked-icon="check" unchecked-icon="clear" val="role" label="Role" ></q-toggle>
            <q-toggle v-model="visibleColumns"  checked-icon="check" unchecked-icon="clear" val="username" label="Usuario" ></q-toggle>
            <q-toggle v-model="visibleColumns"  checked-icon="check" unchecked-icon="clear" val="acciones" label="Acciones" ></q-toggle>
          </div>
          <q-select
            v-else v-model="visibleColumns"  multiple  dense dark options-dense :display-value="$q.lang.table.columns" emit-value class="m-bottom-10"
             transition-show="scale" transition-hide="scale" :options="columns" option-value="name" style="min-width: 120px" label="Ocultar opciones">
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

          <q-space ></q-space>
         
          <q-btn
            v-if="$mq.resize && $mq.below('512px')"
            flat round dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          ></q-btn>
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Buscar" dark> 
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
          </q-input>       
          <q-btn
            v-if="$mq.resize && $mq.above('513px')"
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
          
          <q-td key="role" :props="props">
            <q-scroll-area
                v-if="$q.screen.lt.sm"
                horizontal style="height: 50px; width: 70px;"
                :thumb-style="thumbStyle" :content-style="contentStyle" :content-active-style="contentActiveStyle"
               >                                      
                  <div class="text-pre-wrap" >{{ props.row.role }}</div> 
            </q-scroll-area>
            <div class="text-pre-wrap" v-else>{{ props.row.role }}</div> 
          </q-td>
          
        <q-td key="username" :props="props">
          <q-scroll-area
          v-if="$q.screen.lt.sm"
          horizontal style="height: 50px; width: 100px;">
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
    </div>
</div>
</template>

<script>
// import AdminUsersDialog from '@/components/administrations/AdminUsersDialog'
import {db} from '@/main'
import {mapGetters} from 'vuex'
export default {
    name: 'AdminUsers',
    // components: { AdminUsersDialog },
    data () {
    return {
      prompt: false,
      filter: '',
      visibleColumns: ['role', 'username', 'acciones'],
      columns: [
        { name: 'email', icon: 'email', label: 'Email', align: 'left', field: row => row.email, format: val => `${val}`, sortable: true, classes: 'ellipsis', style: 'width: 80px;' },
        { name: 'role', icon: 'fingerprint', align: 'center', label: 'Role', field: 'role', sortable: true, classes: 'ellipsis', style: 'width: 80px;' },
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
                    role: userData.role,
                    email: userData.email,
                    username: userData.username || 'N-A'
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
                  color: 'accent', textColor: 'black', icon: 'fas fa-broom',
                  position: 'bottom-right', timeout: '2500', message: 'Usuario Eliminado',
                  actions: [{ icon: 'close', color: 'black' }]
            })            
        })
      },
       close () {
            this.$store.commit('toggleUserDialog', {
                editMode: false,
                user: {
                    uid: null,
                    email: '',
                    role: '',
                    username: ''
                }
            })
        },
        update() {
            const user = Object.assign({}, this.userForEdit)
            db.collection('users').doc(user.uid).update(user).then( () => {
            this.$q.notify({
                  color: 'accent', textColor: 'black', icon: 'far fa-laugh-wink',
                  position: 'bottom-right', timeout: '2500', message: 'Usuario Actualizado',
                  actions: [{ icon: 'close', color: 'black' }]
            })       
                this.close()
            } )
            this.userForEdit.email = ''
            this.userForEdit.username = ''
            this.userForEdit.role = ''
            this.prompt = false
        }
  },
  computed: {
    contentStyle () { return { color: '#d3d3d3' } },
    contentActiveStyle () { return { color: '#d3d3d3' } },
    thumbStyle () { return { right: '1px', borderRadius: '5px', backgroundColor: '#52C5F2', width: '5px', opacity: 0.75 } },
    usersDialog: {
          get () {
              return this.$store.getters.usersDialog;
          },
          set () {
              this.close()
          }
      },
      ...mapGetters(['userForEdit', 'userDialogEditMode'])
  }
}
</script>

<style lang="scss">
    @import '@/styles/master';
    .table-container {
      margin-top: 2rem;
    }
    .table-master { background: #000f14; border-radius: 10px; }
    .table-card {
        margin: 5px;
        background: $c-color3;
        color: $c-default;
        border: 1px solid $c-color6;
    }
    .table-content { background: $c-color5; }
    .table-header {
        background: $c-color3;
        color: $c-color7;
    }
    //Estilos de la Ventana Modal
    .modal {
        width: 95%;
        max-width: 500px;
        background: $c-color5;
        border: 1px solid $c-color7;
    }
    .center-item {
        text-align: center;
    }
    .btn-add {
        width: 15%;
        font-size: 1rem;
        text-transform: capitalize;
        background: $c-color5;
        border: 1px solid $c-color7;
        color: $c-color7;
        transition: all .4s ease;
        &:hover {
            background: $c-color7;
            color: $c-color5;
            border: 1px solid $c-color5;
        }
        @media screen and (min-width: 500px) {
            width: 25%;
            font-size: 1rem;
        }
        @media screen and (min-width: 764px) {
            width: 40%;
            font-size: 1rem;
        }
    }
</style>