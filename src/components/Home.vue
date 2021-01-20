<template>
  <div>
    <transition name="slide" mode="out-in">
      <div class="alert alert-warning" v-show="message != ''">
        {{ message }}
      </div>
    </transition>
    <h1>Home</h1>
    <button @click="logout">logout</button>
  </div>
</template>
<script>
import axios from 'axios';
export default {
    name:'home',
     metaInfo: {
        htmlAttrs: {
        lang: 'pt-BR',
        },
        title: 'CRUD - Home',
        meta: [{ name: 'descrition', content: 'Tela de Home.' }],
    },
     data(){
        return{
          message: '',
        }
    },
    methods:{
        logout(){
            localStorage.removeItem('login')
            axios.get('http://crud.test/api/logout')
            .then(()=>{
            })
            .catch(()=>{
            })
            this.$router.push('/login')
        }
    },
    created(){
        if(localStorage.getItem('name')!=null){
            this.message = `Bem vindo ${localStorage.getItem('name')}`
            localStorage.removeItem('name')
            setTimeout(()=>{
                this.message = ''
            },5000)
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>