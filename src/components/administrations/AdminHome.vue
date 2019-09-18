<template>
    <div >
        <q-page-container class="container">
                <h2 class="t3 title" v-if="$mq.resize && $mq.below('629px')">Administración</h2>
                <h2 class="t2 title" v-else>Administración</h2>

                <div class="admin-container">
                    <q-list class="menu-admin">
                        <q-item 
                                v-for="(item, index) in items" :key="index" :to="item.to"
                                clickable class="item-menu"
                            >
                                <!-- v-ripple :active="link === 'inbox'" @click="link = 'inbox'" -->
                                <q-item-section avatar>
                                    <q-icon color="primary" :name="item.icon" />
                                </q-item-section>
                                <q-item-section> {{ item.title }} </q-item-section>
                        </q-item>                
                    </q-list>
                    <q-page>
                        <router-view/>
                    </q-page>
                </div>

        </q-page-container>
    </div>
</template>

<script>
export default {
    name: 'AdminHome',
    data () {
        return {
            items: [
                { title: 'Usuarios', icon: 'fas fa-user-shield q-icon', to: 'admin/users' },
                { title: 'Productos', icon: 'fas fa-store', to: 'admin/products' }
            ]
        }
    }
}
</script>

<style lang="scss">
    @import '@/styles/master';
    .title {
        text-align: center;
        color: $c-color7;
    }
    .admin-nav {
        display: flex;
    }
    .admin-container {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
    }
    .menu-admin {
        display: flex;
        justify-content: space-around;
    }
</style>