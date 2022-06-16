<template>
  <div class="home_div">
    <div class="btn_box1">
      <span
        ><b>用户ID: {{ user_id }}</b></span
      >
      <span>|</span>
      <span><b>轨迹点的标定与绘制: </b></span>
      <el-button type="success" size="small" round @click="addMarkers('Origin')"
        >Origin</el-button
      >
      <el-button type="info" size="small" round @click="addMarkers('Expected')"
        >Expected</el-button
      >
      <el-button type="warning" size="small" round @click="addMarkers('Result')"
        >Result</el-button
      >
      <el-button type="danger" size="small" round @click="getDispatchDetail"
        >绘制</el-button
      >
      <el-button type="warning" size="small" round @click="clear"
        >清除</el-button
      >
    </div>
    <div class="btn_box2" v-if="animation">
      <!-- <h3>动画控制</h3> -->
      <span><b>动画控制: </b></span>
      <el-button type="primary" size="small" round @click="startAnimation()"
        >开始动画</el-button
      >
      <el-button type="primary" size="small" round @click="pauseAnimation()"
        >暂停动画</el-button
      >
      <el-button type="primary" size="small" round @click="resumeAnimation()"
        >继续动画</el-button
      >
      <el-button type="success" size="small" round @click="setcenter"
        >定位</el-button
      >
    </div>
    <div v-else></div>
    <div id="container"></div>
    <div id="panel"></div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  name: "Mapview",
  data() {
    return {
      map: null,
      driving: null,
      car: null,
      polyline: null,
      icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
      date: "",
      time_id: "",
      user_id: "0",
      origin: [], // 轨迹点
      expected: [], // 轨迹点
      result: [], // 轨迹点
      center: [116.407387, 39.904179],  // 北京
      // center: [112.851274, 35.497553], // 山西晋城
      points: [[116.407387, 39.904179]], //轨迹点-重复
      marker_points: [], //不重复的轨迹坐标点
      content: [],
      markList: [],
      path: [], // 路径
      start: null,
      line: [],
      animation: false,
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    setcenter() {
      var map = this.map;
      // console.log(this.car);
      console.log(this.car.getPosition());
      map.setCenter(this.car.getPosition(), true);
      // map.setZoomAndCenter(15, this.car.getPosition());
      // this.car.on("moving", function (e) {
      //   map.setCenter(e.target.getPosition(), true);
      // });
    },
    addinfo() {
      // 信息窗体的内容
      var date =
        this.date.slice(0, 4) +
        "年" +
        this.date.slice(4, 6) +
        "月" +
        this.date.slice(6, 8) +
        "日";
      var content = [
        "<div><div><b>用户ID: " + this.user_id + "</b>",
        "日期：" + date,
        "时间：</div></div>",
      ];

      // 创建 infoWindow 实例
      var infoWindow = new AMap.InfoWindow({
        content: content.join("<br>"), //传入 dom 对象，或者 html 字符串
      });
      var map = this.map;
      // 打开信息窗体
      infoWindow.open(map, map.getCenter());
    },
    // 经纬度驾车路线规划：https://lbs.amap.com/demo/jsapi-v2/example/driving-route/plan-route-according-to-lnglat
    // 路径规划：https://lbs.amap.com/api/webservice/guide/api/direction#driving
    // 信息窗体：https://blog.csdn.net/m0_37355951/article/details/77527686
    // 动画：https://blog.csdn.net/weixin_45559135/article/details/110001139?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.pc_relevant_default&utm_relevant_index=2
    // 一些参考：https://blog.csdn.net/qq_44861015/article/details/122726609?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-4.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-4.pc_relevant_default&utm_relevant_index=9
    // https://blog.csdn.net/annaihanyou65423/article/details/101672953
    // https://blog.csdn.net/weixin_41618917/article/details/117258242?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-4.pc_relevant_antiscanv2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-4.pc_relevant_antiscanv2&utm_relevant_index=5
    // vue高德多条轨迹导航+带途径节点标注+各路线颜色区别：https://blog.csdn.net/qq_29101609/article/details/103597842?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-2.pc_relevant_paycolumn_v3&utm_relevant_index=3
    // vue高德单条(可批量)路线规划+单条(可批量)路线带途径节点marker+单条(可批量)路线分段渲染各颜色：https://blog.csdn.net/qq_29101609/article/details/106237837?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0.pc_relevant_default&spm=1001.2101.3001.4242.1&utm_relevant_index=3

    addCar(pos) {
      // 根据pos添加小车
      this.car = new AMap.Marker({
        position: pos,
        // icon: "https://webapi.amap.com/images/car.png",
        icon: require("../assets/1.png"),
        offset: new AMap.Pixel(-12.5, -24),
        angle: 90, //图片旋转角度
      });
      this.map.add(this.car);
    },
    clear() {
      // 清除地图
      this.animation = false;
      var map = this.map;
      map.clearMap();
      // // 清除以前的行经路线
      // if (this.driving) {
      //   this.driving.clear();
      // }
    },
    startAnimation() {
      var map = this.map;
      // map.setZoom(18)
      console.log("path:", this.path);
      // var temp = this.path[0];
      this.line = this.path[0];
      for (let i = 1; i < this.path.length; i++) {
        // temp = temp.concat(this.path[i]);
        this.line = this.line.concat(this.path[i]);
      }
      //绘制经过的轨迹
      var passedPolyline = new AMap.Polyline({
        map: map,
        strokeColor: "#00FF00", //线颜色
        strokeOpacity: 0.9, //线透明度
        showDir: true,
        strokeWeight: 7, //线宽
        lineJoin: "round",
      });
      this.car.on("moving", (e) => {
        passedPolyline.setPath(e.passedPath);
        // map.setCenter(e.target.getPosition(), true);
      });

      console.log("line:", this.line);
      this.car.moveAlong(this.line, {
        // 每一段的时长
        // duration: 300, //可根据实际采集时间间隔设置
        speed: 1000,
        autoRotation: true,
        // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
      });
      this.pauseAnimation();
      this.resumeAnimation();
      this.pauseAnimation();
      this.resumeAnimation();
    },
    pauseAnimation() {
      //暂停动画
      this.car.pauseMove();
    },
    resumeAnimation() {
      // 继续动画
      this.car.resumeMove();
    },
    stopAnimation() {
      // 停止动画
      this.car.stopMove();
    },
    Color() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgba(" + r + "," + g + "," + b + ",0.8)";
    },
    getDispatchDetail() {
      const lineColor = "#0000FF";
      // 可以随机线的颜色
      this.driving = new AMap.Driving({
        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式,还有其他几种方式见Api文档
        policy: AMap.DrivingPolicy.LEAST_TIME,
      });
      // 目前使用原结果点进行测试
      // var data = this.expected.filter((data) => {
      //   return data != "";
      // });
      var data = this.points;
      // var data = this.result.filter((data) => {
      //   return data != "";
      // });
      // 设置起点
      this.start = data[0];
      this.addCar(this.start);
      var map = this.map;
      this.path = new Array(data.length - 1);
      // console.log("length:", this.path.length);
      for (let i = 0; i < data.length - 1; i++) {
        // 解决this.driving.search的回调函数异步问题
        this.drawMapLine(
          data[i][0],
          data[i][1],
          data[i + 1][0],
          data[i + 1][1],
          map,
          lineColor,
          i
        );
      }
      // map.setZoom(18);
      this.animation = true;
      map.setFitView();
      map.setZoomAndCenter(14, this.car.getPosition());
    },
    // start_x:起点的横坐标,start_y：起点的纵坐标,end_x:终点的横坐标,end_y:终点的纵坐标,map:实例化map(this.map),color:随机线的颜色
    // 绘制路径
    drawMapLine(start_x, start_y, end_x, end_y, map, color, i) {
      map.plugin("AMap.Driving", () => {
        var start_xy = new AMap.LngLat(start_x, start_y); //起点
        var end_xy = new AMap.LngLat(end_x, end_y); // 终点
        // 根据起终点经纬度规划驾车导航 路线
        this.driving.search(start_xy, end_xy, (status, result) => {
          // console.log(start_xy, end_xy);
          if (status === "complete") {
            if (result.routes && result.routes.length) {
              // 绘制路线规划的第一条路线，也可以按需求绘制其它几条路线
              var path = this.parseRouteToPath(result.routes[0]);
              // this.driving.search的回调函数存在异步问题，用数组方式解决
              this.path[i] = path;
              this.routeLine = new AMap.Polyline({
                map: map,
                path: path,
                showDir: true,
                isOutline: true,
                outlineColor: "#ffeeee",
                borderWeight: 2,
                strokeWeight: 6,
                strokeColor: color,
                lineJoin: "round",
              });
              // console.log("绘制驾车路线完成");
            }
          } else {
            console.log("获取驾车数据失败：" + result);
          }
        });
      });
    },
    // 计算各个拐点位置
    parseRouteToPath(route) {
      var path = [];
      for (var i = 0, l = route.steps.length; i < l; i++) {
        var step = route.steps[i];
        for (var j = 0, n = step.path.length; j < n; j++) {
          path.push(step.path[j]);
        }
      }
      return path;
    },
    removeMarkers() {
      // 去除现在的坐标点列表
      // console.log(this.markList);
      this.map.remove(this.markList);
      this.markList = [];
    },
    addMarkers(type) {
      console.log(type);
      let type_str = "";
      // 根据类型添加点
      if (type == "Origin") {
        this.removeMarkers();
        this.points = this.origin.filter((data) => {
          return data != "";
        });
        // console.log("origin:",this.points);
        type_str = "输入轨迹";
        this.icon = require("../assets/black.png");
      } else if (type == "Expected") {
        this.removeMarkers();
        this.points = this.expected.filter((data) => {
          return data != "";
        });
        type_str = "原始轨迹";
        // console.log("Expected:",this.points);
        this.icon = require("../assets/blue.png");
      } else if (type == "Result") {
        this.removeMarkers();
        this.points = this.result.filter((data) => {
          return data != "";
        });
        type_str = "预测轨迹";
        // console.log("Result:",this.points);
        this.icon = require("../assets/red.png");
      }
      console.log(type_str);
      this.markList = [];
      this.marker_points = [];
      var content = [];
      var content_temp = "";
      for (let i = 0; i < this.points.length; i++) {
        this.marker_points.push(this.points[i]);
      }
      for (let i = 0; i < this.marker_points.length; i++) {
        // 去除重复的点
        for (var j = i + 1; j < this.marker_points.length; j++) {
          if (
            this.marker_points[i][0] == this.marker_points[j][0] &&
            this.marker_points[i][1] == this.marker_points[j][1]
          ) {
            this.marker_points.splice(j, 1);
            j--;
          }
        }
      }
      for (let i = 0; i < this.marker_points.length; i++) {
        content_temp = "";
        if (i == 0) {
          content_temp = "起点";
        } else if (i == this.marker_points.length - 1) {
          content_temp = "终点";
        }
        for (let j = 1; j < this.points.length - 1; j++) {
          if (
            this.marker_points[i][0] == this.points[j][0] &&
            this.marker_points[i][1] == this.points[j][1]
          ) {
            if (content_temp == "") {
              content_temp = "途径点" + j;
            } else {
              content_temp = content_temp + "&途径点" + j;
            }
          }
        }
        content.push(content_temp);
      }
      // console.log("content:", content);
      // console.log("重复:", this.points);
      // console.log("不重复：", this.marker_points);
      for (let i = 0; i < this.marker_points.length; i++) {
        var marker = new AMap.Marker({
          position: this.marker_points[i],
          offset: new AMap.Pixel(-16, -32),
          icon: this.icon, // 添加 Icon 实例
          label: {
            content: content[i],
            direction: "bottom",
          },
        });
        marker.content = [content[i], this.marker_points[i], type_str];
        marker.on("click", this.markerClick);
        this.markList.push(marker);
      }
      console.log("length:", this.markList.length);
      this.map.add(this.markList);
      this.map.setFitView();
    },
    markerClick(e) {
      // 信息窗体的内容
      console.log(e.target.content);
      // console.log(e.target.content[1][0]);
      var date =
        this.date.slice(0, 4) +
        "年" +
        this.date.slice(4, 6) +
        "月" +
        this.date.slice(6, 8) +
        "日";
      var content;
      content = [
        "<b>" + e.target.content[0] + "——" + e.target.content[2] + "</b>",
        "<b>用户ID: " + this.user_id + "</b>",
        "日期: " + date,
        "经纬度: [" +
          e.target.content[1][0].toFixed(2) +
          "," +
          e.target.content[1][1].toFixed(2) +
          "]",
        // "时间：",
      ];

      // 创建 infoWindow 实例
      var infoWindow = new AMap.InfoWindow({
        content: content.join("<br>"), //传入 dom 对象，或者 html 字符串
      });
      var map = this.map;
      // 打开信息窗体
      infoWindow.open(map, e.target.getPosition());
    },
    // 地图初始化
    async init() {
      // Load获得轨迹数据
      let res = await this.$axios.get("/result.json");
      // // 选择的第16条数据
      // this.date = res.data.date[15];
      // this.time_id = res.data.time[15];
      // this.user_id = res.data.user[15];
      // this.origin = res.data.origin[15];
      // this.expected = res.data.expected[15];
      // this.result = res.data.result[15];

      // 从结果中随机选择一条数据
      var id = 0;
      id = Math.floor(Math.random() * 50);
      // console.log("id:",id);
      this.date = res.data.date[id];
      this.time_id = res.data.time[id];
      this.user_id = res.data.user[id];
      this.origin = res.data.origin[id];
      this.expected = res.data.expected[id];
      this.result = res.data.result[id];

      // 选择第一条数据做测试
      // this.date = res.data.date[0];
      // this.time_id = res.data.time[0];
      // this.user_id = res.data.user[0];
      // // this.origin = res.data.origin[0].slice(0, 8);
      // // this.expected = res.data.expected[0].slice(0, 8);
      // // this.result = res.data.result[0].slice(0, 8);
      // this.origin = res.data.origin[0];
      // this.expected = res.data.expected[0];
      // this.result = res.data.result[0];
      // console.log(this.origin, this.expected, this.result);

      AMapLoader.load({
        key: "ddd292c88aa1bad9c04891a47724f40a", //设置您的key
        version: "2.0",
        // version:"1.4.4",
        plugins: [
          "AMap.ToolBar",
          "AMap.Driving",
          "AMap.MoveAnimation",
          "AMap.Scale",
          "AMap.HawkEye",
          "AMap.MapType",
          "AMap.ControlBar",
        ],
        AMapUI: {
          version: "1.1",
          plugins: ["overlay/SimpleMarker"],
        },
        Loca: {
          version: "2.0",
          // version:"1.4.4",
        },
      })
        .then((AMap) => {
          this.map = new AMap.Map("container", {
            viewMode: "3D",
            // zoom: 11.5,
            zoom:15,
            // zooms: [2, 22],
            center: this.center,
          });
          this.map.addControl(new AMap.Scale());
          this.map.addControl(new AMap.ToolBar());
          this.map.addControl(new AMap.HawkEye());
          this.map.addControl(new AMap.MapType());
          this.map.addControl(new AMap.ControlBar());

          // 初始化点
          for (let i = 0; i < this.points.length; i++) {
            var marker = new AMap.Marker({
              position: this.points[i],
              label: {
                content: "初始点",
                direction: "bottom",
              },
            });
            this.markList.push(marker);
          }
          // console.log("length:", this.markList.length);
          this.map.add(this.markList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style  scoped>
.home_div {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 80%;
  /* position: relative; */
}
#container {
  margin-top: 15px;
  width: 80%;
  height: 86%;
  left: 10%;
  /* position: absolute; */
}
.btn_box1 {
  position: relative;
  width: 60%;
  left: 18%;
  margin: 10px 0px 0px 0px;
  padding: 0px 20px 10px 40px;
  border-bottom: 1px solid #dcdcdc;

  /* padding: 10px; */
}
.btn_box1 span,
.btn_box2 span {
  font-size: 22px;
  vertical-align: top;
  margin: 0px 20px 0px 0px;
}
.btn_box2 {
  position: relative;
  width: 45%;
  left: 30%;
  margin: 10px 0px 0px 10px;

  /* padding: 10px; */
}
</style>