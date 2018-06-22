<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'qrcode-generate'
  }
</script>

<style>
/* CSS */
body,
html {
  padding: 0;
  margin: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #6f6f6f;
}
*::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
