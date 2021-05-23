<template>
  <div class="home">
    账户：<el-input style="width:200px" v-model="login.username"></el-input> <br>
    密码：<el-input style="width:200px" v-model="login.password"></el-input> <br><br>
    <el-button @click="ok">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      login: {
        username: '',
        password: '123'
      }
    }
  },
  methods: {
    ok () {
      this.$store.dispatch('user/login', this.login).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
