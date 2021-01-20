<template>
  <main>
    <transition name="slide" mode="out-in">
      <div class="alert alert-warning" v-show="message != ''">
        {{ message }}
      </div>
    </transition>

    <img src="../assets/images/crudblog.png" alt="Logo" />
    <form action="">
      <div class="forminput">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" placeholder="Email" />
      </div>
      <div class="forminput">
        <label for="Senha">Senha:</label>
        <input type="password" id="senha" v-model="senha" placeholder="Senha" />
      </div>
      <div class="forminput">
        <input
          type="submit"
          :value="buttonlogin"
          :disabled="
            !regex.test(email) || senha.length < 8 || buttonlogin == 'Entrando'
          "
          @click="login"
        />
        <span class="tooltiptext"
          >Insira um email válido e uma senha com no minímo 8 caracteres para
          habilitar o botão</span
        >
      </div>
    </form>
    <div class="cadsenha">
      <router-link to="/novo-usuario" title="cadastro" class="default-button"
        >Cadastrar</router-link
      >
      <router-link to="/recuperar-senha" title="cadastro" class="default-button"
        >Esqueci minha senha</router-link
      >
    </div>
  </main>
</template>
<script>
import axios from 'axios';

export default {
    name: 'login',
    metaInfo: {
        htmlAttrs: {
        lang: 'pt-BR',
        },
        title: 'CRUD - Login',
        meta: [{ name: 'descrition', content: 'Tela de Login.' }],
    },
     data(){
        return{
          regex:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          email: '',
          senha: '',
          message: '',
          buttonlogin: 'Login'
        }
    },
    methods:{
      resetmethod(message){
        this.buttonlogin = 'Login'
        this.email = ''
        this.senha = ''
        this.message = message
        setInterval(()=>{
          this.message = ''
        },5000)
      },
      login(el){
        el.preventDefault()
        this.buttonlogin = 'Entrando...'
        this.message = 'Entrando...'
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
          // if(resp.data=='Usuário ou senha inválidos'){
          //   this.resetmethod('Usuário ou senha inválidos')
          // }else{
          //   if(resp.data.email_verified_at==null){
          //     this.resetmethod('Por favor válide seu email')
          //   }else{
              localStorage.setItem('login','true')
              localStorage.setItem('name',resp.data.name)
              localStorage.setItem('token',resp.data.access_token)
              this.$router.push('/home')
          //   }
            
          // }

        })
          
        .catch(() => {
          this.resetmethod('Usuário ou senha inválidos!')          
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