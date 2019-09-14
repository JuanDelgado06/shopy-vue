<template>
  <div>
    <q-header reveal :reveal-offset="100" class="header shadow-18">
      <q-toolbar class="header ">
        <q-btn
          flat
          dense
          round
          @click="toggleDrawer"
          aria-label="Menu"
          icon="menu"
          v-if="$q.platform.is.mobile"
        />
      <div class="f-center "  v-if="$q.platform.is.mobile">
        <q-item to="/">
          <q-item-label class="t-logo t3">ShopyVue</q-item-label>
        </q-item>
      </div>
      <!-- Desktop -->
        <q-btn v-if="$q.platform.is.desktop" push color="secondary" round icon="fas fa-home"  exat to="/"/>
        <q-toolbar-title >
          <q-item-label class="t-logo-desktop">ShopyVue-Admi</q-item-label>
        </q-toolbar-title>

        <q-btn v-if="$resize && $mq.above(992)" push size="md" color="secondary" class="item-nav-desktop" label="Administrar"  exact to="/login"/>
        <q-btn v-if="$q.platform.is.desktop" push size="md" color="secondary" class="item-nav-desktop" label="Tienda"  exact to="/register"/>
        <q-btn  @click="logout" v-if="$q.platform.is.desktop" push size="md" color="secondary" class="item-nav-desktop" label="Cerrar Sesión"/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      v-if="$q.platform.is.mobile"
      content-class="header hamburger"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="250"
      :breakpoint="600"
      :mini="miniState"
    >
      <q-list class="t4 pointer uppercase">
        <q-item-label to="/" v-if="$q.platform.is.mobile">
          <h6 class="title-mobile">
            <i class="fas fa-terminal"></i>
            ShopyVue 
            <i class="far fa-window-minimize"></i> 
          </h6>
        </q-item-label>

        <q-item to="/" exact class="item-nav-mobile">
          <q-item-section avatar >
            <q-icon name="fas fa-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/login" exact class="item-nav-mobile">
          <q-item-section avatar >
            <q-icon name="fas fa-door-open" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Administrar</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/register" exact class="item-nav-mobile">
          <q-item-section avatar>
            <q-icon name="fas fa-sign-in-alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tienda</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/register" exact class="item-nav-mobile">
          <q-item-section avatar>
            <q-icon name="fas fa-sign-in-alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cerrar Sesión</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </div>
</template>

<script>
import navigationMixin from '@/mixin/navigation';
export default {
  name: 'guest',
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
  .header {
    background: $c-color5;
    color: $c-color6;
  }
  .hamburger {
    border-right: 2px solid $c-color4;
  }
  .t-logo {
    color: $c-color6;
    font-weight: bold;
    font-family: $font-normal;
  }
  .t-logo-desktop {
    @extend .t-logo;
    font-size: 2rem;
    @media screen and (min-width: 800px){
      font-size: 3rem;
    }
  }
  .title-mobile {
    color: $c-color6;
    background: $c-color4;
    margin: 0;
    padding: 10px 0;
    text-align: center;
    font-family: $font-normal;
  }
  .item-nav-mobile {
    border-bottom: 2px solid $c-color3;
    font-family: $font-normal;
  }
  .item-nav-desktop {
    margin: 0 .5rem;
    font-size: 1.3rem;
    font-weight: bold;
    font-family: $font-normal;
  }
  .icon-home {
    color: $c-vue;
  }
  .uppercase {
    text-transform: uppercase;
    font-weight: 600;
  }
  .router-link-exact-active {
    border-bottom: 2px solid $c-color7;
    color: $c-color7;
  }
  .f-center {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-right: 10%;
  }
</style>
