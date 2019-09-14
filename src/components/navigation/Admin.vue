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
          v-if="$mq.resize && $mq.below('600px')"
        />
      <div class="f-center "  v-if="$q.platform.is.mobile">
        <q-item to="/">
          <q-item-label class="t-logo t3">ShopyVue</q-item-label>
        </q-item>
      </div>
      <!-- Desktop -->
        <q-toolbar-title v-if="$q.platform.is.desktop">
          <q-item-label class="t-logo-desktop">Admin-Vue</q-item-label>
        </q-toolbar-title>

        <div class="navigation-button" v-if="$mq.resize && $mq.above('600px')">
            <q-btn push size="md" color="secondary" class="item-nav-desktop" label="Administrar"  exact to="/login"/>
            <q-btn push size="md" color="secondary" class="item-nav-desktop" label="Tienda"  exact to="/register"/>
            <q-btn  @click="logout" v-if="$q.platform.is.desktop" size="md" outline color="secondary" class="item-nav-desktop" icon="fas fa-power-off" label="Cerrar Sesión"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      v-if="$mq.resize && $mq.below('600px')"
      content-class="header hamburger"
      :width="250"
      :breakpoint="600"
    >
      <q-list class="uppercase hamburger-container">
        <q-item-label to="/" class="title-mobile">
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

        <q-item exact class="end">
          <q-item-section>
              <q-btn  @click="logout" v-if="$q.platform.is.desktop" size="md" outline color="secondary" icon="fas fa-power-off" label="Cerrar Sesión"/>
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
    font-size: 1.6rem;
    @media screen and (min-width: 600px){
      font-size: 2rem;
    }
    @media screen and (min-width: 800px){
      font-size: 2.5rem;
    }
  }
  .title-mobile {
    color: $c-color6;
    background: $c-color4;
    text-align: center;
    font-family: $font-normal;
    padding: 12px 0;
    h5 {
    margin: 0;
    }
  }
  .item-nav-mobile {
    border-bottom: 2px solid $c-color3;
    font-family: $font-normal;
    font-size: 1.5rem;
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
