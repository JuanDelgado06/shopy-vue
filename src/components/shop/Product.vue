<template>
    <div>
        <q-card class="my-card">
            <img :src="product.url">
      <q-card-section>
        <div class="text-h6">{{product.name}}</div>
      </q-card-section>

      <q-card-actions align="left">
        <q-btn outline round color="red" icon="favorite" label="product.price"/>
        <q-btn flat round color="teal" icon="bookmark"  @click="$emit('addToCart')" v-if="$store.getters.isCustomer"/>
      </q-card-actions>
    </q-card>
    </div>
</template>

<script>
export default {
    name: 'Product',
    props: {
        product: {
            type: Object,
            required: true
        }
    }
}
</script>