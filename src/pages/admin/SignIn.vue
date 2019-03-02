<template>
    <main role="main" class="bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-4 offset-md-4 card shadow my-md-4 py-3">
                    <h1 class="text-center h3">Sign In</h1>
                    <form @submit.prevent="onSignin" v-if="!loading">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                        </div>
                        <button type="submit" class="btn btn-block btn-primary">Submit</button>
                    </form>

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
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      admin () {
        return this.$store.getters.admin
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signAdminIn', {email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    },
    created() {
        
    },
  }
</script>