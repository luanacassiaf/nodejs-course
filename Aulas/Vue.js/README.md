# Notas

### Data binding
Data bindind é uma técnica geral que une duas fontes de dados/informações e as mantém em sincronia em um processo que estabelece uma conexão entre UI da aplicação e a lógica de negócio.

#### Exemplos de uso em Vue.js

* One Way Data Binding - permite apenas a exibição da informação
```
<input type="text" :value="nome">
<h3>Boas-vindas, {{nome}}!</h3>
```
* Two Way Data Binding - permite a edição da informação
```
<input type="text" v-model="nome">
```
