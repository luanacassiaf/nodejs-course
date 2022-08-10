<template>
    <p class="title is-4">Registro de usuário</p>
    <hr>
    <div class="columns is-centered">
        <div class="column is-half">
            <div v-if="error != undefined">
                <div class="notification is-danger is-light">
                    {{error}}
                </div>
            </div>
            <p>Nome</p>
            <input class="input is-link" type="text" placeholder="Nome do usuário" v-model="name">
            <p>E-mail</p>
            <input class="input is-link" type="text" placeholder="E-mail do usuário" v-model="email">
            <p>Senha</p>
            <input class="input is-link" type="password" placeholder="Senha do usuário" v-model="password">
            <hr>
            <button class="button is-link" @click="register">Cadastrar</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
    data() {
        return {
            name: '',
            password: '',
            email: '',
            error: undefined
        }
    },
    methods: {
        register() {
            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
            axios.post("http://localhost:8000/user", {
                name: this.name,
                password: this.password,
                email: this.email
            }, req).then(res => {
                console.log(res)
                router.push("/")
            }).catch(err => {
                this.error = err.response.data
            })
        }
    }
}
</script>

<style scoped>
    p {
        margin-top: 1%;
    }
</style>