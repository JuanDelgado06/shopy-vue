<template>
    <div class="fixed-center text-center">
    <h2 class="text-faded">Lo siento, no hay nada por aqui...<strong>(404)</strong></h2>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Go back</q-btn>
  </div>
</template>

<script>
export default {
    name: 'Page404'
}
</script>