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
          v-if="$mq.resize && $mq.below('629px')"
        />
      <!-- <div class="f-center "  v-if="$q.platform.is.mobile">
        <q-item to="/">
          <q-item-label class="t-logo t3">ShopyVue</q-item-label>
        </q-item>
      </div> -->
      <q-toolbar-title v-if="$mq.resize && $mq.below('629px')" align="center">
          <q-item-label class="t-logo-desktop">Admin-Vue</q-item-label>
        </q-toolbar-title>
      <!-- Desktop -->
        <q-btn v-if="$mq.resize && $mq.above('630px')" exat to="/"
          class="q-pa-xs" color="primary" flat icon="fas fa-home" />
        <q-toolbar-title v-if="$mq.resize && $mq.above('630px')">
          <q-item-label class="t-logo-desktop">Admin-Vue</q-item-label>
        </q-toolbar-title>

       <div class="navigation-button" v-if="$mq.resize && $mq.above('630px')">
            <q-btn size="md" outline color="primary" class="item-nav-desktop" label="Iniciar Sesión"  exact to="/login"/>
            <q-btn size="md" outline color="accent" class="item-nav-desktop q-ml-sm" label="Registrarse"  exact to="/register"/>
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
      <q-list class="uppercase">
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

        <q-item to="/login" exact class="item-nav-mobile">
          <q-item-section avatar >
            <q-icon name="fas fa-door-open" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ingresa</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/register" exact class="item-nav-mobile">
          <q-item-section avatar>
            <q-icon name="fas fa-sign-in-alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Registrate</q-item-label>
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
    background: $c-color3;
    border-right: 2px solid $c-color3;
  }
  .t-logo {
    color: $c-color6;
    font-weight: bold;
    font-family: $font-normal;
  }
  .t-logo-desktop {
    @extend .t-logo;
    font-size: 1.6rem;
    @media screen and (min-width: 630px){
      font-size: 2rem;
    }
    @media screen and (min-width: 800px){
      font-size: 2.5rem;
    }
  }
  .title-mobile {
    color: $c-color7;
    background: $c-color4;
    text-align: center;
    font-family: $font-normal;
    padding: 14px 0;
    h5 {
    margin: 0;
    }
  }
  .item-nav-mobile {
    font-family: $font-normal;
    text-transform: capitalize;
    font-size: 1.5rem;
    font-weight: normal;
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
