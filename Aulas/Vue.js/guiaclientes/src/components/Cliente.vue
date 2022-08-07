<template>
    <div :class="{'cliente': !isPremium, 'cliente-premium': isPremium}">
        <h4>Nome: {{cliente.nome}}</h4>
        <p v-if="mostraIdade">Idade: {{cliente.idade}}</p>
        <p v-else>Idade ocultada</p>
        <p>Email: {{cliente.email}}</p>
        <button @click="mudarCor($event)">Mudar cor</button>
        <button @click="emitirEventoDelete">Deletar</button>
        <h4>Código: {{codigo}}</h4>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isPremium: false
        }
    },
    props: {
        cliente: Object,
        mostraIdade:  Boolean
    },
    methods: {
        mudarCor: function($event) {
            console.log($event)
            this.isPremium = !this.isPremium
        },
        emitirEventoDelete: function() {
            console.log("Emitiu")
            this.$emit("meDelete", {id_cliente: this.cliente.id, component: this})
        },
        disparaAlerta: function() {
            alert("Cliente deletado.")
        }
    },
    computed: {
        codigo: function() {
            return (this.cliente.email + this.cliente.nome + this.cliente.id).toUpperCase()
        }
    }
}
</script>

<style scoped>
    .cliente{
        background-color: whitesmoke;
        padding: 1%;
        margin-top: 2%;
    }
    .cliente-premium {
        background-color: darkgoldenrod;
        color: white;
        padding: 1%;
        margin-top: 2%;
    }
</style>