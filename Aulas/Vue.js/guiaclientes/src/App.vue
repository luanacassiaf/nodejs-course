<template>
  <div id="app">
    <p class="title is-3">Guia Clientes</p>
    <p class="subtitle is-5">Aula de Vue.js</p>

    <h3>Cadastro:</h3>
    
    <input type="text" placeholder="Nome" v-model="nomeField">
    <small class="errorMessage" v-show="erro"> O nome é inválido, tente novamente.</small>
    
    <br><input type="text" placeholder="E-mail" v-model="emailField">
    
    <br><input type="number" placeholder="Idade" v-model="idadeField">
    
    <br><button @click="cadastrarUsuario">Cadastrar</button>
    
    <div v-for="(cliente, index) in orderClientes" :key="cliente.id">
      <h4>{{index+1}}</h4>
      <Cliente :cliente="cliente" :mostraIdade="false" @meDelete="deletarUsuario($event)"/>
      <hr>
        <h4>Editar nome</h4>
        <input type="text" v-model="cliente.nome">
      <hr>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'
import Cliente from './components/Cliente'
export default {
  name: 'App',
  data(){
    return {
      erro: false,
      nomeField: "",
      emailField: "",
      idadeField: "",
      clientes: [
        {
          id: 1,
          nome: "Goku",
          email: "goku@capsulecorp.com",
          idade: 44
        },
        {
          id: 2,
          nome: "Bulma",
          email: "bulma@capsulecorp.com",
          idade: 47
        },
        {
          id: 3,
          nome: "Kururin",
          email: "kuririn@capsulecorp.com",
          idade: 44
        }
      ]
    }
  },
  components: {
    Cliente
  },
  methods: {
    cadastrarUsuario: function() {
      if(this.nomeField == "" || this.nomeField == " " || this.nomeField.length < 3) {
        console.log("Erro ao validar nome.")
        this.erro = true
      } else {
        this.clientes.push({nome: this.nomeField, email: this.emailField, idade: this.idadeField, id: Date.now()})
        this.nomeField = ""
        this.emailField = ""
        this.idadeField = ""
        this.erro = false
      }
    },
    deletarUsuario: function($event) {
      var id = $event.id_cliente
      var arr = this.clientes.filter(cliente => cliente.id != id)
      this.clientes = arr
      $event.component.disparaAlerta()
    }
  }, 
  computed: {
    orderClientes: function() {
      return _.orderBy(this.clientes, ['nome'], ['asc'])
    }
  }
}
</script>

<style>
  .errorMessage {
    color: red;
  }
</style>
