<template>
    <main role="main" class="bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2 card shadow my-md-4 py-3">
                    <h1 class="text-center h3">All Organizations</h1>

                    <div class="list-group" v-if="!loading">
                        <router-link :to="'/organization/' + organization.id" v-for="organization in organizations" :key="organization.userid" class="list-group-item list-group-item-action">
                            
                            <img :src="organization.logo" class="rounded border" height="60px" width="60px">  {{ organization.name }} - {{ organization.address }}
                        
                        </router-link>
                    </div>

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
    data() {
        return {
            loading: false,
            organizations: []
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
        fetchOrganizations(){
            this.$Progress.start();
            this.loading = true;
            const organizations = [];
            firebase.firestore().collection("users").where("type", "==", "organization").get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    organizations.push({
                        id: doc.id,
                        name: doc.data().name,
                        logo: doc.data().logoUrl,
                        address: doc.data().address
                    })
                });
                this.organizations = organizations;
                this.loading =  false;
                this.$Progress.finish();
            })
            .catch(err => {
                this.loading =  false;
                console.log(err);
                this.$Progress.fail();
            });
        }
    },
    created() {
        this.fetchOrganizations();
    }
}
</script>