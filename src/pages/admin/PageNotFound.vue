<template>
    <main role="main" class="bg-light">
        <div class="container-fluid py-4">
            <div class="row">
                <AdminNavigation></AdminNavigation>

                <div class="col-md-9">
                    <div class="card p-3 shadow rounded-0">
                        <h4>404 Page not found</h4>
                    </div>
                </div>

            </div>
        </div>
    </main><!-- /.container -->
</template>

<script>
import AdminNavigation from '@/pages/admin/components/AdminNavigation.vue'
export default {
    components: {
        AdminNavigation
    }
}
</script>


