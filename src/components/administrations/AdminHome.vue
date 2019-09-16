<template>
    <div>
        <q-page-container class="container">
                <h1 class="t2 title">Administracion</h1>
                <q-list class="menu-admin">
                    <q-item 
                            v-for="(item, index) in items" :key="index" :to="item.to"
                            clickable
                            v-ripple
                            :active="link === 'inbox'"
                            @click="link = 'inbox'"
                        >
                            <q-item-section avatar>
                                <q-icon color="primary" :name="item.icon" />
                            </q-item-section>
                            <q-item-section> {{ item.title }} </q-item-section>
                    </q-item>                
                </q-list>
        </q-page-container>
    </div>
</template>

<script>
export default {
    name: 'AdminHome',
    data () {
        return {
            items: [
                { title: 'Usuarios', icon: 'home', to: 'admin/users' },
                { title: 'Productos', icon: 'home', to: 'admin/products' }
            ]
        }
    }
}
</script>

<style lang="scss">
    @import '@/styles/master';
    .z-html{
        z-index: 999;
    }
    .title {
        text-align: center;
        color: $c-color7;
    }
    .menu-admin {
        width: 100%;
        @media screen and (min-width: 764px) {
            width: 50%;
        }
    }
</style>