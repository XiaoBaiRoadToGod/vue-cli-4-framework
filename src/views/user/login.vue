<template>
  <el-row>
      登录
      <el-row style="height: 500px;" >
        <el-row class="text-content" >token: {{ token }}</el-row>
        <el-button @click="clickLogin" type="primary" >登录</el-button>
      </el-row>
  </el-row>
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
