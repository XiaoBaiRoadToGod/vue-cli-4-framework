<template>
  <div>
    登录
    <div>
      <div>token: {{ token }}</div>
      <button @click="clickLogin" >登录</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters({
        token: 'user/token'
      })
    },
    mounted() {

    },
    methods: {
      ...mapActions({
        login: 'user/login'
      }),
      clickLogin() {
        this.login(123).then(res => {
          console.log(res)
          if(res.token) {
            alert('已登录')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>