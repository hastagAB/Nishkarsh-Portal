<template>
    <main role="main" class="bg-light">
        <div class="container-fluid py-4">
            <div class="row">
                <AdminNavigation></AdminNavigation>

                <div class="col-md-9">
                    <div class="card p-3 shadow rounded-0">

                        <div class="d-flex mb-4">
                        <button type="button" class="btn btn-link mr-3" @click="$router.go(-1)"><i class="far fa-arrow-alt-circle-left"></i> Go back</button>
                        <h1 class="text-center h3">Case ID:  <small class="h5 text-muted">{{ this.$route.params.id }}</small></h1>
                        </div>
                        

                        <table class="table table-bordered"  v-if="!loading">
                            <tbody>
                                <tr>
                                    <th>Case Status:</th>
                                    <td><span class="badge badge-secondary">{{ caseObj.status }}</span></td>
                                </tr>
                                <tr>
                                    <th>Transaction ID:</th>
                                    <td>{{ caseObj.transaction_id }}</td>
                                </tr>
                                <tr>
                                    <th>Buyer Name:</th>
                                    <td>{{ caseObj.buyer }}</td>
                                </tr>
                                <tr>
                                    <th>Seller Name:</th>
                                    <td>{{ caseObj.seller }}</td>
                                </tr>
                                <tr>
                                    <th>Transaction Amount:</th>
                                    <td>Rs {{ caseObj.transaction_amount }}</td>
                                </tr>
                                <tr>
                                    <th>Transaction Date:</th>
                                    <td>{{ caseObj.transaction_date }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="row">

                            <div class="col-md-6 my-4">
                                <div class="card" v-if="!loading">
                                    <div class="card-header text-center h5">User's remarks</div>
                                    <div class="card-body bg-light overflow-auto" style="height:300px;">
                                        <div class="alert alert-light border" v-for="remark in userRemarks" :key="remark.date">
                                            <p>{{ remark.text }}</p> 
                                            <p class="text-right mb-0 font-weight-bold">{{ remark.time }}</p>
                                        </div>
                                        <p v-if="userRemarks == ''" class="text-center mt-5">Nothing to show</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 my-4">
                                <div class="card" v-if="!loading">
                                    <div class="card-header text-center h5">Organizations's remarks</div>
                                    <div class="card-body bg-light overflow-auto" style="height:300px;">
                                        <div class="alert alert-light border" v-for="remark in organizationRemarks" :key="remark.date">
                                            <p>{{ remark.text }}</p> 
                                            <p class="text-right mb-0 font-weight-bold">{{ remark.time }}</p>
                                        </div>
                                        <p v-if="organizationRemarks == ''" class="text-center mt-5">Nothing to show</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <div class="row">

                            <div class="col-md-6 my-4">
                                <div class="card" v-if="!loading">
                                    <div class="card-header text-center h5">User's files</div>
                                    <div class="card-body bg-light overflow-auto" style="height:300px;">
                                        <div class="alert alert-light border" v-for="file in userFiles" :key="file.date">
                                            <p><a :href="file.url" target="_blank">{{ file.name }}</a></p>
                                            <p class="text-right mb-0 font-weight-bold">{{ file.date }}</p>
                                        </div>
                                        <p v-if="userFiles == ''" class="text-center mt-5">No file uploaded yet</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 my-4">
                                <div class="card" v-if="!loading">
                                    <div class="card-header text-center h5">Organization's files</div>
                                    <div class="card-body bg-light overflow-auto" style="height:300px;">
                                        <div class="alert alert-light border" v-for="file in organizationFiles" :key="file.date">
                                            <p><a :href="file.url" target="_blank">{{ file.name }}</a></p>
                                            <p class="text-right mb-0 font-weight-bold">{{ file.date }}</p>
                                        </div>
                                        <p v-if="organizationFiles == ''" class="text-center mt-5">No file uploaded yet</p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

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
            caseObj:[],
            userRemarks:[],
            userFiles:[],
            organizationRemarks:[],
            organizationFiles:[]
        }
    },
    computed: {
      admin () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      }
    },
    methods: {
        fetchAllData(){
            this.loading = true;
            let user_id = '';
            let organization_user_id ='';
            firebase.firestore().collection("cases").doc(this.$route.params.id).get()
            .then(doc => {
                this.caseId = doc.id;
                this.caseObj = doc.data();
                user_id = doc.data().user_id;
                organization_user_id = doc.data().organization_user_id;

                return firebase.firestore().collection("userRemarks").where("case_id", "==", this.$route.params.id).where("user_id", "==", user_id).get()
            })
            .then(snapshot => {
                let userRemarks = [];
                snapshot.forEach(doc => {
                    userRemarks.push({
                        id: doc.id,
                        text: doc.data().text,
                        time: doc.data().time
                    })
                });
                this.userRemarks = userRemarks;

                return firebase.firestore().collection("userFiles").where("case_id", "==", this.$route.params.id).where("user_id", "==", user_id).get()
            })
            .then(snapshot => {
                let userFiles = [];
                snapshot.forEach(doc => {
                    userFiles.push({
                        id: doc.id,
                        name:doc.data().name,
                        url: doc.data().url,
                        time: doc.data().time
                    })
                });
                this.userFiles = userFiles;
                return firebase.firestore().collection("userRemarks").where("case_id", "==", this.$route.params.id).where("user_id", "==", organization_user_id).get()
            })
            .then(snapshot => {
                let organizationRemarks = [];
                snapshot.forEach(doc => {
                    organizationRemarks.push({
                        id: doc.id,
                        text: doc.data().text,
                        time: doc.data().time
                    })
                });
                this.organizationRemarks = organizationRemarks;

                return firebase.firestore().collection("userFiles").where("case_id", "==", this.$route.params.id).where("user_id", "==", organization_user_id).get()
            })
            .then(snapshot => {
                let organizationFiles = [];
                snapshot.forEach(doc => {
                    organizationFiles.push({
                        id: doc.id,
                        name:doc.data().name,
                        url: doc.data().url,
                        time: doc.data().time
                    })
                });

                this.organizationFiles = organizationFiles;
                this.loading =  false;
            })
            .catch(err => {
                this.loading =  false;
                console.log(err);
            });
        }
    },
    created() {
        this.fetchAllData();
    }

}
</script>

