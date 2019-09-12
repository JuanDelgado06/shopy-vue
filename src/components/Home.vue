<template>
        <div class="center-absolute container">
            <main class="home shadow-24 z-index">
                <h2 class="t-home t-center">
                    <!-- {{ $t("welcome.title", {app: 'Shopy Vue'}) }} -->
                    Bienvenido a 
                        <span class="home-logo">Shopy Vue</span>
                </h2>
                <p class="slogan t-center">
                    Encuentra todo lo que necesitas saber sobre Vue.js el Framework Progresivo de la comunidad
                </p>
                <div class="t-center container-btn ">
                    <router-link to="/register" class="btn shadow-24">Ver Mas</router-link>
                </div>
            </main>
        </div>
</template>

<script>
export default {
    name: 'home'
}
</script>

<style lang="scss">
@import '@/styles/master';
    .center-absolute {
        display: flex;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
    }
    .home {
        background: $gradient-two;
        padding: 10px;
        border: 4px solid $c-color6;
        border-radius: 5px;
        transition: all .65s ease-in;
        // z-index: 2;
        @media screen and (min-width:764px) {
            width: 60%;
        }
        &:hover {
            background: $gradient-three;
        }
    }
    .t-home {
        font-size: 4rem;
        line-height: .8;
        @media screen and (min-width:764px) {
            font-size: 5rem;
        }
    }
    .home-logo {
        font-weight: bold;
        display: inline-block;
        color: $c-color7;
    }
    .slogan {
        margin-bottom: 1rem;
        margin-top: 10px;
        font-size: 1.5rem;
        font-family: $font-normal;
        color: $c-default;
        @media screen and (min-width:764px) {
            font-size: 2rem;
        }
    }
    .container-btn {
        margin-bottom: 1rem;
    }
</style>