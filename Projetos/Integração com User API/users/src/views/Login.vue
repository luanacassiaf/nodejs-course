<template>
    <p class="title is-4">Login</p>
    <hr>
    <div class="columns is-centered">
        <div class="column is-half">
            <div v-if="error != undefined">
                <div class="notification is-danger is-light">
                    {{error}}
                </div>
            </div>
            <p>E-mail</p>
            <input class="input is-link" type="text" placeholder="E-mail do usuário" v-model="email">
            <p>Senha</p>
            <input class="input is-link" type="password" placeholder="Senha do usuário" v-model="password">
            <hr>
            <button class="button is-link" @click="login">Entrar</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "../router"; 
export default {
    data() {
        return {
            password: '',
            email: '',
            error: undefined
        }
    },
    methods: {
        login() {
            axios.post("http://localhost:8000/login", {password: this.password,email: this.email}).then(res => {
                localStorage.setItem("token", res.data.token)
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