<template>
  <div>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="username" placeholder="Username" />
        <input type="password" name="password" v-model="password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(6)
    }
  }
}
</script>
