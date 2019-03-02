<template>
    <main role="main" class="bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-12 card shadow my-md-4 py-3">
                    <h1 class="text-center h3">Open Cases</h1>
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
                                <td class="text-center"><router-link class="btn btn-primary rounded" :to="'/case/' + case1.id" >View</router-link></td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="!loading && cases == ''"  class="alert alert-secondary mx-auto d-block text-center" style="width:50%;">
                        No Cases to show
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
            cases: []
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
        fetchCases(userId){
            console.log(userId);
            this.$Progress.start();
            this.loading = true;
            const cases = [];

            let databaseRef = "user_id";
            if(this.user.type == "organization"){
                databaseRef = "organization_user_id";
            }
            firebase.firestore().collection("cases").where(databaseRef, "==", userId).get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    cases.push({
                        id: doc.id,
                        seller: doc.data().seller,
                        buyer: doc.data().buyer,
                        status: doc.data().status,
                        amount: doc.data().transaction_amount,
                    })
                });
                this.cases = cases;
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
        console.log(this.user);
        this.fetchCases(this.user.id);
    }
}



</script>