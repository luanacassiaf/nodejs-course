<template>
    <input type="text" name="email" id="email" placeholder="E-mail">
    <br><input type="text" name="nome" id="nome" placeholder="Nome">
    <br><button>Cadastrar</button>
    <h4>{{paramRoute}}</h4>
</template>

<script>
export default {
    created() {
        this.paramRoute = this.$route.params.dados
    },
    data() {
        return {
            paramRoute: "---"
        }
    }
}
</script>