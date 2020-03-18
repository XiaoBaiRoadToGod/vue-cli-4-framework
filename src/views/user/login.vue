<template>
  <div>
    登录
    <div>
      <div class="text-content" >token: {{ token }}</div>
      <button @click="clickLogin" >登录</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters( {
      token: 'user/token'
    } )
  },
  mounted () {
    this.getUserInfo( { name: '111' } ).then( res => {
      console.log( '---login---' )
      console.log( res )
    } ).catch( ( err ) => {
      console.log( '---login----err' )
      console.log( err )
    } )
  },
  methods: {
    ...mapActions( {
      login: 'user/login',
      getUserInfo: 'user/getUserInfo'
    } ),
    clickLogin () {
      this.login( 123 ).then( res => {
        console.log( res )
        if ( res.token ) {
          alert( '已登录' )
        }
      } )
    }
  }
}
</script>

<style lang="scss" scoped>
.text-content {
  color: $default-color;
  @include center();
}
</style>
