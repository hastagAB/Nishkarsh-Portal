<template>
    <main role="main" class="bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3 card shadow my-md-4 py-3">
                    <h1 class="text-center h3">Register a case</h1>
                    <form @submit.prevent="registerCase">
                        <div class="form-group">
                            <label for="OrganizationName">Against the organization</label>
                            <select class="custom-select" v-model="selectedOrgId" v-if="!loading">
                                <option v-for="org in organizations" :key="org.id" :value="org.id">{{ org.name }}</option>
                            </select>

                            <div class="d-flex justify-content-center align-items-center" v-if="loading">
                                <div class="spinner-border text-primary" style="width: 2rem; height: 2rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>

                        </div>
                        <div class="form-group">
                            <label for="Name">Transaction Amount</label>
                            <input v-model="transaction_amount" type="text" class="form-control" placeholder="Transaction amount">
                        </div>
                        <div class="form-group">
                            <label for="Name">Transaction Date</label>
                            <input v-model="transaction_date" type="text" class="form-control" placeholder="Enter the transaction date">
                        </div>
                        <div class="form-group">
                            <label for="Name">Transaction Id</label>
                            <input v-model="transaction_id" type="text" class="form-control" placeholder="Enter transaction id / reference">
                        </div>
                        
                        <button type="submit" class="btn btn-block btn-primary" :disabled="btnenabled" >
                            <span v-if="btnenabled" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            {{ btntext }}
                        </button>
                    </form>
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
            organizations: [],
            selectedOrgId: '',
            transaction_amount:'',
            transaction_date:'',
            transaction_id:'',
            btntext: 'Register a case',
            btnenabled: false,
            loading: false
        }
    },
    computed: {
      user () {
        return this.$store.getters.user;
      },
      error () {
        return this.$store.getters.error;
      }
    },
    methods: {
        findSelectedOrganization(){
            return firebase.firestore().collection("users").doc(this.selectedOrgId).get();
        },
        findAllOrganizations(){
            this.loading = true;
            const organizations = [];
            firebase.firestore().collection("users").where("type", "==", "organization").get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    organizations.push({
                        id: doc.id,
                        name: doc.data().name
                    })
                });
                this.organizations = organizations;
                this.loading =  false;
            })
            .catch(err => {
                this.loading =  false;
                console.log(err);
            });
        },
        registerCase(){
            this.btnenabled = true;
            this.btntext = 'Registering';
            this.findSelectedOrganization()
            .then(doc =>{
                let newCase = {
                    organization_user_id: this.selectedOrgId,
                    user_id: this.user.id,
                    seller: doc.data().name,
                    buyer: this.user.name,
                    transaction_amount: this.transaction_amount,
                    transaction_date: this.transaction_date,
                    transaction_id: this.transaction_id,
                    status: 'pending'
                };
                return newCase;
            })
            .then(newCase => {
                firebase.firestore().collection("cases").add(newCase);
            })
            .then(doc => {
                this.btnenabled = false;
                this.btntext = 'Registered';
                this.$router.push('/opened-cases');
            })
            .catch(err => {
                console.log(err);
                this.$store.commit('setError', err);
            })
        }
    },
    created() {
        this.findAllOrganizations();
        }
    }

</script>