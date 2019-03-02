<template>
    <div class="col-md-6 my-4">
        <div class="card" v-if="!loading">
            <div class="card-header text-center h5">Attach files</div>
            <div class="card-body bg-light overflow-auto" style="height:300px;">
                <div class="alert alert-light border" v-for="file in files" :key="file.date">
                    <p><a :href="file.url" target="_blank">{{ file.name }}</a></p>
                    <p class="text-right mb-0 font-weight-bold">{{ file.date }}</p>
                </div>
                <p v-if="files == ''" class="text-center mt-5">No file uploaded yet</p>
            </div>
            <div class="card-footer p-0">
                <div class="input-group">
                    <div class="custom-file">
                        <input type="file" @change="onFilePicked" class="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04">
                        <label class="custom-file-label rounded-0" for="inputGroupFile04">Choose file</label>
                        </div>
                    <div class="input-group-append">
                        <button @click.prevent="addFiles" class="btn btn-primary rounded-0" type="button" id="button-addon2">Upload</button>
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
            files: '',
            file:''
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
        
        fetchFiles(){
            this.loading = true;
            const files = [];
            firebase.firestore().collection("userFiles").where("case_id", "==", this.caseId).where("user_id", "==", this.user.id).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    files.push({
                        id: doc.id,
                        name:doc.data().name,
                        url: doc.data().url,
                        time: doc.data().time
                    })
                });
                this.files = files;
                this.loading =  false;
            })
            .catch(err => {
                this.loading =  false;
                console.log(err);
            });
        },
        addFiles(){
            this.loading = true;
            this.$Progress.start();

            firebase.storage().ref('caseFiles/' + this.file.name).put(this.file)
                .then(fileData => {
                    console.log(fileData);
                    return firebase.storage().ref('caseFiles/' + this.file.name).getDownloadURL();
                })
                .then(url =>{
                    console.log(url);
                    let fileObj = {
                        name:this.file.name,
                        case_id: this.caseId,
                        user_id: this.user.id,
                        url: url,
                        time: moment().format("ddd, MMMM-D-YYYY, h:mm A")
                    };
                    return firebase.firestore().collection("userFiles").add(fileObj);
                })
                .then(data =>{
                    this.loading = false;
                    this.$Progress.finish();
                    this.fetchFiles();
                    console.log(data);
                })
                .catch(error => {
                        this.loading = false;
                        this.$Progress.fail();
                        this.$store.commit('setError', error);
                        console.log(error);
                    }
                );
        },
        onFilePicked (event) {
            const files = event.target.files;
            this.file = files[0];
        }
    },
    created() {
        this.fetchFiles();
    }
}

</script>