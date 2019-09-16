<template>
    <div class="brackets">
         <img src="../assets/bracket.svg" alt="bracket" class="svg-1">
        <img src="../assets/bracket.svg" alt="bracket" class="svg-2">
        <img src="../assets/bracket.svg" alt="bracket" class="svg-3">
        <img src="../assets/bracket.svg" alt="bracket" class="svg-4">
    </div>
</template>

<style lang="scss">
// @import '@/styles/master';
    .brackets {
        z-index: 1;
    }
    %svg {
    position: absolute;
    width: 18%;
    pointer-events: none;
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