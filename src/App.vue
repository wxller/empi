<template>
  <div class="app-container">
    <Header />
    <div class="ui container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 10px;
  /deep/ .title {
    margin-top: 10px;
    font-size: 1.3rem;
    font-weight: 700;
  }
}
</style>
