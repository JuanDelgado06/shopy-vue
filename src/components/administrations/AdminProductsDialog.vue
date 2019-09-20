<template>
        <q-page-container class="container">
            <div class="center-item">
                <q-btn @click="prompt = true" 
                class="btn-add shadow-17" icon="add"
                ></q-btn>
            </div>

            <q-dialog v-model="prompt"  persistent transition-show="scale"  transition-hide="rotate">
                    <q-card class="modal">
                    <q-card-section>
                        <div class="text-h6" align="center">Añadir Producto</div>
                    </q-card-section>
            
                    <q-card-section>
                        <q-input dense v-model="productForEdit.name" autofocus  label="Nombre" dark >
                            <template v-slot:append>
                                <q-icon name="fas fa-envelope" /> 
                            </template>      
                        </q-input>
                    </q-card-section>
                    <q-card-section>
                        <q-input dense v-model="productForEdit.price" label="Precio del Producto" dark>
                            <template v-slot:append>
                                <q-icon name="fas fa-user-shield q-icon" />
                            </template>   
                        </q-input>
                    </q-card-section>
                    <q-card-section>
                        <a v-if="productForEdit.url"
                            :href="productForEdit.url" target="_blank">
                            Abrir Archivo
                        </a>
                    </q-card-section>
                    
                    <q-card-section align="center">
                        <FileInput />
                    </q-card-section>
                                
                    <q-card-actions align="right" class="text-primary">
                        <q-btn flat label="Cancelar" @click="close" v-close-popup ></q-btn>
                        <q-btn flat label="Actualizar Producto" @click="update" v-if="productsDialogEditMode"></q-btn>
                        <q-btn flat label="Guardar Producto" @click="add" v-else v-close-popup></q-btn>
                    </q-card-actions>
                    </q-card>
            </q-dialog>
        </q-page-container>
</template>

<script>
import {db} from '@/main'
import * as faker from 'faker'
import {mapGetters} from 'vuex'
import FileInput from '@/components/helpers/FileInput'
export default {
    name: 'AdminProductsDialog',
    components: { FileInput },
    data() {
        return {
            prompt: false
        }
    },
    methods: {
        close () {
            this.$store.commit('toggleProductsDialog', {
                editMode: false,
                product: {
                    id: null,
                    name: '',
                    price: '',
                    url: '',
                    file_id: ''
                }
            })
        },
        add () {
            this.productForEdit.id = faker.random.alphaNumeric(16)
            const product = Object.assign({}, this.productForEdit)
            product.createdAt = Date.now()
            db.collection('products').doc(this.productForEdit.id).set(product).then(() => {
                if (this.image) {
                    this.$store.dispatch('pushFileToStorage', {fileToUpload: this.image, id: product.id}).then(() => {
                        this._alertAndClose('saved')
                    })
                } else {
                    this._alertAndClose('saved')
                }
            })
        },
        update () {
            const product = Object.assign({}, this.productForEdit)
            db.collection('products').doc(product.id).update(product).then(() => {
                if (this.image) {
                    if (product.url) {
                        this.$store.dispatch('removeFile', product).then(() => {
                            this.$store.dispatch('updateDeleteProduct', product.id)
                        })
                    }

                this.$store.dispatch('pushFileToStorage', {fileToUpload: this.image, id: product.id}).then(() => {
                    this._alertAndClose('updated')
                })
                } else  {
                    this._alertAndClose('saved')
                }
            })
        },
        getUploaderFile (e) {
            this.image = e
        },
        _alertAndClose (action) {
             this.$q.notify({
                  color: 'accent', textColor: 'black', icon: 'far fa-laugh-wink',
                  position: 'bottom-right', timeout: '2500', message: 'Usuario Actualizado',
                  actions: [{ icon: 'close', color: 'black' }]
            })    
            this.close()
        }
    },
    computed: {
        productsDialog: {
            get () {
                return this.$store.getters.productsDialog
            },
            set () {
                this.close()
            }
        },
        ...mapGetters(['productForEdit', 'productsDialogEditMode'])
    },
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