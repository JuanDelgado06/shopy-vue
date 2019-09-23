<template>
    <div>
      <q-layout class="master" >

        <div v-if="$store.state.loaded">
            <GuestNavigation v-if="role === 'guest' "/>
            <AdminNavigation v-if="role === 'admin' "/>
            <CustomerNavigation v-if="role === 'customer' "/>
            <!-- <brackets /> -->
            <router-view/>
            <Footer />  
        </div>

        <q-page-container  v-else class="flex flex-center justify-center all-view">
            <div class="q-gutter-md row">
                <q-spinner-hourglass  
                  color="accent"
                  size="10rem">
                </q-spinner-hourglass >
            </div>
        </q-page-container>

      </q-layout>
    </div>
</template>

<script>
import GuestNavigation from './components/navigation/Guest'
import AdminNavigation from './components/navigation/Admin'
import CustomerNavigation from './components/navigation/Customer'
import Footer from './components/Footer'
import {mapGetters} from 'vuex'
export default {
  name: 'app',
  components : {
    GuestNavigation,
    AdminNavigation,
    CustomerNavigation,
    Footer
  },
  computed: {
    ...mapGetters(['role'])
  }
}
</script>

<style lang="scss">
@import '@/styles/master';
  .master {
    background: $gradient;
  } 
  .all-view {
    min-height: 100vh;
  }
  .q-router-link--exact-active  {
        border-bottom: 3px solid;
    }
</style>