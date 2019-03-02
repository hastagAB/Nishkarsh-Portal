<template>
    <main>
    <section id="404">
        <div class="container">
            <div class="col-md-6 offset-md-3">
                <h1 class="text-center">404 page not found</h1>
            </div>
        </div> 
    </section>
        
    </main>
</template>

<script>
export default {
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      }
    }
    }

</script>