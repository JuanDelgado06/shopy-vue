<template>
    <div class="z-index">
      <!-- @submit="onSubmit" -->
      <q-form
      @reset="onReset"
      class="q-gutter-md"
      v-model="valid">
      <q-input 
        v-model.trim="$v.email.$model"
        type="email"
        color="grey-1" dark
        input-class="text-form"
        outlined label="Ingresa tu email"
        name="email"
        :rules="emailRules"
        />

      <q-input v-model.trim="$v.password.$model"
      outlined :type=" isPwd ? 'password' : 'text' " 
      label="Ingrasa la Contraseña" 
      color="grey-1" dark
      input-class="text-form"
      :rules="passwordRules"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input v-model.trim="$v.password_confirmation.$model" 
      v-if="action === 'register'"
      outlined :type="isPwd ? 'password' : 'text'" 
      label="Ingrasa la Contraseña" 
      color="grey-1" dark
      input-class="text-form"
      :rules="passwordConfirmationRules"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn label="Enviar" type="submit" color="secondary" @click="submit" :disable="!valid"  size="1rem"/>
        <q-btn label="Reset" type="reset" color="secondary" outline class="q-ml-sm"  size="1rem" />
      </div>
    </q-form>

    </div>
</template>

<script>
import { required, email, sameAs, minLength, } from 'vuelidate/lib/validators'
// import { setTimeout } from 'timers';
// import { match } from 'minimatch';
export default {
    name: 'Auth',
    props: {
      // eslint-disable-next-line
      action: ''
    },
    data () {
      return {
          valid : false,
          isPwd: true,
          email: '',
          emailRules: [
            v => !!v || 'Este campo es requerido',
            //eslint-disable-next-line
            v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||  'El email no es correcto'
            ],
          password: '',
          passwordRules: [
              v => !!v || 'Este campo es requerido',
              v => v && v.length > 6 || 'La contraseña debe contener  de 6 mas digitos'
          ],
          password_confirmation: '',
          passwordConfirmationRules: [
              v => !!v || 'Este campo es requerido',
              v => v === this.password || 'Las contraseñas no son iguales'
           ],
           submitStatus: null
      }
  },
  validations: {
      email: {
        required,
        email,
        isUnique (value) {
            if (value === '') return true
          // eslint-disable-next-line
            const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return new Promise ((resolve) => {
              setTimeout( () => {
                  resolve( email_regex.test(value))
              } , 350 + Math.random() * 300)
            })
        }
      },
      password: {
        required,
        minLength: minLength(6)
      },
      password_confirmation: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs('password')
      }
  },
  methods: {
    submit () {
      this.$v.$touch()
        if (this.$v.$invalid) {
          // eslint-disable-next-line
          console.log('Error con el formulario pero funciona bien el plugin vuelidate');
          this.submitStatus = 'ERROR'
        } 
        else {
          // eslint-disable-next-line
          console.log('enviado');
          this.submitStatus = 'OK'
          this.$emit('process', {email: this.email, password: this.password})
        }
      },
    onReset () {
      this.email = ''
      this.password = ''
      this.password_confirmation =  ''
      this.$q.notify({
          color: 'secondary', textColor: 'white',
          icon: 'fas fa-broom',
          position: 'bottom-right',
          timeout: '2500',
          message: 'Formulario Limpio',
          actions: [{ icon: 'close', color: 'white' }]
    })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/master';
  .text-form {
    color: #f2f2f2;
    font-weight: 200;
    border-color: #f2f2f2;
  }
</style>