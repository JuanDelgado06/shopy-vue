export default {
    methods: {
        toggleDrawer () {
            this.leftDrawerOpen = !this.leftDrawerOpen
        },
        logout () {
            this.$store.dispatch('firebaseLogout').then(() => {
                this.$store.commit('setUser')
                this.$store.commit('setRole', 'guest')
                this.$router.push('/login')
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}