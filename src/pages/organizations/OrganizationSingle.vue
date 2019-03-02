<template>
    <main role="main" class="bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2 card shadow my-md-4 py-3">
                    <div class="row">
                        <div v-if="!loading" class="col-md-12">
                            <h1 class="text-center h3">{{ organization.name }}</h1>
                            <hr>
                            <img :src="organization.logoUrl" :alt="organization.name" class="img-fluid mx-auto d-block rounded-circle mt-2 mb-4" style="max-width:25%;">
                            <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <th class="text-right">Email Id</th>
                                        <td>{{ organization.email }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-right">Contact Number</th>
                                        <td>{{ organization.contact }}</td>
                                    </tr>
                                    <tr>
                                        <th class="text-right">Address</th>
                                        <td>{{ organization.address }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="loading" class="col-md-12">
                            <div class="d-flex justify-content-center align-items-center" style="min-height:15rem;">
                                <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
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
    data() {
        return {
            loading: false,
            organization: ''
        }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      }
    },
    methods: {
        fetchOrganization(){
            this.$Progress.start();
            this.loading = true;
            firebase.firestore().collection("users").doc(this.$route.params.id).get()
            .then(doc => {
                    console.log(doc.data().name);
                    this.organization = doc.data();
                    this.loading =  false;
                    this.$Progress.finish();
            })
            .catch(err => {
                this.loading =  false;
                this.$Progress.fail();
                console.log(err);
            });
        }
    },
    created() {
        this.$Progress.finish();
        this.fetchOrganization();
    }
}
</script>