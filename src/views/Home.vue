<template>
  <div>
    <h1>{{ msg }}</h1>
    <div style="width: 100%; height: 400px">
      <amap :zoom="10" :center="center">
        <amap-marker
          v-for="(pos, i) in res"
          :key="i"
          :position="pos"
          :label="{
            content: i + 'pos',
            direction: 'bottom',
          }"
        />
      </amap>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: "Hello, AmapVue!",
      center: [116.407387, 39.904179],
      results: [
        [116.473179, 39.993169],
        [116.234246, 40.044793],
      ],
      res: [],
    };
  },
  methods: {
    getpoints() {},
    gethello() {
      // 测试后端接口
      // this.$axios({
      //   method: "get",
      //   url: "origin",
      // })
      //   .then((res) => {
      //     console.log(res);
      //     console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      this.$axios({
        method: "get",
        url: "result",
      })
        .then((res) => {
          // console.log(res.data);
          this.res = res.data[0];
          // 过滤非空的
          this.res = this.res.filter((data) => {
            return data != "";
          });
          console.log(this.res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.gethello();
  },
};
</script>

<style lang="sass" scoped>
</style>
