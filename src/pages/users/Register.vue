<template>
    <main role="main" class="bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3 card shadow my-md-4 py-3">
                    <h1 class="text-center h3">Register</h1>
                    <form @submit.prevent="onRegister" v-if="!loading">
                        <div class="form-group">
                            <label for="Name">Name</label>
                            <input v-model="name" type="text" class="form-control" id="Name" placeholder="Enter name">
                        </div>
                        <div class="form-group">
                            <label for="Email">Email address</label>
                            <input v-model="email" type="email" class="form-control" id="Email" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label for="Phone">Contact Number</label>
                            <input v-model="contact" type="text" class="form-control" id="Phone" placeholder="Enter contact number">
                        </div>
                        <div class="form-group">
                            <label for="Address">Address</label>
                            <input v-model="address" type="text" class="form-control" id="Address" placeholder="Enter address">
                        </div>
                        <div class="form-group">
                            <label for="Password">Account Password</label>
                            <input v-model="password" type="password" class="form-control" id="Password" placeholder="Enter password">
                        </div>
                        <button type="submit" class="btn btn-block btn-primary">
                            Submit
                        </button>
                    </form>
                    <p class="mt-2" v-if="!loading" >Already have an account? <router-link to="/sign-in" >Sign In</router-link></p>

                    <div class="d-flex justify-content-center align-items-center" style="min-height:15rem;" v-if="loading">
                        <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </main><!-- /.container -->
</template>

<script>
import firebase from 'firebase';

export default {
    data (){
        return {
            name: '',
            email: '',
            contact: '',
            address: '',
            password: ''

        }
    },
    computed: {
      user () {
        return this.$store.getters.user;
      },
      error () {
        return this.$store.getters.error;
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
        onRegister () {
                this.$store.dispatch('signUserUp', {name: this.name, email: this.email, password: this.password, contact: this.contact, address: this.address})
            }
        },

        created() {
            
        },
    }

</script>