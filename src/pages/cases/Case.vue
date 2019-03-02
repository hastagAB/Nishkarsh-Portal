<template>
    <main role="main" class="bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-12 card shadow my-md-4 py-3">
                    <h1 class="text-center h3 mb-4"><small>Case Id:</small>  {{ caseId }}</h1>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card" v-if="!loading">
                                <div class="card-header text-center h5"> Status <span class="badge badge-secondary">{{ caseObj.status }}</span> </div>
                                <div class="card-body bg-light">

                                    <table class="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <th class="text-right">Transaction ID:</th>
                                                <td>{{ caseObj.transaction_id }}</td>
                                            </tr>
                                            <tr>
                                                <th class="text-right">Buyer Name:</th>
                                                <td>{{ caseObj.buyer }}</td>
                                            </tr>
                                            <tr>
                                                <th class="text-right">Transaction Amount:</th>
                                                <td>Rs {{ caseObj.transaction_amount }}</td>
                                            </tr>
                                            <tr>
                                                <th class="text-right">Transaction Date:</th>
                                                <td>{{ caseObj.transaction_date }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="d-flex justify-content-center align-items-center" style="min-height:15rem;" v-if="loading">
                                <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-6">
                            <p><strong>The case is being reviewed by a committee member</strong></p>
                            <p>Please provide as much information as possible to support your case.</p>
                            <p>Examples of the documentation that you can provide as compelling evidence include, but are not limited to:</p>
                            <ul>
                                <li>Date and time goods were sold/received</li>
                                <li>Description of the goods sold/received</li>
                                <li>Screenshot showing receipt by the purchaser</li>
                                <li>Correspondence with the purchaser/seller acknowledging receipt of the item or service as described</li>
                            </ul>
                        </div>
                        
                        <Remarks :caseId="this.$route.params.id"></Remarks>

                        <Files :caseId="this.$route.params.id" ></Files>
                        

                    </div>
                </div>
            </div>
        </div>
    </main><!-- /.container -->
</template>

<script>
import Remarks from '@/components/case/Remarks.vue';
import Files from '@/components/case/Files.vue';
import firebase from 'firebase';

export default {
    components:{
        Remarks,
        Files
    },
    data() {
        return {
            loading: false,
            caseId: '',
            caseObj: ''
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
        fetchCase(){
            this.$Progress.start();
            this.loading = true;
            firebase.firestore().collection("cases").doc(this.$route.params.id).get()
            .then(doc => {
                    this.caseId = doc.id;
                    this.caseObj = doc.data();
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
        this.fetchCase();
    }
}

</script>