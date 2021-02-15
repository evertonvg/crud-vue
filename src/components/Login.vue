<template>
  <main>
    <img :src="json.src.mainPic" :alt="json.src.alternate" />
    <form action="">
      <div class="forminput">
        <label for="email">{{ json.pages.login.form.email.label }}</label>
        <input
          type="email"
          id="email"
          v-model="email"
          :placeholder="json.pages.login.form.email.placeholder"
        />
      </div>
      <div class="forminput">
        <label for="Senha">{{ json.pages.login.form.password.label }}</label>
        <input
          type="password"
          id="senha"
          v-model="senha"
          :placeholder="json.pages.login.form.password.placeholder"
        />
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
        <span class="tooltiptext">
          {{ json.pages.login.form.tooltip }}
        </span>
      </div>
    </form>
    <div class="cadsenha">
      <router-link to="/novo-usuario" title="cadastro" class="default-button">{{
        json.pages.login.buttons.newUser
      }}</router-link>
      <router-link
        to="/recuperar-senha"
        title="cadastro"
        class="default-button"
        >{{ json.pages.login.buttons.forget }}</router-link
      >
    </div>
  </main>
</template>
<script>
import axios from 'axios';
import infos from './../../infos.json';
export default {
    name: infos.pages.login.nameComponent,
    metaInfo: {
        htmlAttrs: {
        lang: infos.meta.lang,
        },
        title: infos.pages.login.title,
        meta: infos.pages.login.meta,
    },
     data(){
        return{
          regex:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          email: '',
          senha: '',
          buttonlogin: infos.defaultMessages.login,
          json: infos,
        }
    },
    methods:{
      resetmethod(message){
        this.buttonlogin = infos.defaultMessages.login
        this.email = ''
        this.senha = ''
        this.$store.state.message = message
        setInterval(()=>{
          this.$store.state.message = ''
        },5000)
      },
      login(el){
        el.preventDefault()
        this.buttonlogin = this.json.defaultMessages.logon
        this.$store.state.message = this.json.defaultMessages.logon
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
            localStorage.setItem('login','true')
            localStorage.setItem('name',resp.data.name)
            localStorage.setItem('token',resp.data.access_token)
            this.$router.push('/home')
        })
          
        .catch(() => {
          this.resetmethod(this.json.defaultMessages.loginFail)          
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