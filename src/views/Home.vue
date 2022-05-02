<template>
  <div>
    <h1>{{ msg }}</h1>
    <!-- <v-btn depressed small>Normal</v-btn> -->
    <v-btn depressed small color="primary">Primary</v-btn>
    <div style="width: 100%; height: 400px">
      <amap :zoom="10" :center="center">
        <!-- icon:https://www.jianshu.com/p/6be42c2cd81a -->
        <!-- <amap-circle-marker
          v-for="(pos, i) in res"
          :key="i"
          :center="pos"
          :radius="10"
        /> -->
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
    getOrigin(){
       this.$axios({
        method: "get",
        url: "origin",
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
    getResult(){
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
