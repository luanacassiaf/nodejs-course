<template>
    <p class="title is-4">Edição de usuário</p>
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
            <hr>
            <button class="button is-link" @click="update">Editar</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import router from "../router";
export default {
    created() {
        var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }

        axios.get("http://localhost:8000/user/" + this.$route.params.id, req).then(res => {
            this.name = res.data.name
            this.email = res.data.email
            this.id = res.data.id
        }).catch(err => {
            console.log(err.response)
            router.push("/admin/users")
        })
    },
    data() {
        return {
            id: -1,
            name: '',
            email: '',
            error: undefined
        }
    },
    methods: {
        update() {
            var req = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
            axios.put("http://localhost:8000/user/" + this.id, {
                name: this.name,
                email: this.email
            }, req).then(res => {
                console.log(res)
                router.push("/admin/users")
            }).catch(err => {
                this.error = err.response.data
            })
        },
    }
}
</script>

<style scoped>
    p {
        margin-top: 1%;
    }
</style>