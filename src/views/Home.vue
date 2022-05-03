<template>
  <div>
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <v-radio-group v-model="pos" @change="change" row>
      <v-radio label="Origin points" value="origin"></v-radio>
      <v-radio label="Result points" value="result"></v-radio>
    </v-radio-group> -->
    <div class="btn_box">
      <v-row>
        <v-col>
          <v-btn color="error" elevation="10" rounded @click="reset"
            >Reset</v-btn
          >
        </v-col>
        <v-col>
          <v-btn color="primary" elevation="10" rounded @click="showOrigin"
            >Origin</v-btn
          >
        </v-col>
        <v-col>
          <v-btn color="success" elevation="10" rounded @click="showExpected"
            >Expected</v-btn
          >
        </v-col>
        <v-col>
          <v-btn color="blue-grey" elevation="10" rounded @click="showResult"
            >Result</v-btn
          >
        </v-col>
      </v-row>
    </div>
    <!-- <v-btn depressed small color="primary" @click="print">Print</v-btn> -->
    <div style="width: 100%; height: 500px">
      <amap ref="myMap" :zoom="11" :center="center">
        <!-- icons:https://www.jianshu.com/p/6be42c2cd81a -->
        <!-- <div v-if="vis">
          <amap-circle-marker
            ref="myMarker"
            v-for="(pos, i) in points"
            :key="i"
            :center="pos"
            :radius="5"
            :strokeOpacity="1"
            :fillColor="'#000000'"
            :fillOpacity="1"
          />
        </div> -->
        <!-- <amap-marker
          ref="myMarker"
          v-for="(pos, i) in points"
          :key="i"
          :position="pos"
          :label="{
            content: i + 'pos',
            direction: 'bottom',
          }"
          :offset="[-24.5,-165]"
          :icon="'//webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png'"          
        /> -->
        <!-- <amap-marker
          ref="myMarker"
          :position="center"
          :label="{
            content:'pos',
            direction: 'bottom',
          }"
        /> -->
        <amap-marker
          ref="myMarker"
          v-for="(pos, i) in points"
          :key="i"
          :position="pos"
          :label="{
            content: i + ' pos',
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
    // var icon = new AMap.Icon({
    //   size: new AMap.Size(40, 50), // 图标尺寸
    //   image: "//webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png", // Icon的图像
    //   imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
    //   imageSize: new AMap.Size(40, 50), // 根据所设置的大小拉伸或压缩图片
    // });
    return {
      msg: "Hello, AmapVue!",
      center: [116.407387, 39.904179],
      points: [[116.407387, 39.904179]],
      date: "",
      time_id: "",
      user_id: "",
      origin: [],
      expected: [],
      result: [],
      vis: false,
    };
  },
  methods: {
    getTrajectory() {
      // this.$axios.get()
      this.$axios
        .get("/result.json")
        .then((res) => {
          console.log("data:", res.data);
          // 第11条数据较多
          this.date = res.data.date[15];
          this.time_id = res.data.time[15];
          this.user_id = res.data.user[15];
          this.origin = res.data.origin[15];
          this.expected = res.data.expected[15];
          this.result = res.data.result[15];
          console.log("date:", this.date);
          console.log("time_id:", this.time_id);
          console.log("user_id:", this.user_id);
          console.log("origin:", this.origin);
          console.log("expected:", this.expected);
          console.log("result:", this.result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reset() {
      this.points = [[116.407387, 39.904179]];
    },
    showOrigin() {
      this.points = this.origin.filter((data) => {
        return data != "";
      });
      console.log("Origin:", this.points);
    },
    showExpected() {
      this.points = this.expected.filter((data) => {
        return data != "";
      });
      console.log("Expected:", this.points);
    },
    showResult() {
      this.points = this.result.filter((data) => {
        return data != "";
      });
      console.log("Result:", this.points);
    },
    print() {
      console.log("refs:", this.$refs);
      // console.log("地图 AMapVue 对象:", this.$refs.myMap);
      console.log("点标记 AMapVue 对象:", this.$refs.myMarker);
      // console.log("AMap.Map 原生对象:", this.$refs.myMap.$map);
      console.log("AMap.Marker 原生对象:", this.$refs.myMarker.$target);
      // console.log("size:",this.$refs.myMarker[0].$target.getImageSize());
      // console.log("AMap.Marker 0个原生对象:", this.$refs.myMarker[0]);
      // console.log("AMap.Marker 原生对象:", this.$refs.myMarker[0].$target);
    },
    getOrigin() {
      // 原始轨迹点
      this.$axios({
        method: "get",
        url: "origin",
      })
        .then((res) => {
          // console.log(res.data);
          this.origin = res.data;
          // 过滤非空的
          this.origin = this.origin.filter((data) => {
            return data != "";
          });
          if (this.points == null) {
            this.points = this.origin;
          }
          console.log("origin:", this.origin);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getResult() {
      // 结果轨迹点
      this.$axios({
        method: "get",
        url: "result",
      })
        .then((res) => {
          // console.log(res.data);
          this.result = res.data;
          // 过滤非空的
          this.result = this.result.filter((data) => {
            return data != "";
          });
          console.log("result:", this.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    // this.getOrigin();
    // this.getResult();
    this.getTrajectory();
  },
  mounted() {
    this.$nextTick(() => {});
  },
};
</script>

<style lang="sass" scoped>
.btn_box
  margin: 10px
</style>
