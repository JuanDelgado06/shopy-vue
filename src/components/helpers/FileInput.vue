<template>
  <div :class="imageUrl ? 'modal-image' : '' ">
    <div >
      <img
        :src="imageUrl"
        ref="imageUrl"
        @click="onPickFile"
        style="cursor: pointer;"
      />
    </div>
    <div align="right">
      <q-btn  push color="accent" text-color="black" raised @click="onPickFile" v-if="!imageUrl" >
        Seleccionar Imagen
      </q-btn>
      <q-btn 
          push color="negative" raised icon="delete"
          class="pointer" @click="removeFile" v-else>
      </q-btn>
      <input
        type="file"
        ref="image"
        name="image"
        :accept="accept"
        @change="onFilePicked"
      >
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String
      },
      accept: {
        type: String,
        default: '*'
      },
      selectLabel: {
        type: String,
      },
      removeLabel: {
        type: String,
      }
    },

    data() {
      return {
        imageUrl: ''
      }
    },

    watch: {
      value(value) {
        this.imageUrl = value
      }
    },

    mounted() {
      this.imageUrl = this.value
    },

    methods: {
      onPickFile () {
        this.$refs.image.click()
      },

      onFilePicked (event) {
        const files = event.target.files || event.dataTransfer.files;

        if (files && files[0]) {
          let filename = files[0].name;

          if (filename && filename.lastIndexOf('.') <= 0) {
            return
          }

          const fileReader = new FileReader();
          fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result
          });

          fileReader.readAsDataURL(files[0]);

          this.$emit('input', files[0]);
        }
      },

      removeFile() {
        this.imageUrl = ''
      }
    }
  }
</script>

<style lang="scss" scope>
@import '@/styles/master';
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
  .modal-image {
    width: 75%;
    @media screen and (min-width: 600px) {
      width: 65%; 
    }
    // border: 2px solid $c-color6;
    // border-radius: .8rem;
    // padding: 2%;
    // background: $c-color4;
  }
  img {
    width: 100%;
    max-width: 100%;
    border-radius: .8rem;
  }
</style>
