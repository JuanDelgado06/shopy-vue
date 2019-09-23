<template>
  <div>
    <q-header reveal :reveal-offset="100" class="header shadow-24">
      <q-toolbar class="header ">
        <q-btn
          flat
          dense
          round
          @click="toggleDrawer"
          aria-label="Menu"
          icon="menu"
          v-if="$mq.resize && $mq.below('629px')"
        />

      <q-toolbar-title v-if="$mq.resize && $mq.below('629px')" align="center">
          <q-item-label class="t-logo-desktop">ShopyVue</q-item-label>
        </q-toolbar-title>
      <!-- Desktop -->
        <q-btn v-if="$mq.resize && $mq.above('630px')" exat to="/"
          class="q-pa-xs" color="primary" flat icon="fas fa-home" />
        <q-toolbar-title v-if="$mq.resize && $mq.above('630px')">
          <q-item-label class="t-logo-desktop">ShopyVue</q-item-label>
        </q-toolbar-title>

        <div v-if="$mq.resize && $mq.above('630px')">
            <q-btn size="md" flat color="primary" class="item-nav-desktop" label="Mis Pedidos"  exact to="/orders"/>
            <q-btn size="md" flat color="primary" class="item-nav-desktop q-ml-sm" label="Tienda"  exact to="/shop"/>
            <q-btn dense round flat color="accent" class="item-nav-desktop q-ml-sm " icon="fas fa-shopping-cart"  exact to="/cart"> 
                 <!-- <q-badge color="primary" floating>{{number}}</q-badge> -->
                 <q-badge color="primary" floating>4</q-badge>
            </q-btn>
            <q-btn  @click="logout" size="md" outline  color="primary" class="item-nav-desktop q-ml-md" icon="fas fa-power-off" />
        </div>
        <!-- Mobile -->
        <div v-if="$mq.resize && $mq.below('629px')">
          <q-btn dense round flat color="accent" class="item-nav-desktop q-ml-sm" icon="fas fa-shopping-cart"  exact to="/shop"> 
                 <!-- <q-badge color="primary" floating>{{number}}</q-badge> -->
                 <q-badge color="secondary" floating>4</q-badge>
            </q-btn>
            <q-btn  @click="logout" size="sm" outline color="primary " class="item-nav-desktop q-pa-sm q-ml-md" icon="fas fa-power-off" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      v-if="$mq.resize && $mq.below('629px')"
      content-class="hamburger"
      :width="250"
      :breakpoint="600"
    >
      <q-list class="uppercase hamburger-container">
        <q-item-label to="/" class="title-mobile" v-if="$mq.resize && $mq.below('600px')">
          <h5 >
            <i class="fas fa-terminal"></i>
            ShopyVue 
            <i class="far fa-window-minimize"></i> 
          </h5>
      </q-item-label>

        <q-item to="/" exact class="item-nav-mobile">
          <q-item-section avatar >
            <q-icon name="fas fa-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/orders" exact class="item-nav-mobile">
          <q-item-section avatar >
            <q-icon name="fas fa-user-shield"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Mis Pedidos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/shop" exact class="item-nav-mobile">
          <q-item-section avatar>
            <q-icon name="fas fa-sign-in-alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label >Tienda</q-item-label>
          </q-item-section>
        </q-item>

      </q-list> 
    </q-drawer>
  </div>
</template>

<script>
import navigationMixin from '@/mixin/navigation';
export default {
  name: 'customer',
  mixins: [navigationMixin],
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      drawer: false,
      miniState: true,
    }
  }
}
</script>

<style lang="scss">
  @import '../../styles/master';

</style>
