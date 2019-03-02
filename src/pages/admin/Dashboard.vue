<template>
    <main role="main" class="bg-light">
        <div class="container-fluid py-4">
            <div class="row">
                <AdminNavigation></AdminNavigation>

                <div class="col-md-9">
                    <div class="card p-3 shadow rounded-0">

                        <div class="row" v-if="!loading">
                            <div class="col-md-4">
                                <router-link to="admin/cases" class="card">
                                    <div class="card-body text-white bg-info text-center">
                                        <i class="far fa-file-alt"></i>
                                        <h5 class="card-title text-white my-2">All Cases</h5>
                                        <p class="card-text">{{ caseCount }}</p>
                                    </div>
                                </router-link>
                            </div>
                            <div class="col-md-4">
                                <router-link to="admin/users" class="card">
                                    <div class="card-body text-white bg-primary text-center">
                                        <i class="far fa-user-circle"></i>
                                        <h5 class="card-title text-white my-2">All Users</h5>
                                        <p class="card-text">{{ userCount }}</p>
                                    </div>
                                </router-link>
                            </div>
                            <div class="col-md-4">
                            <router-link to="admin/organizations" class="card">
                                <div class="card-body text-white bg-danger text-center">
                                    <i class="far fa-building"></i>
                                    <h5 class="card-title text-white my-2">All Organizations</h5>
                                    <p class="card-text">{{ organizationCount }}</p>
                                </div>
                            </router-link>
                            </div>
                        </div>

                        <h1 class="h3 mt-5" v-if="!loading">Latest Cases</h1>
                        <table class="table table-bordered table-hover table-responsive-sm" v-if="!loading && cases != ''">
                            <thead class="bg-light">
                                <tr>
                                    <th scope="col">Case ID</th>
                                    <th scope="col">Opened By</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="case1 in cases" :key="case1.id" >
                                <th>{{ case1.id }}</th>
                                <td>{{ case1.buyer }}</td>
                                <td>{{ case1.amount }}</td>
                                <td>{{ case1.status }}</td>
                                <td class="text-center"><router-link class="btn btn-primary rounded" :to="'/admin/case/' + case1.id" >View</router-link></td>
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
            cases:[],
            caseCount:'',
            userCount:'',
            organizationCount:''
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
        getAllData(){
            this.loading = true;
            firebase.firestore().collection("cases").limit(10).get()
            .then(snapshot => {
                this.caseCount = snapshot.size;
                let cases = [];
                snapshot.docs.forEach(doc => {
                    cases.push({
                        id: doc.id,
                        seller: doc.data().seller,
                        buyer: doc.data().buyer,
                        status: doc.data().status,
                        amount: doc.data().transaction_amount,
                    });
                });
                this.cases = cases;
                return firebase.firestore().collection("users").where("type", "==", "user").get()
            })
            .then(snapshot => {
                this.userCount = snapshot.size;
                return firebase.firestore().collection("users").where("type", "==", "organization").get()
            })
            
            .then(snapshot => {
                this.organizationCount = snapshot.size;
                this.loading =  false;
            })
            .catch(err => {
                this.loading =  false;
                console.log(err);
            });
        }
    },
    created() {
        this.getAllData();
    }

}
</script>

<style scoped>
.far{
    font-size:2rem;
}

.card a{
    text-decoration:none;
}

</style>

