<template>
<div class="layer">
  <div class="login-form">
    <div class="login-header">Login form</div>
    Email address
    <div class="email">
      <input :disabled="logining" type="text" class="email-input" v-model="email" placeholder=".e.g xxxx@xxxx.co.jp">
    </div>
    Password
    <div class="password">
      <input :disabled="logining" type="password" v-model="password">
    </div>
    <div class="login-btns">
      <button :disabled="logining || !email || !password" @click="login">Login</button>
    </div>
  </div>
</div>  
</template>

<script lang="ts">
import Vue from 'vue'
import eventHub from '../ts/eventHub';
export default Vue.extend({
  data(){
    return {
      logining:false,
      email:'',
      password:''
    }
  },
  created(){
    eventHub.$on('loginFailed', this.loginFailed)
  },
  methods:{
    login(){
      this.logining = true
      this.$store.dispatch('signIn', {email:this.email, password:this.password})
    },
    loginFailed(){
      this.logining = false
    }
  }
})
</script>

<style lang="stylus">
.login-form
  width 500px
  text-align center
  margin auto
  padding 15px
  background-color white
  box-shadow 0px 5px 2px rgb(100,100,100)
  input
    width 80%
</style>

