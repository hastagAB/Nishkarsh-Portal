<template>
    <main role="main" class="bg-light">
        <div class="container-fluid py-4">
            <div class="row">
                <AdminNavigation></AdminNavigation>

                <div class="col-md-9">
                    <div class="card p-3 shadow rounded-0">

                        <h1 class="h3 mb-4 text-center" v-if="!loading">All Organizations</h1>
                        <table class="table table-bordered table-hover table-responsive-sm" v-if="!loading && organizations != ''">
                            <thead class="bg-light">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="organization in organizations" :key="organization.email" >
                                <th><img :src="organization.logoUrl" class="border rounded-circle" height="60px" width="60px"></th>
                                <th>{{ organization.name }}</th>
                                <td>{{ organization.email }}</td>
                                <td>{{ organization.contact }}</td>
                                <td>{{ organization.address }}</td>
                            </tr>
                            </tbody>
                        </table>

                        <div class="d-flex justify-content-center align-items-center" style="min-height:15rem;" v-if="loading">
                            <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status">
                                <span class="sr-only">Loading...</span>
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
import AdminNavigation from '@/pages/admin/components/AdminNavigation.vue';
export default {
    components:{
        AdminNavigation
    },
    data(){
        return{
            loading:false,
            organizations:[]
        }
    },
    computed: {
      admin () {
        return this.$store.getters.admin
      },
      error () {
        return this.$store.getters.error
      }
    },
    methods: {
        fetchOrganizations(){
            this.loading = true;
            firebase.firestore().collection("users").where("type", "==", "organization").get()
            .then(snapshot => {
                let organizations = [];
                snapshot.docs.forEach(doc => {
                    organizations.push({
                        logoUrl: doc.data().logoUrl,
                        name: doc.data().name,
                        email: doc.data().email,
                        contact: doc.data().contact,
                        address: doc.data().address
                    });
                });
                this.organizations = organizations;
                this.loading =  false;
            })
            .catch(err => {
                this.loading =  false;
                console.log(err);
            });
        }
    },
    created() {
        this.fetchOrganizations();
    }

}
</script>

