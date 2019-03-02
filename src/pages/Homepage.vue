<template>
    <main role="main" >

        <Slider></Slider>

        <CardsSection></CardsSection>

        <div class="d-md-flex w-100">
            <div class="bg-dark flex-fill pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div class="my-3 py-3">
                    <h2 class="display-5 text-white">Another headline</h2>
                    <p class="lead text-white">And an even wittier subheading.</p>
                </div>
                <div class="bg-light shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
            </div>
            <div class="bg-light flex-fill pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div class="my-3 p-3">
                    <h2 class="display-5">Another headline</h2>
                    <p class="lead">And an even wittier subheading.</p>
                </div>
                <div class="bg-dark shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
            </div>
        </div>

        <section id="hero">
            <div class="container text-center">
                <h1>About</h1>
                <p class="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quibusdam itaque omnis reiciendis, placeat fugiat! Corporis, debitis, minus vero dolores illo, delectus ex facere sit provident optio aperiam. Consectetur quae corporis labore voluptas. Dolor mollitia a adipisci porro nesciunt reiciendis modi temporibus ea quaerat exercitationem placeat illo laudantium rem labore eligendi accusamus, iste odio assumenda itaque delectus asperiores nobis. Ea explicabo tempora non quisquam impedit assumenda placeat, doloribus repellat itaque iste magnam sed quibusdam delectus libero totam! Ad doloremque natus assumenda perferendis, recusandae dicta, itaque autem eligendi vero quisquam corporis illum magnam. Facere laudantium natus aut a ea, minus soluta.</p>
            </div>
        </section>

    
    </main><!-- /.container -->
</template>

<script>
import Slider from '@/components/homepage/Slider.vue'
import CardsSection from '@/components/homepage/CardsSection.vue'

export default {
    name: 'home',
        components: {
            Slider,
            CardsSection
    },
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

