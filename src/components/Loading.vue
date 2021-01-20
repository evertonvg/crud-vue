<template>
  <main>
    <img src="../assets/images/crudblog.png" alt="Logo" />
  </main>
</template>
<script>
export default {
    name: 'loading',
    metaInfo: {
        htmlAttrs: {
        lang: 'pt-BR',
        },
        title: 'CRUD',
        meta: [{ name: 'descrition', content: 'Tela de Loading.' }],
    },
     data(){
        return{

        }
    },
    mounted(){
        setTimeout(()=>{
            if(localStorage.getItem('login')=='true'){
                this.$router.push('/home')
            }else{
                localStorage.removeItem('login')
                localStorage.removeItem('token')
                this.$router.push('/login')
            }
        },1000)
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

        img 
            max-width 100%
</style>