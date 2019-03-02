<template>
    <main role="main" class="bg-light">
        <div class="container-fluid py-4">
            <div class="row">
                <AdminNavigation></AdminNavigation>

                <div class="col-md-9">
                    <div class="card p-3 shadow rounded-0">

                        <h1 class="h3 mb-4 text-center" v-if="!loading">All Users</h1>
                        <table class="table table-bordered table-hover table-responsive-sm" v-if="!loading && users != ''">
                            <thead class="bg-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.email" >
                                <th>{{ user.name }}</th>
                                <td>{{ user.email }}</td>
                                <td>{{ user.contact }}</td>
                                <td>{{ user.address }}</td>
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
            users:[]
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
        fetchUsers(){
            this.loading = true;
            firebase.firestore().collection("users").where("type", "==", "user").get()
            .then(snapshot => {
                let users = [];
                snapshot.docs.forEach(doc => {
                    users.push({
                        name: doc.data().name,
                        email: doc.data().email,
                        contact: doc.data().contact,
                        address: doc.data().address
                    });
                });
                this.users = users;
                this.loading =  false;
            })
            .catch(err => {
                this.loading =  false;
                console.log(err);
            });
        }
    },
    created() {
        this.fetchUsers();
    }

}
</script>

