<template>
  <div class="column is-half is-offset-one-quarter">
    <img src="./assets/pokemon.png">

    <input class="input is-normal is-warning is-rounded" type="text" placeholder="Pokémon" v-model="search">
    <button id="searchBtn" class="button is-medium is-warning is-responsive" @click="searchPokemon">
      Search
    </button>
    
    <div v-for="(poke, index) in filteredPokemons" :key="poke.url">
      <Pokemon :name="upper(poke.name)" :url="poke.url" :num="index+1"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Pokemon from './components/Pokemon'
export default {
  name: 'App',
  data() {
    return {
      pokemons: [],
      search: '',
      filteredPokemons: []
    }
  },
  created: async function() {
    try {
      var res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      this.pokemons = res.data.results
      this.filteredPokemons = res.data.results
    } catch(err) {
      console.log(err)
    }
  },
  components: {
    Pokemon
  },
  methods: {
      upper: function(value) {
          var newName = value[0].toUpperCase() + value.slice(1)
          return newName
      },
      searchPokemon: function() {
        this.filteredPokemons = this.pokemons
        if(this.search == '' || this.search == ' ') {
          this.filteredPokemons = this.pokemons
        } else {
          this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name == this.search)
        }
      }
  },
  computed: {
    // Faz a busca sem utilizar o botão, mais custoso
    // resultSearch: function() {
    //   if(this.search == '' || this.search == ' ') {
    //     return this.pokemons
    //   } else {
    //     return this.pokemons.filter(pokemon => pokemon.name == this.search)
    //   }
    // }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#searchBtn {
  margin-top: 2%;
}
</style>
