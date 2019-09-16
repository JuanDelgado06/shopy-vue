<template>
      <div class="center-absolute container">
            <main class="form shadow-1 z-index">
                <Auth 
                    action = "register"
                    @process="register($event)"
                />
            </main>
      </div>
</template>

<script>
import Auth from './forms/Auth'
import {db} from '@/main'
export default {
    name: 'Register',
    components: {
        Auth
    },
    methods: {
        register (user) {
            this.$store.dispatch('firebaseRegister', user) 
            .then( (userRegistered) => {    
                const data = {  
                    uid: userRegistered.user.uid,
                    email: user.email,
                    role: 'customer'
                }
                //  ESTA FORMA TAMBIEN ES CORRECTA PARA INGRESAR EL USUARIO A LA BASE DE DATOS
                // let uid = userRegistered.user.uid
                // console.log(uid);
                db.collection("users").doc(data.uid).set(data) .then(() => {
                    this.$store.commit('setRole', data.role);
                    this.$router.push('/');
                });
            })
            .catch(error => {
                this.message = error.message
                // eslint-disable-next-line
                console.log(this.message);

                if ( this.message == 'The email address is already in use by another account.' ) {
                    this.$q.notify({
                    color: 'negative', textColor: 'black',
                    icon: 'fas fa-exclamation-triangle',
                    position: 'bottom-right',
                    timeout: '3000',
                    message: 'Este Correo ya esta en uso, inicia sesion',
                    actions: [{ icon: 'close', color: 'black' }]
                })
                } else {
                    this.$q.notify({
                        color: 'negative', textColor: 'white',
                        icon: 'fas fa-exclamation-circle',
                        position: 'bottom-right',
                        timeout: '2500',
                        message: /* this.message */ 'Revisa el Formulario' ,
                        actions: [{ icon: 'close', color: 'white' }]
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
    @import '@/styles/master';
    .form {
        width: 95%;
        background: rgba(0, 0, 0, 0.342);
        border: 4px solid $c-color6;
        padding: 1rem;
        border-radius: 5px;
        color: #f2f2f2;
    }

</style>
