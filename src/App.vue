<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="logout__wrap">
            <button class="buttons__item" @click = "logout" >Log out</button>
          </div>
          <div class="form__wrap">
            <div class="form">
              <h1>Login</h1>
              <input class="form__item" type="text" name="username" v-model="username" placeholder="Username" />
              <input class="form__item" type="password" name="password" v-model="password" placeholder="Password" />
              <div class="buttons">
                <button class="buttons__item" @click = "login">Google</button>
                <button class = "buttons__item" @click = "signUpEmail" >Sign up</button>
                <button class="buttons__item" @click = "signInEmail">Sign in</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import moment from 'moment'
import firebase from 'firebase'
// import firebaseui from 'firebaseui'
import {required, minLength} from 'vuelidate/lib/validators'

//Firebase db config
const config = {};

const app = firebase.initializeApp(config);
const db = app.database();
// const dbNameRef = db.ref('dbName');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
  } else {
    console.log('no user');
  }
});

export default {
  name: 'App',
  firebase:{
    games: gamesRef,
    dbgames: gamesRef,
  },
  data(){
    return{
      username:'',
      password:''
    }
  },
  validations: {
      username: {
        required,
      },
      password: {
        required,
        minLength:minLength(6)
      }
    },
  
  methods:{
    login:function(){
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().useDeviceLanguage();

      firebase.auth().signInWithRedirect(provider);
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;
        console.log(user);
      }).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.log(errorMessage);
      });
      this.username = '';
      this.password = '';
    },

    signUpEmail: function(){
      const email = this.username;
      const password = this.password;
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.username = '';
        this.password = '';
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ...
      });
    },

    signInEmail: function(){
      const email = this.username;
      const password = this.password;
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
      this.username = '';
      this.password = '';
      })
      .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ...
      });
    },

    logout: function(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        alert('You are log out');
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
    },

  }
}
</script>
