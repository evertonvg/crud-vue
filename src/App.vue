<template>
  <div>
    <nav class="menu"></nav>
    <!-- <transition name="slide" mode="out-in"> -->
    <div class="alert alert-warning" v-if="this.$store.state.message != ''">
      {{ this.$store.state.message }}
    </div>
    <!-- </transition> -->
    <transition name="slide" mode="out-in" id="app">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>


export default { 
  name: 'App',
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    font-family: 'Montserrat', sans-serif;
  }
  @keyframes slide-in{
    from {transform: translateY(-30px);opacity:0;}
    to {transform: translateY(0px);opacity:1;}
  }
  @keyframes slide-out{
    from {transform: translateY(0px);opacity:1;}
    to {transform: translateY(-30px);opacity:0;}
  }
  .slide-enter-active{
    animation: slide-in 0.3s ease;
  } 
  .slide-leave-active{
    animation: slide-out 0.3s ease;
  } 
  body{
    overflow-x: hidden;
  }
  html {
    scroll-behavior: smooth; 
  }
  .modal-enter-active{
    opacity: 0;
  } 
  .modal-leave-active{
    opacity: 1;
  }
  .alert{
    position: fixed;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    padding: .75rem 1.25rem;
    border-radius: .25rem;
    z-index: 1;
  }
  .alert-warning{
    color: white;
    background-color: #212121;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset;
    -webkit-text-fill-color: #212121 ;
  }
  .default-button{
    background-color: #212121;
    color: white;
    border: 1px solid #212121;
    transition: 0.3s ease all;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    padding: 8px 24px;
    cursor: pointer;
    text-decoration: none;
  }
  .default-button:hover{
    background-color: white;
    color: #212121;
    text-decoration: none;
  }
  .default-button.reverse{
    background-color: white;
    color: #212121;
  }
  .default-button.reverse:hover{
    background-color: #212121;
    color: white;
  }
  .default-button:disabled{
    background-color: gray;
    color: black;
    border: 1px solid gray;
    cursor:default;
  }
  .default-button:disabled:hover{
    background-color: gray;
    color: black;
    border: 1px solid gray;
  }
  .tooltiptext{
    visibility: hidden;
    background-color: gray;
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    bottom: -40px;
    left: 0;
    z-index: 1;
    font-size: 10px;
    transition: 0.3s ease all;
  }

  .menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: cadetblue;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
          
</style>
