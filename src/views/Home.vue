<template>
  <div class="home">
    <div class="container">
      <h1><img src="../assets/guiji.png" />用户轨迹重建</h1>
      <div class="content">
        本项目课题为<b>用户轨迹重建</b>，主要任务为基于隐私保护的轨迹复原。<br />
        使用 <b>Transformer+ctle</b> 的模型复原已有用户部分轨迹数据，并将结果轨迹匹配路网，展示于本网站。<br />
        项目的进一步任务为出行时间预测、轨迹目的地预测等相关工作，欢迎持续关注。
        <!-- {{ description }} -->
      </div>
      <el-button type="primary" @click="gomap" round
        >点击进入 <i class="el-icon-arrow-right el-icon--right"></i
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description:
        "本项目课题为用户轨迹重建，主要任务为基于隐私保护的轨迹复原。使用（）模型复原已有用户部分轨迹数据，并将结果轨迹匹配路网，展示于本网站。项目的进一步任务为出行时间预测、轨迹目的地预测等相关工作，欢迎持续关注。",
    };
  },
  methods: {
    gomap() {
      // console.log('map');
      this.$router.push("/map");
    },
  },
};
</script>

<style scoped>
.home {
  background: url("../assets/bg.gif") no-repeat;
  background-size: 100% 100%;
  height: 89.5vh;
}
.container {
  /* display: flex; */
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  font-family: "Courier New", Courier, monospace;
  color: white;
  padding: 10px 0px 0px 0px;
  /* margin: 0px 0px 0px 0px ; */
}
.container h1 {
  text-align: center;
  font-size: 50px;
  color: #f5f5f5;
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid #dcdcdc;
}
.container img {
  width: 40px;
  margin: 0px 10px 0px 0px;
}
.content {
  margin: 0px 0px 40px 0px;
  width: 400px;
  /* color: #D3D3D3; */
  color: #dcdcdc;
}
.el-button {
  position: relative;
  left: 33%;
  /* color: #dcdcdc; */
}
</style>