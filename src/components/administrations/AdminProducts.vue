<template>
    <div>
        <div class="center-item m-top-1">
            <q-btn @click="prompt = true" 
            class="btn-add shadow-17" icon="add"
            ></q-btn>
            </div>
        <!-- MODULO PARA LA VENTANA MODAL-->
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
                        <q-input type="number" dense v-model="productForEdit.price" label="Precio del Producto" dark>
                            <!-- <template v-slot:append>
                                <q-icon name="fas fa-user-shield q-icon" />
                            </template>    -->
                        </q-input>
                    </q-card-section>
                    <q-card-section>
                        <a v-if="productForEdit.url"
                            :href="productForEdit.url" target="_blank">
                            Abrir Archivo
                        </a>
                    </q-card-section>
                    
                    <q-card-section align="center">
                        <!-- MODULO PARA SUBIR ARCHIVOS -->
                        <q-uploader
                            url="http://localhost:4444/upload"
                            label="Custom header" 
                            accept=".jpg, .png, image/*"
                            dark text-color="black" color="accent"
                            style="max-width: 250px"
                        >
                        <template v-slot:header="scope">
                            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                                <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat >
                                <q-tooltip>Descartar Imagen</q-tooltip>
                                </q-btn>
                                <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                                <q-tooltip>Remove Uploaded Files</q-tooltip>
                                </q-btn>
                                <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" ></q-spinner>
                                <div class="col">
                                <div class="q-uploader__title">Sube tus imagenes</div>
                                <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}</div>
                                </div>
                                <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                                <q-uploader-add-trigger ></q-uploader-add-trigger>
                                <q-tooltip>Añadir imagen</q-tooltip>
                                </q-btn>
                                <q-btn v-if="scope.canUpload" icon="cloud_upload" @click="scope.upload" round dense flat >
                                <q-tooltip>Subir imagen</q-tooltip>
                                </q-btn>
                    
                                <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat >
                                <q-tooltip>Cancelar</q-tooltip>
                                </q-btn>
                            </div>
                        </template>
                        </q-uploader>
                        <!-- FIN MODULO PARA SUBIR ARCHIVOS -->
                    </q-card-section>
                                
                    <q-card-actions align="right" class="text-primary">
                        <q-btn flat label="Cancelar" @click="close" v-close-popup ></q-btn>
                        <q-btn flat label="Actualizar Producto" @click="update" v-if="productsDialogEditMode"></q-btn>
                        <q-btn flat label="Guardar Producto" @click="add" v-else v-close-popup></q-btn>
                    </q-card-actions>
                    </q-card>
            </q-dialog>
            <!-- FIN MODULO PARA LA VENTANA MODAL-->
            
            <!-- MODULO DE LA TABLA DE PRODUCTOS -->
            <div class="table-container">
                <q-table
                    title="Treats"
                    :data="products"
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
                    <q-toggle v-model="visibleColumns"  checked-icon="check" unchecked-icon="clear" val="name" label="Nombre" ></q-toggle>
                    <q-toggle v-model="visibleColumns"  checked-icon="check" unchecked-icon="clear" val="id" label="id" color="primary" ></q-toggle>
                    <q-toggle v-model="visibleColumns"  checked-icon="check" unchecked-icon="clear" val="price" label="Precio" ></q-toggle>
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
                <q-input outlined dense debounce="300" v-model="filter" placeholder="Buscar productos" dark> 
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
                <q-td key="id" :props="props">
                    <q-scroll-area
                        v-if="$q.screen.lt.sm"
                        horizontal style="height: 50px; width: 100px;"
                        :thumb-style="thumbStyle" :content-style="contentStyle" :content-active-style="contentActiveStyle" >          
                            <div class="text-wrap">{{ props.row.id }}</div>
                    </q-scroll-area>   
                    <div class="text-wrap" v-else>{{ props.row.id }}</div>
                </q-td>
                
                <q-td key="name" :props="props">
                    <q-scroll-area
                        v-if="$q.screen.lt.sm"
                        horizontal style="height: 50px; width: 70px;"
                        :thumb-style="thumbStyle" :content-style="contentStyle" :content-active-style="contentActiveStyle"
                    >                                      
                        <div class="text-pre-wrap" >{{ props.row.name }}</div> 
                    </q-scroll-area>
                    <div class="text-pre-wrap" v-else>{{ props.row.name }}</div> 
                </q-td>
                
                <q-td key="price" :props="props">
                <q-scroll-area
                v-if="$q.screen.lt.sm"
                horizontal style="height: 50px; width: 100px;">
                    <div class="text-pre-wrap" >{{ props.row.price }}</div> 
                </q-scroll-area>
                <div class="text-pre-wrap"  v-else>{{ props.row.price }}</div> 
                </q-td>     
                
                <q-td key="acciones" :props="props">
                        <q-btn flat icon="edit" color="primary" @click="editProduct(props.row)" class="q-pa-xs"></q-btn>
                        <q-btn flat icon="delete" color="accent" @click="removeProduct(props.row)" class="q-pa-xs"></q-btn>
                </q-td>     
                
                </q-tr>
                </template>
                
                </q-table>
            </div>
            <!-- FIN MODULO DE LA TABLA DE PRODUCTOS -->
    </div>
</template>

<script>
import {db} from '@/main'
import * as faker from 'faker'
import {mapGetters} from 'vuex'
export default {
    name: 'AdminProducts',
    data () {
    return {
      prompt: false,
      filter: '',
      visibleColumns: ['acciones', 'name', 'id', 'price'],
      columns: [
        { name: 'name', icon: 'card_travel', label: 'Nombre', align: 'left', field: row => row.name, format: val => `${val}`, sortable: true, classes: 'ellipsis', style: 'width: 80px;' },
        { name: 'id', icon: 'fingerprint',  align: 'center', label: 'ID', field: 'id', sortable: true },
        { name: 'price', icon: 'attach_money', align: 'center', label: 'Precio', field: 'price', sortable: true, classes: 'ellipsis', style: 'width: 80px;' },
        { name: 'acciones', icon: 'dashboard', align: 'center', label: 'Acciones', field: 'acciones', sortable: false,  classes: 'ellipsis', style: 'width: 70px;'}
      ],
      products: [],
      loading: true
    }
  },
  mounted() {
      this.loading = true
      db.collection('products').orderBy('createdAt').onSnapshot(snapshot => {
          this.products = []
          snapshot.forEach(SnapProduct => {
              const product =  SnapProduct.data()
              console.log(product);
              this.products.push({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  url: product.url || '',
                  file_id: product.file_id
              })
          })
          this.loading = false
      })
  },    
  methods: {
      //METODOS PARA LA TABLA DE PRODUCTOS
        editProduct (product) {
            this.$store().commit('toggleProductsDialog', {editMode: true, product})
        },
        removeProduct (product) {
            db.collection('products').doc(product.id).delete().then(() => {
                if (product.url) {
                    this.$store.dispatch('removeFile', product)
                }   
                 this.$q.notify({
                    color: 'accent', textColor: 'black', icon: 'far fa-laugh-wink',
                    position: 'bottom-right', timeout: '2500', message: 'Producto Eliminado',
                    actions: [{ icon: 'close', color: 'black' }]
                })    
            })
        },
      //METODOS PARA LA VENTANA MODAL
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
            width: 20%;
            font-size: 1rem;
        }
    }
</style>