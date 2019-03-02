<template>
    <main role="main" class="bg-light">
        <div class="container-fluid py-4">
            <div class="row">
                <AdminNavigation></AdminNavigation>

                <div class="col-md-9">
                    <div class="card p-3 shadow rounded-0">

                        <h1 class="h3 mb-4 text-center" v-if="!loading">All Cases</h1>
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
            cases:[]
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
        fetchCases(){
            this.loading = true;
            firebase.firestore().collection("cases").get()
            .then(snapshot => {
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
                this.loading =  false;
            })
            .catch(err => {
                this.loading =  false;
                console.log(err);
            });
        }
    },
    created() {
        this.fetchCases();
    }

}
</script>

