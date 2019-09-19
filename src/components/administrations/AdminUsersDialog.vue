<template>
    <div>
        <div class="center-item">
            <q-btn @click="jeo" 
            class="btn-add shadow-17" icon="add"
            ></q-btn>
        </div>

        <q-dialog v-model="prompt"  persistent transition-show="scale"  transition-hide="rotate">
                <q-card class="modal">
                <q-card-section>
                    <div class="text-h6" align="center">Añadir Usuario</div>
                </q-card-section>
        
                <q-card-section>
                    <q-input dense v-model="userForEdit.email" autofocus  label="Email" dark >
                         <template v-slot:append>
                            <q-icon name="fas fa-envelope" /> 
                        </template>      
                    </q-input>
                </q-card-section>
                <q-card-section>
                    <q-input dense v-model="userForEdit.username" label="Nombre de Usuario" dark>
                        <template v-slot:append>
                            <q-icon name="fas fa-user-shield q-icon" />
                        </template>   
                    </q-input>
                </q-card-section>
                <q-card-section>
                    <q-input dense v-model="userForEdit.role" label="Rol del Usuario" dark>
                        <template v-slot:append>
                            <q-icon name="fas fa-user-shield q-icon" />
                        </template>   
                    </q-input>
                </q-card-section>
        
                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancelar" @click="close" v-close-popup ></q-btn>
                    <q-btn flat label="Actualizar Usuario" @click="update" v-if="userDialogEditMode"></q-btn>
                    <q-btn flat label="Guardar Usuario" @click="add" v-else v-close-popup></q-btn>
                </q-card-actions>
                </q-card>
        </q-dialog>
    </div>
</template>

<script>
import {db} from '@/main'
import * as faker from 'faker'
import {mapGetters} from 'vuex'
// import { timeout } from 'q'

export default {
    name: 'AdminUsersDialog',
    data() {
        return {
            prompt: false
        }
    },
    methods: {
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
        jeo () {
            this.prompt = true
        },
        add () {
            this.userForEdit.uid = faker.random.alphaNumeric(16)
            // this.userForEdit.role = 'customer'
            const user = Object.assign({}, this.userForEdit)
            db.collection('users').doc(this.userForEdit.uid).set(user).then(() => {
            this.$q.notify({
                  color: 'primary', textColor: 'white',
                  icon: 'fas fa-broom',
                  position: 'bottom-right',
                  timeout: '2500',
                  message: 'Usuario Guardado',
                  actions: [{ icon: 'close', color: 'white' }]
            })          
                this.close()
            })
            this.userForEdit.email = ''
            this.userForEdit.username = ''
            this.userForEdit.role = ''
            this.prompt = false
        },
        update() {
            const user = Object.assign({}, this.userForEdit)
            db.collection('users').doc(user.uid).update(user).then( () => {
                this.$q.notify({
                    color: 'primary', textColor: 'white',
                    icon: 'fas fa-broom',
                    position: 'bottom-right',
                    timeout: '2500',
                    message: 'Usuario Actualizado',
                    actions: [{ icon: 'close', color: 'white' }]
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