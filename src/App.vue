<template>
  <div id="app">
    <!-- <Mapview></Mapview> -->
    <div id="nav">
      <el-menu
        :default-active="$route.path"
        :router="true"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#708090"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/map">Map</el-menu-item>
        <el-menu-item index="/charts">Model Analysis</el-menu-item>
      </el-menu>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // activeIndex: "/",
    };
  },
};
</script>

<style  scoped>
#app {
  /* height: 80%; */
  height: 100%;
  width: 100%;
  padding: 0px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  /* margin: 10px; */
}
/* #app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
} */

#nav {
  padding: 0px 0px 0px 0px;
  /* align-content: center; */
  text-align: center;
  font-size: 26px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.el-menu.el-menu--horizontal{
  border:0px;
}
</style>
