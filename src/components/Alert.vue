<template>
    <div class="alert alert-danger fade show mt-4 mx-auto" role="alert" style="max-width:500px;">
        {{error}}
    </div>
</template>

<script>
export default {
    props: ['error']
}
</script>