<template>
    <div class="center-absolute container">
            <main class="form shadow-1 z-index">
                <Auth 
                    action = "login"
                    @process="login($event)"
                />
            </main>
      </div>
</template>

<script>
import Auth from './forms/Auth'
import {db} from '@/main'
    /* eslint-disable */
export default {
    name: 'Login',
    components: {
        Auth
    },
    methods: {
        login (user) {
            this.$store.dispatch('firebaseLogin', user)
                .then((data) => {
                    
                }).catch((err) => {
                    
                });
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
