<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow sticky-top">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">Nishkarsh</router-link> 
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
                aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        
            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav ml-auto">
                    <li v-for="menu in menuItems" :key="menu.title"  class="nav-item">
                        <router-link :to="menu.link" class="nav-link">{{ menu.title }}</router-link> 
                    </li>

                    <li v-if="userIsAuthenticated" class="nav-item">
                        <a class="nav-link border-left"><strong>Signed In as {{ this.user.email }}</strong></a> 
                    </li>
                    
                    <li v-if="userIsAuthenticated" class="nav-item">
                        <a @click.prevent="logout" href="" class="nav-link">Log Out</a> 
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    computed: {
        user () {
            return this.$store.getters.user;
        },
        error () {
            return this.$store.getters.error;
        },
        menuItems () {
            let menuItems = [
                {title: 'Home', link: '/'},
                {title: 'User Register', link: '/register'},
                {title: 'Organization Register', link: '/register-organization'},
                {title: 'Sign in', link: '/sign-in'}
            ]
            if (this.userIsAuthenticated) {
                menuItems = [
                {title: 'Home', link: '/'},
                {title: 'Organizations', link: '/organizations'},
                {title: 'Register Case', link: '/register-case'},
                {title: 'Opened Cases', link: '/opened-cases'}
                ]
            }
            return menuItems
        },
        userIsAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('logout');
            this.$store.dispatch('logoutAdmin');
        }
    }
}
</script>

<style scoped>
.navbar-light .navbar-nav .nav-link {
    font-family: karla, sans-serif;
    font-weight: 400;
    text-transform: uppercase;
    color: #464646!important;
}


.navbar-light .navbar-nav .active>.nav-link, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .show>.nav-link {
    color: #5d33fb!important;
}

</style>

