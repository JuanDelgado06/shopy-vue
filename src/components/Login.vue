<template>
    <div class="center-absolute container">
            <main class="form shadow-1 z-index">
                <AuthLogin 
                    action = "login"
                    @process="login($event)"
                />
            </main>
      </div>
</template>

<script>
import AuthLogin from './forms/AuthLogin'
import {db} from '@/main'
    /* eslint-disable */
export default {
    name: 'Login',
    components: {
        AuthLogin
    },
    methods: {
        login (user) {
            this.$store.dispatch('firebaseLogin', user)
                .then((data) => {
                    // console.log(data.user.uid);
                    let uidUser = data.user.uid
                    
                    db.collection("users").doc(uidUser).onSnapshot( snapshot => {
                        console.log(snapshot.data());
                        // this.$store.commit('setRole', snapshot.data().role)
                        this.$router.push('/')
                    } )
                }).catch((error) => {
                     this.message = error.message
                    // eslint-disable-next-line
                    console.log(this.message);
                    if ( this.message == 'There is no user record corresponding to this identifier. The user may have been deleted.' ) {
                            this.$q.notify({
                            color: 'warning', textColor: 'black',
                            icon: 'fas fa-exclamation-triangle',
                            position: 'bottom-right',
                            timeout: '3000',
                            message: 'No estas registrado. Registrate para poder acceder',
                            actions: [{ icon: 'close', color: 'black' }]
                        })
                    }   else if ( this.message == 'The password is invalid or the user does not have a password.' ) {
                            this.$q.notify({
                            color: 'negative', textColor: 'black',
                            icon: 'fas fa-exclamation-triangle',
                            position: 'bottom-right',
                            timeout: '3000',
                            message: 'Tu contraseña no es correcta',
                            actions: [{ icon: 'close', color: 'black' }]
                        })
                    } else {
                        this.$q.notify({
                            color: 'negative', textColor: 'white',
                            icon: 'fas fa-exclamation-circle',
                            position: 'bottom-right',
                            timeout: '2500',
                            message: this.message,
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
