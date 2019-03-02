<template>
    <div class="col-md-6 my-4">
        <div class="card" v-if="!loading">
            <div class="card-header text-center h5">Add your remarks</div>
            <div class="card-body bg-light overflow-auto" style="height:300px;">
                <div class="alert alert-light border" v-for="remark in remarks" :key="remark.date">
                    <p>{{ remark.text }}</p> 
                    <p class="text-right mb-0 font-weight-bold">{{ remark.time }}</p>
                </div>
                <p v-if="remarks == ''" class="text-center mt-5">Nothing to show</p>
            </div>
            <div class="card-footer p-0">
                <div class="input-group">
                    <input v-model="remarkText" type="text" class="form-control rounded-0" placeholder="Add any text remarks" >
                    <div class="input-group-append">
                        <button @click.prevent="addRemarks" class="btn btn-primary rounded-0" type="button" id="button-addon2">Send</button>
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
</template>

<script>
import firebase from 'firebase';
import store from '@/store';
import moment from 'moment';

export default {
    props:['caseId'],
    data() {
        return {
            loading: false,
            remarks: '',
            remarkText:''
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
        
        fetchRemarks(caseId, userId){
            this.loading = true;
            const remarks = [];
            firebase.firestore().collection("userRemarks").where("case_id", "==", this.$route.params.id).where("user_id", "==", this.user.id).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    remarks.push({
                        id: doc.id,
                        text: doc.data().text,
                        time: doc.data().time
                    })
                });
                this.remarks = remarks;
                this.loading =  false;
            })
            .catch(err => {
                this.loading =  false;
                console.log(err);
            });
        },
        addRemarks(){
            this.loading = true;
            let remarkObj = {
                case_id: this.$route.params.id,
                user_id: this.user.id,
                text: this.remarkText,
                time: moment().format("ddd, MMMM-D-YYYY, h:mm A")
            }

            firebase.firestore().collection("userRemarks").add(remarkObj)
            .then(data => {
                this.remarkText = '',
                this.fetchRemarks();
                this.loading =  false;
            })
            .catch(err => {
                console.log(err);
                this.loading =  false;
            })
        }
    },
    created() {
        this.fetchRemarks();
    }
}

</script>
