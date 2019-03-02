<template>
    <main role="main" class="bg-light">
        <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-3 card shadow my-md-4 py-3">
                    <h1 class="text-center h3">Register</h1>
                    <form @submit.prevent="registerOrganization" v-if="!loading">
                        <div class="form-group">
                            <label for="OrganizationName">Organization Name</label>
                            <input v-model="name" type="text" class="form-control" id="OrganizationName" placeholder="Enter name">
                        </div>
                        <div class="form-group">
                            <label for="OrganizationLogo">Organization Logo</label>
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="customFile" @change="onFilePicked" accept="image/*">
                                <label class="custom-file-label" for="customFile">Choose file</label>
                            </div>
                        </div>
                        <div v-if="imageUrl" class="form-group">
                            <img :src="imageUrl" height="200px">
                        </div>
                        <div class="form-group">
                            <label for="OrganizationEmail">Organization Email address</label>
                            <input v-model="email" type="email" class="form-control" id="OrganizationEmail" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label for="OrganizationPassword">Organization Password</label>
                            <input v-model="password" type="password" class="form-control" id="OrganizationPassword" placeholder="Enter password">
                        </div>
                        <div class="form-group">
                            <label for="OrganizationPhone">Organization Contact Number</label>
                            <input v-model="contact" type="text" class="form-control" id="OrganizationPhone" placeholder="Enter contact number">
                        </div>
                        <div class="form-group">
                            <label for="OrganizationAddress">Organization address</label>
                            <input v-model="address" type="text" class="form-control" id="OrganizationAddress" placeholder="Enter address">
                        </div>
                        <button type="submit" class="btn btn-block btn-primary">
                            Register
                        </button>
                    </form>
                    <p class="mt-2" v-if="!loading">Already have an account? <router-link to="/sign-in" >Sign In</router-link></p>

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
    data (){
        return {
            loading: false,
            name: '',
            email: '',
            password: '',
            contact: '',
            address: '',
            imageUrl: '',
            image: ''

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
        registerOrganization(){
                
                this.loading = true;
                this.$store.commit('clearError');

                let orgObj = {
                    type:'organization',
                    userUid: '',
                    name: this.name,
                    email: this.email,
                    contact: this.contact,
                    address: this.address,
                    logoUrl: ''
                };

                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    orgObj.userUid = user.user.uid;
                    return firebase.storage().ref('organizations/' + this.image.name).put(this.image)
                })
                .then(()=>{
                    return firebase.storage().ref('organizations/' + this.image.name).getDownloadURL();
                })
                .then(url =>{
                    orgObj.logoUrl = url;
                    return firebase.firestore().collection("users").add(orgObj);
                })
                .then(data => {
                    let newUser ={
                        type:orgObj.type,
                        id: data.id,
                        userUid: orgObj.userUid,
                        name: this.name,
                        email: this.email
                    };
                    this.$store.commit('setUser', newUser);
                    this.loading = false;
                    this.$router.push('/sign-in');
                })
                .catch(error => {
                    this.loading = false;
                    this.$store.commit('setError', error);
                    console.log(error);
                })
            },
            onFilePicked (event) {
                const files = event.target.files;
                let filename = files[0].name;
                if (filename.lastIndexOf('.') <= 0) {
                return alert('Please add a valid file!');
                }
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result;
                })
                fileReader.readAsDataURL(files[0]);
                this.image = files[0];
            }
        }
    }

</script>