<template>
<el-container>
  <el-header>主页: {{token}}<el-button @click="exit">退出</el-button></el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <sidebarItem v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path"></sidebarItem>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import { mapGetters} from 'vuex'
import sidebarItem from '../components/sidebarItem'
export default {
  components: {
    sidebarItem
  },
  methods: {
    async exit () {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'token'])
  }
}
</script>

<style>
.el-container{
  height: 100%;
}
</style>
