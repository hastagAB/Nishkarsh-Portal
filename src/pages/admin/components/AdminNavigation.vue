<template>
    <div class="col-md-3">
        <div class="card shadow rounded-0">
            <div class="admin-info text-center border-bottom">
                <img src="../../../assets/images/avatar.png" class="img-fluid p-4 rounded-circle mx-auto d-block" alt="" style="max-width:200px;">
                <h3 class="mb-4">Admin Name</h3>
            </div>
            <nav class="nav nav-pills flex-column">
                <router-link class="nav-link" to="/admin">Dashboard</router-link>
                <router-link class="nav-link" to="/admin/cases">All Cases</router-link>
                <router-link class="nav-link" to="/admin/users">All Users</router-link>
                <router-link class="nav-link" to="/admin/organizations">All Organizations</router-link>
                <router-link class="nav-link" to="/admin/sign-in">Signin</router-link>
            </nav>
        </div>
    </div>
</template>



<script>
export default {
    
}
</script>


<style scoped>
    .nav-link{
        border-radius:0!important;
        border-bottom: 1px solid #6c757d;
    }
    .nav-link:last-child {
        border-bottom: 0;
    }
</style>