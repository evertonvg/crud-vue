<template>
  <main>
    <h1>Insira seu email</h1>
    <form action="">
      <div class="forminput">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          autocomplete="off"
          placeholder="Email"
        />
      </div>

      <div class="forminput">
        <input
          type="submit"
          :value="buttonlogin"
          :disabled="!regex.test(email) || buttonlogin == 'Recuperando'"
          @click="login"
        />
        <span class="tooltiptext"
          >Insira um email válido para habilitar o botão</span
        >
      </div>
    </form>
    <div class="cadsenha">
      <router-link to="/login" title="cadastro" class="default-button"
        >Voltar</router-link
      >
    </div>
  </main>
</template>
<script>
import axios from 'axios';

export default {
    name: 'Cadastrar',
    metaInfo: {
        htmlAttrs: {
        lang: 'pt-BR',
        },
        title: 'CRUD - Login',
        meta: [{ name: 'descrition', content: 'Tela de Cadastro.' }],
    },
     data(){
        return{
          regex:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          nome:'',
          email: '',
          senha: '',
          senharepeat: '',
          message: '',
          buttonlogin: 'Recuperar senha'
        }
    },
    methods:{
      login(el){
        el.preventDefault()
        this.buttonlogin = 'Entrando...'
        this.$store.state.message = 'Entrando...'
        axios.post('http://crud.test/api/login',
        {
          email:this.email,
          password:this.senha
        },
        {
          headers:{
            "key": "Content-Type",
            "type": "text",
            "value": "application/json",
          }
        }
        )
        .then((resp)=>{
          if(resp.data=='Usuário ou senha inválidos'){
            this.buttonlogin = 'Login'
            this.email = ''
            this.senha = ''
            this.$store.state.message = 'Usuário ou senha inválidos'
            setInterval(()=>{
              this.$store.state.message = ''
            },5000)
          }else{
            localStorage.setItem('login','true')
            localStorage.setItem('name',resp.data.name)
            this.$router.push('/home')
          }
        })
          
        .catch(err => {
          console.log(err)
          
        })
      }
    },
    created(){
        if(localStorage.getItem('login')=='true'){
            this.$router.push('/home')
        }
    }
}
</script>
<style lang="stylus" scoped>
  main
    width 100%
    height 100vh
    display flex
    align-items center
    justify-content center
    flex-direction column

    img 
      width 300px
    form
      width 550px
      max-width 90%
      border 2px solid black
      padding 20px 
      border-radius 4px

      .forminput
        position relative

      label 
        width 100%

      input 
        width 100%
        margin-top 5px
        margin-bottom 20px
        height 50px
        padding-left 10px
        border 2px solid black
      
      input[type=submit]
        margin 0
        background-color black
        color:white
        border none
        padding-left 0
        cursor pointer
        transition 0.3s ease all
        position: relative;
        display: inline-block;
        
        &:hover
          background-color gray
          


        &:disabled   
          background-color #d3d3d3
          color gray
          &:hover 
            + .tooltiptext
              visibility visible

    .cadsenha
      width 550px
      max-width 90%
      margin-top 30px
      display flex
      align-items center
      justify-content space-between
</style>