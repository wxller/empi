<template>
  <header class="horizontal header">
    <router-link to="/interaction" class="nav-item" href="#">交互服务统计</router-link>
    <router-link to="/empi" class="nav-item" href="#">EMPI统计</router-link>
    <router-link to="/share" class="nav-item" href="#">文档统计</router-link>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #eee;

  .nav-item {
    text-decoration: none;
    margin: 10px;
    font-size: 20px;
  }
}
</style>
