<template>
  <q-layout class="master">
    <img src="./assets/bracket.svg" alt="bracket" class="svg-1">
    <img src="./assets/bracket.svg" alt="bracket" class="svg-2">
    <img src="./assets/bracket.svg" alt="bracket" class="svg-3">
    <img src="./assets/bracket.svg" alt="bracket" class="svg-4">
    <Guest />
    <router-view/>
    <Footer />
  </q-layout>
</template>

<script>
import Guest from './components/navigation/Guest'
import Footer from './components/Footer'
export default {
  name: 'app',
  components : {
    Guest,
    Footer
  }
}
</script>

<style lang="scss">
@import '@/styles/master';
  .master {
    background: $gradient;
  } 
  %svg {
    position: absolute;
    z-index: 1;
    width: 18%;
  }
  .svg-1 {
    @extend %svg;
    top: 10%;
    right: 10%;
    transform: rotate(-5deg);
}
  .svg-2 {
    @extend %svg;
    bottom: 10%;
    left: 10%;
    transform: rotate(-5deg);
  }
  .svg-3 {
    @extend %svg;
    top: 10%;
    left: 10%;
    transform: rotate(5deg);
  }
  .svg-4 {
    @extend %svg;
    bottom: 10%;
    right: 10%;
    transform: rotate(5deg);
  }
</style>